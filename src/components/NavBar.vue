<script lang="ts" setup>
import { queryCategoryList } from '~/api'
import Message from '~/components/Message'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import type { NavItem } from '~/types'

const route = useRoute()
const token = useLocalStorage('token', null)
const logout = () => {
  token.value = null
  Message.success('登出成功')
}
const bgOpacity = ref(0)
const scroll = useWindowScroll()
const navIdx = ref(-1)

const menus = ref<NavItem[]>([
  {
    name: '文',
    url: '/posts',
    icon: 'i-ri:mastodon-line',
    children: [],
  },
  {
    name: '记',
    icon: 'i-ri:quill-pen-line',
    url: '/notes/latest',
  },
  {
    name: '言',
    icon: 'i-ri-bear-smile-line',
    url: '/says',
  },
  {
    name: '项',
    icon: 'i-ri:attachment-line',
    url: '/projects',
  },
])

const getCategories = async () => {
  const res = await queryCategoryList()
  if (res.code !== 200)
    return
  menus.value[0].children = res.data.map(item => ({
    name: item.name,
    url: `/category?id=${item.id}`,
  }))
}
getCategories()
watch(useThrottle(scroll.y, 100), () => {
  if (scroll.y.value > 60)
    bgOpacity.value = 1
  else
    bgOpacity.value = 0
})
watch(route, () => {
  if (route.path === '/')
    navIdx.value = -1
  menus.value.forEach((m, idx) => {
    if (route.path.includes(m.url))
      navIdx.value = idx
  })
})
</script>

<template>
  <header h-20>
    <div fixed top-0 w-full z-20>
      <div class="header" flex justify-between h-14 px-4 lg:px-10 :style="{ '--opacity': bgOpacity }">
        <router-link to="/" title="home" py-2 flex items-center gap-2>
          <Logo inline-block />
          <div display-none sm:display-block>
            <p>灰色と青</p>
            <p text="~ 12px gray-5">
              不虚光阴
            </p>
          </div>
        </router-link>
        <nav flex items-center :class="{ nav: navIdx !== -1 }" :style="`--idx:${navIdx}`">
          <NavItem v-for="nav, idx in menus" :key="idx" :data="nav" />
          <!-- <button icon-btn @click="toggleDark()">
            <div dark:i-carbon-moon i-carbon-sun />
          </button> -->
          <button v-if="token" icon-btn pl-2 @click="logout">
            <div i-ri-logout-box-r-line />
          </button>
        </nav>
      </div>
      <!-- <div max-w-700px m-auto>
        1111
      </div> -->
      <div display-none>
        <div i-ri:mastodon-line />
        <div i-ri:quill-pen-line />
        <div i-ri:attachment-line />
      </div>
    </div>
  </header>
</template>

<style scoped>
.header::before{
  opacity: 0;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  backdrop-filter: blur(20px) saturate(180%);
  transition: all .3s;
  background-color: rgba(255, 255, 255, 0.664);
  z-index: -1;
  content: "";
  opacity: var(--opacity);
  border-bottom: 1px solid #bbb3;
}
.dark .header::before{
  background-color: rgba(255, 255, 255, 0.08);
}
.nav{
  position: relative;
}
.nav::before{
  content: '';
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background-color: rgba(0,0,0,0.4);
  bottom: .5rem;
  transform: translateX(-50%);
  left: calc(34px + 68px * var(--idx));
  transition: all .1s;
}
.nav:hover::before{
  width: 2.25rem;
  height: 2px;
  background-color: var(--yellow) !important;
}
.dark header::before{
  background-color: rgba(0, 0, 0, 0.464);
}
.dark .nav::before{
  background-color: rgba(255, 255, 255, 0.54);
}
</style>
