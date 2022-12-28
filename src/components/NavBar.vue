<script lang="ts" setup>
import Message from '~/components/Message'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import type { NavItem } from '~/types'

const token = useLocalStorage('token', null)
const logout = () => {
  token.value = null
  Message.success('登出成功')
}

const menus = ref<NavItem[]>([
  {
    name: '文',
    url: '/posts',
    icon: 'i-ri:book-read-line',
    children: [
      {
        name: '编程',
        url: '/posts',
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
    icon: 'i-ri:book-read-lin',
    url: '#',
  },
  {
    name: '项',
    icon: 'i-ri:book-read-lin',
    url: '/projects',
  },
])
</script>

<template>
  <div h-20>
    <div fixed top-0 w-full z-20>
      <header flex justify-between h-14 font-inter px-4 lg:px-10>
        <router-link to="/" title="home" py-1>
          <Logo width="2.5rem" />
        </router-link>
        <nav flex items-center>
          <NavItem v-for="nav, idx in menus" :key="idx" :data="nav" />
          <button icon-btn @click="toggleDark()">
            <div dark:i-carbon-moon i-carbon-sun />
          </button>
          <button v-if="token" icon-btn @click="logout">
            <div i-ri-logout-box-r-line />
          </button>
        </nav>
      </header>
      <!-- <div max-w-700px m-auto>
        1111
      </div> -->
    </div>
  </div>
</template>

<style scoped>
.nav-item{

}
</style>
