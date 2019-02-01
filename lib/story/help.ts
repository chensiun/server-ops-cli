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

const resourcePath = path.resolve('./resources/')

@StoryRegister
export default class HelpStory implements BaseStory {

  book: Object;
  mark = true;

  sayName(): String {
    return 'Story Help';
  }

  printBook(): Promise<any> {
    console.log(this.book, '+++')
    return Promise.resolve(this.book)
  }

  execute(): Observable<any> {
    return of(Promise.resolve(logger.info([
      '>', 'Help for Story!'
    ].join(' '))))
      .pipe(concatMap(this.printBook))
  }
}
