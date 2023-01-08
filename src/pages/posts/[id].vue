<script lang="ts" setup>
import MdEditor from 'md-editor-v3'
import type { Article } from '~/types'
import { formateToLocale } from '~/composables'
import Message from '~/components/Message'
import { queryArticle } from '~/api'

const { id } = defineProps<{ id: string }>()
const MdCatalog = MdEditor.MdCatalog
const scrollElement = document.documentElement

const loading = ref(true)

const articleData = ref<Article>()

const getArticle = async () => {
  const res = await queryArticle(id)
  if (res.code === 200)
    articleData.value = res.data
  else
    Message.error(res.msg)
  loading.value = false
}

getArticle()
</script>

<template>
  <Layout v-if="articleData" :loadding="loading">
    <div class="fade_in_up">
      <div w-full>
        <div flex items-center justify-between mb-4>
          <div text-2xl>
            {{ articleData?.title }}
          </div>
        </div>
        <div>
          <MyEditor v-model="articleData.content" />
        </div>
        <div mt-10 text="xs gray" md:text-sm>
          <p>文章标题：{{ articleData.title }}</p>
          <p py-2>
            文章作者：T-BBI
          </p>
          <p>最后修改时间：{{ formateToLocale(articleData.updateTime) || formateToLocale(articleData.createTime) }}</p>
          <p w-full my-4 h-1px bg-gray-2 />
          <div flex items-center select-none>
            <i i-ri:calendar-todo-line mr-1 />
            <span>{{ formateToLocale(articleData.createTime) }}</span>
            <i ml-4 i-ri:hashtag />
            <span pl-1>{{ articleData.categoryName }}</span>
          </div>
        </div>
        <div my-10 text-gray-5>
          <button @click="$router.go(-1)">
            <div i-ri-arrow-left-line inline-block vertical-top text-xl />返回..
          </button>
        </div>
      </div>
    </div>
    <template #sidebar>
      <div sticky top-20 mt-20 text-sm>
        <MdCatalog
          editor-id="my-editor"
          :scroll-element="scrollElement"
          theme="light"
        />
      </div>
    </template>
  </Layout>
</template>

<style scoped>
:deep(.md-editor-dark) {
  --md-bk-color: transparent;
}
:deep(.md-editor-dark blockquote) {
  background-color: rgba(224,224,224,0.1) !important;
}
</style>

