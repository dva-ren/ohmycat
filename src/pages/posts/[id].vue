<script lang="ts" setup>
import MdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import type { Article } from '~/types'
import { cloudApi, formatTime } from '~/composables'
import { success } from '~/components/Toast'

const { id } = defineProps<{ id: number | string }>()
const showModel = ref(false)

const isDark = useDark()
const token = useLocalStorage('token', null)

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
  if (res.code === 200) {
    articleData.value && (articleData.value.state = state)
    if (state === 0)
      success('已恢复显示')
    if (state === 1)
      success('已删除')
  }
}
const handleOk = () => {
  showModel.value = false
  changeState(1)
}
getArticle()
</script>

<template>
  <div v-if="articleData" w-full>
    <div flex items-center justify-between>
      <div flex items-center gap-2>
        <div text-2xl>
          {{ articleData?.title }}
        </div>
        <div text-sm border rounded dark:border-gray-600 text-center>
          {{ articleData?.label }}
        </div>
      </div>
      <Dropdown v-if="token" text-sm>
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
      </Dropdown>
    </div>
    <div text="gray sm">
      {{ formatTime(articleData?.createTime) }}
    </div>
    <MdEditor v-model="articleData.content" preview-only mt-4 :theme="isDark ? 'dark' : 'light'" bg-op-0 />
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
    <div my-10 text-gray>
      <button @click="$router.go(-1)">
        <div i-ri-arrow-left-circle-line inline-block vertical-top text-xl /> 返回..
      </button>
    </div>
  </div>
</template>
