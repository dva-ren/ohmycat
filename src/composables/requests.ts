// 文件 utils/axios.ts
import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import axios from 'axios'
import Message from '~/components/Message'
import type { Response } from '~/types'
class HttpRequest {
  private readonly baseUrl: string
  constructor() {
    this.baseUrl = 'http://localhost:4000/'
    if (import.meta.env.MODE === 'production')
      this.baseUrl = 'https://blog-api.ddnsto.com/'
  }

  getInsideConfig() {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        //
      },
    }
    return config
  }

  // 请求拦截
  interceptors(instance: AxiosInstance, url: string | number | undefined) {
    instance.interceptors.request.use((config) => {
      // 添加全局的loading..
      // 请求头携带token
      const token = localStorage.getItem('token')
      if (token)
        config.headers!.token = token
      return config
    }, (error: any) => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use((res) => {
      // 返回数据
      const { data } = res
      // console.log('返回数据处理', data)
      if (data?.code !== 200) {
        Message.error(data?.msg)
        return Promise.reject(data)
      }
      return data
    }, (error: any) => {
      // eslint-disable-next-line no-console
      console.log('error==>', error)
      if (error.response?.status === 500)
        Message.error('服务器错误')
      else
        Message.error(`未知错误->${error}`)
      return Promise.reject(error)
    })
  }

  request(options: AxiosRequestConfig) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options) as unknown as Promise<Response<any>>
  }
}

const http = new HttpRequest()
export default http
