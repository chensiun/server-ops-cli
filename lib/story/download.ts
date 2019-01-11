import { BaseStory } from './base';
import { Observable, zip } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import * as pageApi from '../api/page.api'
import { logger } from '../services/logger'
import * as reader from '../services/reader'
import chalk from 'chalk';

export default class DownloadStory implements BaseStory {

  askPage(response): Promise<any> {
    const pageList = response.data.list
    const pageIds = pageList.map(item => item.id)

    return reader.readlinePromise([
      chalk.gray('> Choose Page From '),
      '[',
      chalk.green(`${pageIds.join(',')}`),
      ']:',
    ].join(' ')).then(pageId => {
      return {
        page: pageId,
        pageIds: pageIds,
      }
    })
  }

  download({ page, pageIds }): Observable<any> {
    if (!pageIds.includes(page)) {
      logger.warn([
        chalk.red('> Page Not Exists!')
      ].join(' '))
      throw new Error('Page Not Exists!')
    }

    return zip(
      pageApi.fetchPageData(page),
      pageApi.listShelf(page),
    )
  }

  save(pageData): Promise<any> {
    console.log(pageData)
    return Promise.resolve(1)
  }

  execute(): Observable<any> {
    return pageApi.listActivityPages()
      .pipe(concatMap(this.askPage))
      .pipe(concatMap(this.download))
      .pipe(concatMap(this.save))
  }
}
