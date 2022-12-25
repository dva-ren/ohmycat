<script lang="ts" setup>
import type { ExposeParam } from 'md-editor-v3'
import MdEditor from 'md-editor-v3'
import { cloudApi, isDark } from '~/composables'
import { success, warning } from '~/components/Toast'
import 'md-editor-v3/lib/style.css'

const route = useRoute()
const router = useRouter()
const token = useLocalStorage('token', null)
const id = $computed(() => route.query.id)
const windowSize = useWindowSize()

const editorRef = ref<ExposeParam>()

const articleForm = reactive({
  id: '',
  title: '',
  content: '',
  label: '',
})
const add = async () => {
  if (!articleForm.title || !articleForm.content) {
    warning('标题或内容不能为空')
    return
  }
  if (id) {
    const res = await cloudApi.invokeFunction('update-article', articleForm)
    if (res.code === 200) {
      success('更新成功')
      router.push({ name: 'posts', params: { id: articleForm.id } })
    }
  }
  else {
    const res = await cloudApi.invokeFunction('add-article', articleForm)
    if (res.code === 200) {
      success('添加成功')
      router.push({ name: 'posts', params: { id: articleForm.id } })
    }
  }
}
const getArticle = async () => {
  if (!token || !id)
    return
  const res = await cloudApi.invokeFunction('query-article', { id })
  const { _id, title, content, label } = res.data
  articleForm.id = _id
  articleForm.title = title
  articleForm.content = content
  articleForm.label = label
}
getArticle()
onMounted(() => {
  if (windowSize.width.value < 600)
    editorRef.value?.togglePreview(false)
})
const preview = () => {

}
</script>

<template>
  <div v-show="!id || articleForm.id" max-w-400 p-4>
    <div py-2>
      <span style="color: red;">*</span>标题：<input v-model.trim="articleForm.title" bg-transparent type="text" border-b focus:outline-none>
    </div>
    <MdEditor ref="editorRef" v-model="articleForm.content" mt-4 :theme="isDark ? 'dark' : 'light'" />
    <div py-4>
      标签(可选):<input v-model="articleForm.label" bg-transparent type="text" border-b focus:outline-none>
    </div>
    <div>
      <button btn bg-gray @click="preview">
        预览
      </button>
      <button btn bg-gray ml-4>
        保存
      </button>
      <button btn ml-4 mt-6 @click="add">
        发布
      </button>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  windowFull: true
</route>

<style scoped>
:deep(.md-editor-dark) {
  --md-bk-color: transparent;
}
:deep(.md-editor-dark blockquote) {
  background-color: rgba(224,224,224,0.1) !important;
}
</style>
