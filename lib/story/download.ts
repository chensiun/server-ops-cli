import { BaseStory } from './base';
import { Observable, zip, of } from 'rxjs';
import { concatMap } from 'rxjs/operators'
import * as pageApi from '../api/page.api'
import { logger } from '../services/logger'
import { StoryRegister } from '../decorators/register'
import * as reader from '../services/reader'
import { appConfig } from '../config/global'
import chalk from 'chalk'
import * as path from 'path'
import * as fs from 'fs'

const distPath = path.resolve('./dist/')

@StoryRegister
export default class DownloadStory implements BaseStory {

  sayName(): String {
    return 'Download Story';
  }

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
      of(page),
      pageApi.fetchPageData(page),
      pageApi.listShelf(page),
      pageApi.listGoods(page, 'android'),
      pageApi.listGoods(page, 'ios'),
      pageApi.listPresaleGoods(page, 'android'),
      pageApi.listPresaleGoods(page, 'ios'),
      pageApi.listCoupon(page),
      pageApi.listFlashGoods(page),
      pageApi.fetchShareCouponPack(page),
    )
  }

  save(pageData): Promise<any> {
    const hostName = appConfig.account.host
    const dataFields = [
      "page_id",
      'PAGE_DATA',
      'SHELF_LIST',
      "GOODS:android",
      "GOODS:ios",
      "PRESALE:android",
      "PRESALE:ios",
      "COUPON",
      "FLASH",
      "SHARE",
    ]
    const pageId = pageData[0]

    const targetData = pageData.map(item => {
      if (typeof item === 'object') {
        return item.data
      }
      return item
    })
    const targetMap = targetData.reduce((result, current, index) => {
      let key = dataFields[index].toLowerCase()
      let device = ''
      if (key.indexOf(':') > 0) {
        device = key.split(':')[1]
        key = key.split(':')[1]
      }

      if (!device) {
        result[key] = current
      } else {
        if (!result[key]) {
          result[key] = {}
        }
        result[key][device] = current
      }
      return result
    }, {})

    targetMap['timstamp'] = Date.now()
    targetMap['record_time'] = new Date().toLocaleString()
    targetMap['env'] = hostName

    const filename = `page_${hostName}_${targetMap['page_id']}.json`
    if (!fs.existsSync(distPath)) {
      fs.mkdirSync(distPath)
    }
    fs.writeFileSync(path.join(distPath, filename), JSON.stringify(targetMap), 'utf-8')
    logger.info([
      chalk.yellow('> Save File '),
      chalk.cyan(filename),
      "To",
      chalk.gray(distPath),
    ].join(' '))
    return Promise.resolve(targetMap)
  }

  execute(): Observable<any> {
    return pageApi.listActivityPages()
      .pipe(concatMap(this.askPage))
      .pipe(concatMap(this.download))
      .pipe(concatMap(this.save))
  }
}
