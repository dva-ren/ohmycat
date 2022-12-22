<script lang="ts" setup>
import MdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import type { Article } from '~/types'
import { getArticleById } from '~/api'
const { id } = defineProps<{ id: number | string }>()
const isdark = useDark()

const articleData = ref<Article>()

const getArticle = async () => {
  const res = await getArticleById(Number(id))
  articleData.value = res.data
}
getArticle()
</script>

<template>
  <div w-full overflow-hidden>
    <div flex items-center gap-2>
      <div text-2xl>
        {{ articleData?.title }}
      </div>
      <div text-sm border rounded dark:border-gray-600 text-center>
        {{ articleData?.label }}
      </div>
    </div>
    <div text="gray sm">
      {{ articleData?.createTime }}
    </div>
    <MdEditor v-if="articleData" v-model="articleData.content" preview-only mt-4 :theme="isdark ? 'dark' : 'light'" bg-op-0 />
  </div>
</template>
