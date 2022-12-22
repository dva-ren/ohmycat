import http from '../composables/requests'
import type { Image } from '~/types'

export const addImage = (data: Image) => {
  return http.request({
    url: '/imgae',
    method: 'post',
    data,
  })
}

/**
 * 获取bing图片
 * @returns
 */
export const getBingImage = () => {
  return http.request({
    url: 'http://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=3',
    method: 'get',
  })
}
