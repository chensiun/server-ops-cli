import { appConfig } from '../config/global'

const storage = Object.assign({}, appConfig.account)

export const getItem = (key) => {
  return storage[key]
}

export const setItem = (key, value) => {
  storage[key] = value
}

export const removeItem = (key) => {
  if (key in storage) {
    delete storage[key]
  }
}
