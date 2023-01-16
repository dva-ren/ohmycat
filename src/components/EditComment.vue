<script lang="ts" setup>
import Message from './Message'
import type { CommentForm } from '~/types'
import { addComment } from '~/api'

const { refId, type, index, parentId = '' } = defineProps<{ refId: string; type: string; index: number; parentId?: string }>()

const emits = defineEmits(['onSend'])

const mailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const urlReg = /^(https:\/\/|http:\/\/)/
const processing = ref(false)
const commentForm = reactive<CommentForm>({
  ref: refId,
  refType: type,
  author: '',
  mail: '',
  url: '',
  content: '',
  parent: parentId,
  commentsIndex: index,
  key: '',
  location: '',
  isWhispers: 0,
  avatar: '',
})
watch(() => index, () => {
  commentForm.commentsIndex = index
})
const handleAddComment = useThrottleFn(async () => {
  const { author, mail, content, url } = commentForm
  if (!content) {
    Message.warning('你好像什么都没说')
    return
  }
  if (!author) {
    Message.warning('取个昵称吧')
    return
  }
  if (!mailReg.test(mail)) {
    Message.warning('检查下邮箱格式吧')
    return
  }
  if (url !== '' && !urlReg.test(url)) {
    Message.warning('网址格式不对呀')
    return
  }
  processing.value = true
  const res = await addComment(commentForm)
  if (res.code === 200) {
    Message.success('评论成功')
    emits('onSend')
    commentForm.content = ''
    localStorage.setItem('user', JSON.stringify({
      author,
      mail,
      url,
    }))
  }
  processing.value = false
}, 1000)
onMounted(() => {
  const user = localStorage.getItem('user')
  if (user) {
    try {
      const info = JSON.parse(user)
      commentForm.author = info.author
      commentForm.mail = info.mail
      commentForm.url = info.url
    }
    catch {

    }
  }
})
</script>

<template>
  <div>
    <div flex gap-4 flex-col sm:flex-row>
      <div class="input-area">
        <span i-ri-user-heart-line />
        <input v-model="commentForm.author" type="text" placeholder="昵称 *">
      </div>
      <div class="input-area">
        <div i-ri-mail-send-line inline-block />
        <input v-model="commentForm.mail" type="text" placeholder="邮箱 *">
      </div>
      <div class="input-area">
        <div i-ri-earth-line />
        <input v-model="commentForm.url" type="text" placeholder="网站(可留空)">
      </div>
    </div>
    <div mt-8>
      <textarea v-model="commentForm.content" :style="{ backgroundColor: commentForm.isWhispers ? '#a3a3a329' : '' }" min-h-40 border placeholder="嘿(～￣▽￣)～，留个评论好不好" p-2 />
    </div>
    <div p-2 flex justify-between text-sm>
      <div>
        <Popper trigger="hover" placement="bottom-start">
          <button btn rounded-full py-1>
            (≧∇≦)ﾉ
          </button>
          <template #content>
            <div p-4 text-sm flex gap-2>
              <span hover:text-orange>( •̀ ω •́ )✧</span>
              <span hover:text-orange>(～￣▽￣)～</span>
              <span hover:text-orange>(*^▽^*)</span>
            </div>
          </template>
        </Popper>
      </div>
      <div text-sm>
        <span select-none cursor-pointer @click="commentForm.isWhispers = Number(!commentForm.isWhispers)">
          <div class="checkbox" :class="{ checked: commentForm.isWhispers }" />
          <span>悄悄话</span>
        </span>
        <button :disabled="!commentForm.content || processing" px-4 py-1 cursor-pointer text-white ml-4 rounded-full bg-orange-4 disabled:bg-gray @click="handleAddComment">
          发送
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.input-area input,textarea{
  width: 100%;
  outline: none;
  min-width: 0;
  background: transparent;
}
textarea{
  min-width: 0;
  transition: background-color .2s;
}
.input-area{
  display: flex;
  align-items: center;
  padding: 0.1rem 0.5rem;
  border-width: 1px;
  gap: 4px;
}
.checkbox{
  position: relative;
  display: inline-block;
  cursor: pointer;
  width: 1rem;
  height: 1rem;
  /* border: 1px solid gray; */
  /* border: 1px solid gray; */
  overflow: hidden;
  vertical-align:middle;
  transition: border 0.4s;
  margin-right: 4px;
}
.checkbox::before{
  position: absolute;
  top:0;
  left: 0;
  content: '';
  width: 1rem;
  height: 1rem;
  border: 2px solid rgb(201, 95, 95);

  /* border: 2px solid gray; */
  transition: all .4s ease-in-out;
}
.checked::before{
  transform: rotate(-55deg);
  left: -0.18rem;
  top: -0.42rem;
}
.checked{
  border:none;
}
</style>
