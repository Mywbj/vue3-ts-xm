// service统一出口
import BJRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'

import localCache from '@/utils/cache'

const bjRequest = new BJRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  hooks: {
    requestHook(config: any) {
      // console.log('config-----------: ', config)
      const token = localCache.getCache('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    }
  }
})

export default bjRequest
