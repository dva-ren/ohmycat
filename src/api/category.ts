import http from '~/composables/requests'
import type { AsyncResponse, Category } from '~/types'

export const queryCategoryList = (): AsyncResponse<Array<Category>> => {
  return http.request({
    url: '/category',
    method: 'GET',
  })
}
export const queryCategory = (id: string): AsyncResponse<Category> => {
  return http.request({
    url: `/category/${id}`,
    method: 'GET',
  })
}
