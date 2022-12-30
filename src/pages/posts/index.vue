<script lang="ts" setup>
import type { Article } from '~/types'
import { cloudApi, formatTime } from '~/composables'

const loading = ref(true)
const posts = ref<Array<Article>>([])

const getPosts = async () => {
  const res = await cloudApi.invokeFunction('get-article', {})
  posts.value = res.data
  loading.value = false
}
getPosts()
</script>

<template>
  <Layout>
    <Loadding v-model="loading" />
    <div v-for="p in posts" :key="p._id" class="post-item fade_in_up" pb-8>
      <div>
        <div class="left-label" display-none sm:display-block>
          {{ formatTime(p.createTime, 'yyyy-MM-dd') }}
        </div>
        <div class="left-label" display-block sm:display-none>
          {{ formatTime(p.createTime, 'MM-dd') }}
        </div>
        <div text-center text-base>
          <router-link :to="`/posts/${p._id}`" hover:text-orange transition>
            {{ p.title }}
          </router-link>
        </div>
        <div py-4 leading-8 indent-lg tracking-wider text-sm>
          <p line-clamp-5>
            {{ p.content }}
          </p>
        </div>
        <p text-center>
          <router-link :to="`/posts/${p._id}`" btn rounded-full text-sm>
            查看原文
          </router-link>
        </p>
      </div>
    </div>
  </Layout>
</template>

<style scoped>
.post-item{
  color: var(--light-brown);
}
.dark .post-item{
  color: var(--dark-brown);
}
</style>
