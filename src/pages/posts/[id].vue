<script lang="ts" setup>
import MdEditor from 'md-editor-v3'
import type { Article } from '~/types'
import { cloudApi, formateToLocale } from '~/composables'
import Message from '~/components/Message'
const { id } = defineProps<{ id: number | string }>()
const MdCatalog = MdEditor.MdCatalog
const scrollElement = document.documentElement

const showModel = ref(false)
const loading = ref(true)
const token = useLocalStorage('token', null)

const articleData = ref<Article>()

const getArticle = async () => {
  const res = await cloudApi.invokeFunction('query-article', { id })
  articleData.value = res.data
  loading.value = false
}
const changeState = async (state: 0 | 1) => {
  const res = await cloudApi.invokeFunction('update-article-state', {
    id,
    state,
  })
  if (res.code === 200) {
    articleData.value && (articleData.value.state = state)
    if (state === 0)
      Message.success('已恢复显示')
    if (state === 1)
      Message.success('已删除')
  }
}
const handleOk = () => {
  showModel.value = false
  changeState(1)
}

getArticle()
</script>

<template>
  <Layout v-if="articleData" class="fade_in_up">
    <Loadding v-model="loading" />
    <div w-full>
      <div flex items-center justify-between mb-4>
        <div text-2xl>
          {{ articleData?.title }}
        </div>
        <Popper v-if="token" :offset="8" trigger="hover">
          <button px-4>
            操作
            <div i-ri-arrow-drop-down-line inline-block vertical-top />
          </button>
          <template #content>
            <div hover:bg-gray-100 w-20>
              <router-link :to="{ name: 'edit', query: { id: articleData._id } }" w-full>
                <div p="x2 y1">
                  <div text-sm i-ri:edit-2-fill text-gray inline-block vertical-top />
                  编辑
                </div>
              </router-link>
            </div>
            <div hover:bg-gray-100 cursor-pointer>
              <div v-if="articleData.state === 0" p-1 p="x2 y1" @click="showModel = true">
                <div vertical-top text-sm inline-block i-ri:delete-bin-line text-red />
                删除
              </div>
              <div v-else p-1 p="x2 y1" @click="changeState(0)">
                <div vertical-top text-sm inline-block i-ri:restart-line text-pink />
                恢复
              </div>
            </div>
          </template>
        </Popper>
      </div>
      <div>
        <MyEditor v-model="articleData.content" />
      </div>
      <div mt-10 text="xs gray" md:text-sm>
        <p>文章标题：{{ articleData.title }}</p>
        <p py-2>
          文章作者：x-bbi
        </p>
        <p>最后修改时间：{{ formateToLocale(articleData.updateTime) || formateToLocale(articleData.createTime) }}</p>
        <p w-full my-4 h-1px bg-gray-2 />
        <div flex items-center select-none>
          <i i-ri:calendar-todo-line mr-1 />
          <span>{{ formateToLocale(articleData.createTime) }}</span>
          <i ml-4 i-ri:hashtag />
          <span>{{ articleData.label }}</span>
        </div>
      </div>

      <Modal v-model="showModel">
        <div w-80 h-30 bg-white p-4 rounded>
          <div>
            确定删除吗
          </div>
          <div mt-8 flex justify-end gap-4>
            <button btn bg-gray @click="handleOk">
              确定
            </button>
            <button btn @click="showModel = false">
              取消
            </button>
          </div>
        </div>
      </Modal>
      <div my-10 text-gray-5>
        <button @click="$router.go(-1)">
          <div i-ri-arrow-left-line inline-block vertical-top text-xl />返回..
        </button>
      </div>
    </div>

    <template #sidebar>
      <div sticky top-20 mt-20>
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

