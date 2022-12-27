<script lang="ts" setup>
import Message from '~/components/Message'

const token = useLocalStorage('token', null)
const logout = () => {
  token.value = null
  Message.success('登出成功')
}
</script>

<template>
  <header flex justify-between py-6 font-inter px-4 lg:px-10>
    <router-link to="/" title="home">
      <Logo width="2rem" />
    </router-link>
    <nav flex items-center gap-5>
      <!-- <div v-if="token">
        <router-link to="/admin/user" px-4>
          用户管理
        </router-link>
        <router-link to="/admin/article" px-4>
          文章管理
        </router-link>
      </div> -->
      <router-link to="/posts" title="Blog" link>
        <span>Blog</span>
      </router-link>
      <router-link to="/projects" title="Projects" link>
        <span>Projects</span>
      </router-link>
      <router-link to="/tools" title="Tools" link>
        <span>Tools</span>
      </router-link>

      <a href="https://github.com/dva-ren" title="Github" target="_blank" link>
        <div icon-btn i-carbon-logo-github />
      </a>
      <button icon-btn @click="toggleDark()">
        <div dark:i-carbon-moon i-carbon-sun />
      </button>
      <button v-if="token" icon-btn @click="logout">
        <div i-ri-logout-box-r-line />
      </button>
    </nav>
  </header>
</template>
