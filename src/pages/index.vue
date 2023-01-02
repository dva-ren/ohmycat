<script lang="ts" setup>
import type { Article } from '~/types'
import { cloudApi } from '~/composables'
import Message from '~/components/Message'

const posts = ref<Array<Article>>([])
const notes = ref<Array<Article>>([])
const loading = ref(true)
const words = ref('')

const getPosts = async () => {
  const res = await cloudApi.invokeFunction('get-article', {})
  posts.value = res.data.slice(0, 4)
  loading.value = false
}
const getNotes = async () => {
  const res = await cloudApi.invokeFunction('get-notes', {})
  notes.value = res.data.slice(0, 4)
  loading.value = false
}
fetch('https://v1.hitokoto.cn/?encode=json&lang=cn').then((response) => {
  response.json().then((res) => {
    words.value = words.value = `「 ${res.hitokoto} 」 ——${res.from}`
  })
})
function handleClick() {
  Message.warning('开发中~')
}
Promise.all([getPosts(), getNotes()]).catch((e) => {
  console.error('服务器出错=>', e)
  setTimeout(() => {
    Message.error('服务器出错了~')
  }, 1000)
})
</script>

<template>
  <div max-w-1050px m-auto p-4 gap-4>
    <div flex flex-col items-center justify-center sm="flex-row justify-unset" gap-6 class="fade_in_up">
      <img src="https://image.dvaren.xyz/ohmycat/pictures/C2Nsbn_1672275786815.jpg?x-oss-process=image/resize,w_240" alt="t-bbi" h-30 w-30 rounded-full object-cover>
      <div text-center sm:text-left>
        <p text-xl font-bold>
          T-BBI
        </p>
        <p text="sm gray-6" py-4>
          这是我的小屋
        </p>
        <div text-gray-1>
          <a href="https://github.com/dva-ren" target="_blank" class="circle-icon" bg-blue-400>
            <div i-carbon:logo-github class="v-icon" inline-block />
          </a>
          <a ml-4 href="https://y.music.163.com/m/user?id=136604471" target="_blank" class="circle-icon" bg="#ff3a3a">
            <div i-ri-netease-cloud-music-line class="v-icon" inline-block />
          </a>
          <a ml-4 href="https://space.bilibili.com/60385716" target="_blank" class="circle-icon" bg="#f25d8e">
            <div i-ri-bilibili-fill class="v-icon" inline-block />
          </a>
          <a ml-4 href="mailto:473029463@qq.com" class="circle-icon" bg-teal-400>
            <div i-ri:at-line class="v-icon" inline-block />
          </a>
        </div>
      </div>
    </div>
    <TextAnimation :text="words" class="text-sm text-gray-400 px-4 pt-4 pb-8" />
    <Loadding v-model="loading" />
    <div v-if="!loading">
      <div text-white text-sm class="fade_in_up" style="--delay: 0.1s">
        <div flex justify-between items-end class="label">
          <div class="title" flex bg="#74759b">
            <div class="icon" bg="#2e317c">
              <div i-carbon:boolean class="v-icon" inline-block />
            </div>
            <span px-3>近期博文</span>
          </div>
          <router-link to="/posts" class="icon" bg="#74759b" p-4>
            <div i-carbon:chevron-right text-lg />
          </router-link>
        </div>
        <CardList :data="posts" />
      </div>
      <div text-white mt-10 text-sm class="fade_in_up" style="--delay: 0.2s">
        <div flex justify-between items-end class="label">
          <div class="title" flex bg="#f17666">
            <div class="icon" bg="#ed3321">
              <div i-carbon:bookmark class="v-icon" inline-block />
            </div>
            <span px-3>记录生活</span>
          </div>
          <router-link :to="`/notes/${notes[0]?._id}`" class="icon" bg="#f17666" p-4>
            <div i-carbon:chevron-right text-lg />
          </router-link>
        </div>
        <CardList :data="notes" type="notes" />
      </div>
      <div text-white mt-10 text-sm class="fade_in_up" style="--delay: 0.3s">
        <div flex justify-between items-end class="label">
          <div class="title" flex bg="#2376b7">
            <div class="icon" bg="#144a74">
              <div i-carbon:bookmark class="v-icon" inline-block />
            </div>
            <span px-3>了解更多</span>
          </div>
          <button class="icon" bg="#2376b7" p-4 @click="Message.warning('没有更多了')">
            <div i-carbon:chevron-right text-lg />
          </button>
        </div>
        <div grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-8 text-sm>
          <router-link to="/about">
            <Card text="关于我" title="这里有我的小秘密" />
          </router-link>
          <Card title="记录美好瞬间" text="相册" @click="handleClick" />
          <Card title="你的话对我很重要" text="留言" @click="handleClick" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.label{
  padding: 1rem 0;
}
.title{
  padding: .4rem 1.4rem .4rem .5rem;
  border-radius: 2rem;
}
.icon{
  border-radius: 1.25rem;
  padding: 0 .5em;
  height: 100%;
  color: white;
}
</style>
