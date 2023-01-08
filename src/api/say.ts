import http from '~/composables/requests'
import type { PageInfo, Response, Say } from '~/types'

type SayListResult = Response<PageInfo<Say>>

export const querySayList = (pageNum = 1, pageSize = 20): SayListResult => {
  return http.request({
    url: `/say?pageNum=${pageNum}&pageSize=${pageSize}`,
    method: 'GET',
  })
}
export const querySay = (id: string): Response<Say> => {
  return http.request({
    url: `/say/${id}`,
    method: 'GET',
  })
}
