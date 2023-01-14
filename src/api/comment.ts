import http from '~/composables/requests'
import type { AsyncResponse, Comment, CommentForm, PageInfo } from '~/types'

export const addComment = (comment: CommentForm): AsyncResponse<Comment> => {
  return http.request({
    url: '/comment',
    method: 'POST',
    data: comment,
  })
}
export const queryComment = (id: string): AsyncResponse<PageInfo<Comment>> => {
  return http.request({
    url: `/comment/${id}`,
    method: 'GET',
  })
}
