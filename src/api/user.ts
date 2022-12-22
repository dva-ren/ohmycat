// 文件api/index.ts
import http from '../composables/requests'
import type { LoginForm, User } from '~/types'

export const Login = (data: LoginForm) => {
  return http.request({
    url: '/user/login',
    method: 'post',
    data,
  })
}

export const Register = (data: LoginForm) => {
  return http.request({
    url: '/user/register',
    method: 'post',
    data,
  })
}

/**
 * 更新用户信息
 * @returns
 */
export const updateUser = (data: {
  id: number
  username?: string
  password?: string
}) => {
  return http.request({
    url: '/user/update',
    method: 'post',
    data,
  })
}
