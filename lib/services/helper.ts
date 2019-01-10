import * as sessionService from './session'
import * as querystring from 'querystring'

import { signAuth } from './crypto'

export const buildQuery = (requestParams) => {
  requestParams = requestParams || {}
  const session = sessionService.getSessionInstance()
  const SECRET_KEY = session['secret']

  let keys = Object.keys(requestParams)
  requestParams['random'] = Date.now()

  const sortParams = {}
  keys = Object.keys(requestParams)
  keys.sort().forEach(k => {
    sortParams[k] = requestParams[k]
  })

  const codeStr = querystring.stringify(sortParams) + '&' + SECRET_KEY
  return Object.assign({}, requestParams, {
    sign: signAuth(codeStr),
  })
}
