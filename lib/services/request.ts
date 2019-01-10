import axios from 'axios'
import * as sessionService from './session'
import { appConfig } from '../config/global'

export default {
  getInstance: () => {
    const hostConfig = appConfig.hostConfig
    const session = sessionService.getSessionInstance()
    const hostName = session['host']

    let baseURL = sessionService.getServerHost(hostConfig, hostName)

    return axios.create({
      baseURL,
      timeout: 10000,
    })
  },
}
