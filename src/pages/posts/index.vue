<script lang="ts" setup>
import { format, parseISO } from 'date-fns'
import type { Article } from '~/types'
import { cloudApi } from '~/composables'

const token = useLocalStorage('token', null)
const posts = ref<Array<Article>>([])

const getPosts = async () => {
  const res = await await cloudApi.invokeFunction('get-article', {})
  posts.value = res.data
}
getPosts()
const getYear = (a: Date | string | number) => new Date(a).getFullYear()
const isSameYear = (a: Date | string | number, b: Date | string | number) => a && b && getYear(a) === getYear(b)
</script>

<template>
  <div>
    <h1 text-2xl font-bold>
      Posts
    </h1>
    <ul>
      <li v-for="p, idx in posts" :key="p._id" my-2 :class="{ 'bg-red-1': p.isDeleted }">
        <div v-if="!isSameYear(p.createTime, posts[idx - 1]?.createTime)" relative h20 pointer-events-none>
          <span text-6em op10 absolute left-1rem top--.5rem font-bold>{{ getYear(p.createTime) }}</span>
        </div>
        <router-link :to="`/posts/${p._id}`" link text-18px flex gap-2 items-center>
          <div min-w-2rem>
            <div v-if="p.label" px="2px" text-sm border rounded dark:border-gray-600 text-center>
              {{ p.label }}
            </div>
          </div>
          <div>
            <div block>
              {{ p.title }}
            </div>
            <div text-14px>
              {{ format(parseISO(p.createTime), 'MM-dd HH:mm') }}
            </div>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>
