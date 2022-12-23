import { Cloud } from 'laf-client-sdk'

export const cloudApi = new Cloud({
  baseUrl: 'https://htcr49.lafyun.com:443', // 这个地址可以在欢迎页面中的“服务地址”中找到
  getAccessToken: () => '', // 这里不需要授权，先填空
})
