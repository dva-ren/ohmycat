import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import routes from 'virtual:generated-pages'
import App from './App.vue'
import './composables/verifyToken'
// eslint-disable-next-line import/order
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'
import './styles/prose.css'
import './styles/markdown.css'
import 'animate.css'
document.documentElement.style.setProperty('--animate-duration', '.5s')

const app = createApp(App)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
NProgress.configure({ showSpinner: false })
router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})
router.afterEach(() => {
  // document.documentElement.scrollTop = 0
  // document.body.scrollTop = 0
  NProgress.done()
})
app.use(router)
app.mount('#app')
