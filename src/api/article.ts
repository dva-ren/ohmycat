import http from '~/composables/requests'
import type { Article, PageInfo, Response } from '~/types'

type ArticleListResult = Response<PageInfo<Article>>

export const queryArticleList = (categoryId?: string, pageNum = 1, pageSize = 20): ArticleListResult => {
  return http.request({
    url: `/article?${categoryId ? `category=${categoryId}` : ''}&pageNum=${pageNum}&pageSize=${pageSize}`,
    method: 'GET',
  })
}
export const queryArticle = (id: string): Response<Article> => {
  return http.request({
    url: `/article/${id}`,
    method: 'GET',
  })
}
