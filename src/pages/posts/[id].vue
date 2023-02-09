<script lang="ts" setup>
import type { Article } from '~/types'
import { formateToLocale } from '~/composables'
import Message from '~/components/Message'
import { queryArticle } from '~/api'
import { useMainStore } from '~/store'
import { useHeaderInfo } from '~/hooks'

const { id } = defineProps<{ id: string }>()

const mainStore = useMainStore()
const loading = ref(true)

const articleData = ref<Article>()
let resetHeaderInfo = () => {}
const getArticle = async () => {
  const res = await queryArticle(id)
  if (res.code === 200) {
    articleData.value = res.data
    resetHeaderInfo = useHeaderInfo({
      id: res.data.id,
      title: res.data.title,
      type: res.data.categoryName,
    })
  }
  else { Message.error(res.msg) }
  loading.value = false
}
onBeforeUnmount(() => {
  resetHeaderInfo()
  mainStore.catalog = []
})
getArticle()
</script>

<template>
  <Layout :loadding="loading">
    <div v-if="articleData">
      <div w-full>
        <div flex items-center justify-between mb-4>
          <div text-2xl style="color: var(--light-color)" mb-8>
            {{ articleData?.title }}
          </div>
        </div>
        <div min-h-100>
          <MarkdownViewer :value="articleData.content" />
        </div>
        <div mt-10 text="xs gray" md:text-sm>
          <p>文章标题：{{ articleData.title }}</p>
          <p py-2>
            文章作者：{{ mainStore.master?.nickname }}
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
          <button flex items-center style="color: var(--light-color);" @click="$router.go(-1)">
            <div i-ri-arrow-left-line inline-block />
            <div text-sm>
              返回..
            </div>
          </button>
        </div>
      </div>
      <Comment v-if="articleData.allowComment && articleData" :ref-id="id" type="posts" />
    </div>
    <template #sidebar>
      <div sticky top-20 mt-20 text-sm>
        <Catalog />
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
