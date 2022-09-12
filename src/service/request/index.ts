import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

import 'element-plus/theme-chalk/el-loading.css'
import { ElLoading } from 'element-plus'

interface BJRequestHook {
  requestHook?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestHookCatch?: (error: AxiosError) => AxiosError
  responseHook?: (res: AxiosResponse) => AxiosResponse
  responseHookCatch?: (error: AxiosError) => AxiosError
}

interface BJRequestConfig extends AxiosRequestConfig {
  hooks?: BJRequestHook
  isShowLoading?: boolean
}

class BJRequest {
  instance: AxiosInstance
  hooks?: BJRequestHook
  loading?: any
  isShowLoading?: boolean
  constructor(config: BJRequestConfig) {
    this.instance = axios.create(config)
    this.hooks = config.hooks
    this.isShowLoading = config.isShowLoading
    // 单独实例请求成功的拦截
    this.instance.interceptors.request.use(this.hooks?.requestHook, this.hooks?.requestHookCatch)

    // 单独实例响应成功的拦截
    this.instance.interceptors.response.use(this.hooks?.responseHook, this.hooks?.responseHookCatch)

    // 全局拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // console.log('全局请求拦截器')

        // 是否显示loading
        if (this.isShowLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: 'Loading...',
            background: 'rgba(0, 0, 0, 0.7)'
          })
        }

        return config
      },
      (err) => {
        // console.error('全局请求失败')
        return err
      }
    )
    // 全局响应
    this.instance.interceptors.response.use(
      (res) => {
        // console.log('全局响应拦截器')
        // 将loading移除
        this.loading?.close()

        return res.data
      },
      (err) => {
        // console.error('全局响应失败')
        // 将loading移除
        this.loading?.close()
        return err
      }
    )
  }

  request<T>(config: BJRequestConfig): Promise<T> {
    this.isShowLoading = config.isShowLoading
    return new Promise((resolve, reject) => {
      // 单独请求拦截
      if (config.hooks?.requestHook) {
        config = config.hooks.requestHook(config)
      }
      this.instance
        .request(config)
        .then((res: any) => {
          if (config.hooks?.responseHook) {
            res = config.hooks.responseHook(res)
          }
          resolve(res)
        })
        .catch((err) => {
          reject(err)
          return err
        })
    })
  }
  get<T>(config: BJRequestConfig | string): Promise<T> {
    if (typeof config === 'string') {
      return this.request({ url: config, method: 'GET' })
    }
    return this.request({ ...config, method: 'GET' })
  }
  post<T>(config: BJRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'POST' })
  }
  delete<T>(config: BJRequestConfig): Promise<T> {
    if (typeof config === 'string') {
      return this.request({ url: config, method: 'DELETE' })
    }
    return this.request({ ...config, method: 'DELETE' })
  }
  patch<T>(config: BJRequestConfig): Promise<T> {
    if (typeof config === 'string') {
      return this.request({ url: config, method: 'PATCH' })
    }
    return this.request({ ...config, method: 'PATCH' })
  }
}

export default BJRequest
