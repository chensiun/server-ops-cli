import { BaseStory } from './base';
import { Observable, zip, of } from 'rxjs';
import { concatMap } from 'rxjs/operators'
import * as pageApi from '../api/page.api'
import { logger } from '../services/logger'
import * as reader from '../services/reader'
import { appConfig } from '../config/global'
import chalk from 'chalk'
import * as path from 'path'
import * as fs from 'fs'

const distPath = path.resolve('./dist/')

export default class BuilderStory implements BaseStory {

  sayName(): String {
    return 'Builder Story';
  }

  readLocal(): Promise<any> {
    return Promise.resolve({
      list: [{
        id: 'mock',
      }],
    });
  }

  askPage(localPage): Promise<any> {
    const pageList = localPage.list
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

  execute(): Observable<any> {
    return of(Promise.resolve(logger.info([
      '>', 'Starting Load Local Config!'
    ].join(' '))))
      .pipe(concatMap(this.readLocal))
      .pipe(concatMap(this.askPage))
  }
}
