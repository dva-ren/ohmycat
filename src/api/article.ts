import http from '~/composables/requests'
import type { Article, AsyncResponse, PageInfo } from '~/types'

type ArticleListResult = AsyncResponse<PageInfo<Article>>

export const queryArticleList = (categoryId?: string, pageNum = 1, pageSize = 20): ArticleListResult => {
  return http.request({
    url: `/article?${categoryId ? `category=${categoryId}` : ''}&pageNum=${pageNum}&pageSize=${pageSize}`,
    method: 'GET',
  })
}
export const queryArticle = (id: string): AsyncResponse<Article> => {
  return http.request({
    url: `/article/${id}`,
    method: 'GET',
  })
}
