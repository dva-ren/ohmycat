<script lang="ts" setup>
import MdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import type { Article } from '~/types'
import { cloudApi, formatTime } from '~/composables'

const { id } = defineProps<{ id: number | string }>()
const isdark = useDark()
const token = useLocalStorage('token', undefined)

const articleData = ref<Article>()

const getArticle = async () => {
  const res = await cloudApi.invokeFunction('query-article', { id })
  articleData.value = res.data
}
const changeState = async (state: 0 | 1) => {
  const res = await cloudApi.invokeFunction('update-article-state', {
    id,
    state,
  })
  if (res.code === 200)
    articleData.value && (articleData.value.state = state)
}
getArticle()
</script>

<template>
  <div v-if="articleData" w-full>
    <div flex items-center gap-2>
      <div text-2xl>
        {{ articleData?.title }}
      </div>
      <div text-sm border rounded dark:border-gray-600 text-center>
        {{ articleData?.label }}
      </div>
      <div v-if="token" flex text-xl items-center gap-4 ml-4>
        <router-link :to="{ name: 'edit', query: { id: articleData._id } }">
          <button i-ri:edit-2-fill text-green />
        </router-link>
        <button v-if="articleData.state === 1" i-ri:restart-line text-pink @click="changeState(0)" />
        <button v-else i-ri:delete-bin-line text-red @click="changeState(1)" />
      </div>
    </div>
    <div text="gray sm">
      {{ formatTime(articleData?.createTime) }}
    </div>
    <MdEditor v-if="articleData" v-model="articleData.content" preview-only mt-4 :theme="isdark ? 'dark' : 'light'" bg-op-0 />
  </div>
</template>
