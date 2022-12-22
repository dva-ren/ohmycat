// 文件 utils/axios.ts
// import { Message } from '@arco-design/web-vue'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import axios from 'axios'

class HttpRequest {
  private readonly baseUrl: string
  constructor() {
    this.baseUrl = 'http://localhost:3000/api'
    if (import.meta.env.MODE === 'production')
      this.baseUrl = 'https://v2.dvaren.xyz/api/api'
    // this.baseUrl = 'https://v2.dvaren.xyz/api/api'
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
        // Message.error(data?.message)
        return Promise.reject(data)
      }
      return data
    }, (error: any) => {
      // eslint-disable-next-line no-console
      console.log('error==>', error)
      if (error.response.status === 500)
        console.log('服务器错误')
        // Message.error('服务器错误')
      else
        console.log(error.message)
        // Message.error(error.message)
      return Promise.reject(error)
    })
  }

  request(options: AxiosRequestConfig) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}

const http = new HttpRequest()
export default http
