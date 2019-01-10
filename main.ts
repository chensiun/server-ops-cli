import chalk from 'chalk'
import * as pageApi from './lib/api/page.api'
import { from } from 'rxjs'

pageApi.listActivityPages().subscribe(response => {
  console.log(JSON.stringify(response))
  console.log('hello')

  process.exit(0)
})
