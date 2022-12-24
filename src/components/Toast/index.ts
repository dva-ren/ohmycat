import type { VNode } from 'vue'
import { h, render } from 'vue'
import Toast from './Toast.vue'
interface ToastOptions { type: 'warning' | 'success' | 'error'; msg: string }

// let boxInstances: any

const renderBox = (props: ToastOptions): VNode => {
  const container = document.createElement('div')
  const boxVNode = h(Toast, props)
  // 将虚拟dom渲染到 container dom 上
  render(boxVNode, container)
  // 最后将 container 追加到 body 上
  document.body.appendChild(container)
  setTimeout(() => {
    document.body.removeChild(container)
  }, 4000)
  return boxVNode
}

export const success = (msg: string) => {
  renderBox({
    type: 'success',
    msg,
  })
}

export const warning = (msg: string) => {
  renderBox({
    type: 'warning',
    msg,
  })
}

export const error = (msg: string) => {
  renderBox({
    type: 'error',
    msg,
  })
}
