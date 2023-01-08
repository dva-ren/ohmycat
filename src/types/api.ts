export interface Response<T> {
  code: number
  msg: string
  data: T
}

export interface PageParams {
  pageSize: number
  pageNum: string
}

export interface PageInfo<T> {
  total: number
  list: T[]
  pageNum: number
  pageSize: number
  size: number
  startRow: number
  endRow: number
  pages: number
  prePage: number
  nextPage: number
  isFirstPage: boolean
  isLastPage: boolean
  hasPreviousPage: boolean
  hasNextPage: boolean
  navigatePages: number
  navigatepageNums: number[]
  navigateFirstPage: number
  navigateLastPage: number
}

export interface Article {
  id: string
  summary: string
  title: string
  content: string
  categoryId: string
  categoryName: string
  label: string
  cover: string
  isTop: number
  status: number
  commentCount: number
  viewCount: number
  allowComment: number
  createBy: string
  createTime: string
  updateTime: string
  isDelete: number
}

export interface Note {
  id: string
  title: string
  summary: string
  categoryId: string
  content: string
  mood: string
  weather: string
  position: string
  cover: string
  musicId: string
  isTop: number
  status: number
  commentCount: number
  viewCount: number
  allowComment: number
  createTime: string
  updateTime: string
  isDelete: number
  publishTime: string
}

export interface Category {
  id: string
  name: string
  description: string
  pid: string
  status: number
  createTime: string
  updateTime: string
  isDelete: number
}

export interface Say {
  id: string
  content: string
  author: string
  origin: string
  isTop: number
  status: number
  createTime: string
  updateTime: string
  isDelete: number
}
