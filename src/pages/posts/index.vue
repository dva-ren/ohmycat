<script lang="ts" setup>
import type { Article } from '~/types'
import { formatTime } from '~/composables'
import { queryArticleList } from '~/api'

const loading = ref(true)
const posts = ref<Array<Article>>([])

const getPosts = async () => {
  const res = await queryArticleList()
  posts.value = res.data.list
  loading.value = false
}
getPosts()
</script>

<template>
  <Layout :loadding="loading">
    <div v-for="p, idx in posts" :key="p.id" v-spring:delay="idx * 100" class="post-item " pb-8>
      <div>
        <div class="left-label" display-none sm:display-block>
          {{ formatTime(p.createTime, 'yyyy-MM-dd') }}
        </div>
        <div class="left-label" display-block sm:display-none>
          {{ formatTime(p.createTime, 'MM-dd') }}
        </div>
        <div text-center text-base>
          <router-link :to="`/posts/${p.id}`" hover:text-orange transition>
            {{ p.title }}
          </router-link>
        </div>
        <div py-4 leading-8 indent-lg tracking-wider text-sm>
          <p line-clamp-5>
            {{ p.content }}
          </p>
        </div>
        <p text-center>
          <router-link :to="`/posts/${p.id}`" btn rounded-full text-sm>
            查看原文
          </router-link>
        </p>
      </div>
    </div>
  </Layout>
</template>

<style scoped>
.post-item{
  color: var(--light-color);
}
.dark .post-item{
  color: var(--dark-brown);
}
</style>
