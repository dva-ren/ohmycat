import http from '~/composables/requests'
import type { AsyncResponse, Master } from '~/types'

export const queryMaster = (): AsyncResponse<Master> => {
  return http.request({
    url: '/master',
    method: 'GET',
  })
}
