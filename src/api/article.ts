// 文件api/index.ts
import http from '../composables/requests'
import type { ArticleForm } from '~/types'

/**
 * 查询文章列表 默认20条
 * @returns 文章列表
 */
export const getArticles = (pageNum = 1, pageSize = 20) => {
  return http.request({
    url: `/article?pageNum=${pageNum}&pageSize=${pageSize}`,
    method: 'get',
  })
}
/**
 * 查询文章信息
 * @returns 文章信息
 */
export const getArticleById = (id: number) => {
  return http.request({
    url: `/article/${id}`,
    method: 'get',
  })
}

/**
 * 查询文章列表(包含被删除) 默认20条
 * @returns 文章列表
 */
export const getAllArticles = (pageNum = 1, pageSize = 20) => {
  return http.request({
    url: `/article/list?pageNum=${pageNum}&pageSize=${pageSize}`,
    method: 'get',
  })
}

export const addArticle = (data: ArticleForm) => {
  return http.request({
    url: '/article',
    method: 'post',
    data,
  })
}

export const updateArticle = (data: ArticleForm) => {
  return http.request({
    url: '/article/update',
    method: 'post',
    data,
  })
}

export const deleteArticle = (id: number) => {
  return http.request({
    url: `/article/delete/${id}`,
    method: 'post',
  })
}
