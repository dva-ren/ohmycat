import http from '~/composables/requests'
import type { Category, Response } from '~/types'

export const queryCategoryList = (): Response<Array<Category>> => {
  return http.request({
    url: '/category',
    method: 'GET',
  })
}
export const queryCategory = (id: string): Response<Category> => {
  return http.request({
    url: `/category/${id}`,
    method: 'GET',
  })
}
