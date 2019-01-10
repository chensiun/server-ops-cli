import { appConfig } from '../config/global'
import * as storageService from './storage'

const SESSION_FIELDS = ['mail', 'secret', 'host']
const DEFAULT_BASE_URL = 'http://localhost:4000'

export const isLoginValidate = () => {
  return !!storageService.getItem('mail')
}

export const getCurrentEnv = () => {
  return appConfig['host']
}

export const getServerHost = (hostConfig, hostname) => {
  let hostUrl = DEFAULT_BASE_URL
  if (hostConfig && hostConfig[hostname]) {
    hostUrl = hostConfig[hostname].host || DEFAULT_BASE_URL
  }
  return hostUrl
}

export const loginAction = (authData, callback) => {
  SESSION_FIELDS.forEach(key => {
    storageService.setItem(key, authData[key])
  })

  callback()
}

export const clearSession = () => {
  SESSION_FIELDS.forEach(key => {
    storageService.removeItem(key)
  })
}

export const putSessionItem = (key, value) => {
  storageService.setItem(key, value)
}

export const readSessionItem = (key) => {
  const keyStr = storageService.getItem(key)
  return keyStr || ''
}

export const getSessionInstance = () => {
  const target = {}

  SESSION_FIELDS.forEach(key => {
    target[key] = readSessionItem(key)
  })

  return target
}
