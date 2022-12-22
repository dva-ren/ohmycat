export interface Article {
  id: number
  title: string
  content: string
  label: string
  createTime: string
  updateTime: string
  isDeleted: number
}

export interface LoginForm {
  username: string
  password: string
}

export interface User {
  id: number
  username: string
  role: string
  isDeleted: number
  createTime: string
  updateTime: string
}

export interface ArticleForm {
  id: number
  title: string
  content: string
  description: string
  cover: Array<Image>
  labels: string[]
}

export interface Image {
  id?: string
  name: string
  url: string
  articleId?: string
  description?: string
  cearateTime?: string
  state?: number
}

export interface Picture {
  id?: string
  nickname: string
  url: string
  labels: string[]
  description?: string
  createTime?: string
  updateTime?: string
  state?: number
}

export interface PictureMessage {
  id?: string
  pictureId: string
  nickname: string
  content: string
  createTime?: string
  updateTime?: string
  state?: number
}
