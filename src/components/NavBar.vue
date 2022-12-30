<script lang="ts" setup>
import Message from '~/components/Message'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import type { NavItem } from '~/types'

const token = useLocalStorage('token', null)
const logout = () => {
  token.value = null
  Message.success('登出成功')
}
const bgOpacity = ref(0)

const menus = ref<NavItem[]>([
  {
    name: '文',
    url: '/',
    icon: 'i-ri:mastodon-line',
    children: [
      {
        name: '编程',
        url: '/',
      },
      {
        name: '笔记',
        url: '#',
      },
      {
        name: '读书',
        url: '#',
      },
    ],
  },
  {
    name: '记',
    icon: 'i-ri:quill-pen-line',
    url: '/notes/new',
  },
  {
    name: '项',
    icon: 'i-ri:attachment-line',
    url: '/projects',
  },
])
onMounted(() => {
  document.addEventListener('scroll', (e: Event) => {
    if (document.documentElement.scrollTop > 40)
      bgOpacity.value = 1

    else
      bgOpacity.value = 0
  })
})
</script>

<template>
  <div h-20>
    <div fixed top-0 w-full z-20>
      <header flex justify-between h-14 font-inter px-4 lg:px-10 :style="{ '--opacity': bgOpacity }">
        <router-link to="/" title="home" py-2>
          <Logo width="2.5rem" />
        </router-link>
        <nav flex items-center>
          <NavItem v-for="nav, idx in menus" :key="idx" :data="nav" />
          <button icon-btn @click="toggleDark()">
            <div dark:i-carbon-moon i-carbon-sun />
          </button>
          <button v-if="token" icon-btn pl-2 @click="logout">
            <div i-ri-logout-box-r-line />
          </button>
        </nav>
      </header>
      <!-- <div max-w-700px m-auto>
        1111
      </div> -->
      <div display-none>
        <div i-ri:mastodon-line />
        <div i-ri:quill-pen-line />
        <div i-ri:attachment-line />
      </div>
    </div>
  </div>
</template>

<style scoped>
header::before{
  opacity: 0;
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
.dark header::before{
  background-color: rgba(0, 0, 0, 0.464);
}
</style>
