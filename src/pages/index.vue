<script lang="ts" setup>
import type { Article, Note } from '~/types'
import { queryArticleList, queryNoteList } from '~/api'
import Message from '~/components/Message'
import { useMainStore } from '~/store'

const posts = ref<Array<Article>>([])
const notes = ref<Array<Note>>([])
const mainStore = useMainStore()
const master = computed(() => mainStore.master)

const loading = ref(true)
const words = ref('')

const getPosts = async () => {
  const res = await queryArticleList()
  posts.value = res.data.list.slice(0, 4)
  loading.value = false
}
const getNotes = async () => {
  const res = await queryNoteList()
  notes.value = res.data.list.slice(0, 4)
  loading.value = false
}

fetch('https://v1.hitokoto.cn').then((response) => {
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
  <BaseLayout py-20>
    <div v-spring flex flex-col items-center justify-center sm="flex-row justify-unset" gap-6>
      <img
        :src="master?.avatar" h-30 w-30 rounded-full object-cover p-1 bg-gray-2 shadow
        loading="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCAAwADEDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/2Q=="
      >
      <div text-center sm:text-left>
        <p text-xl font-bold>
          {{ master?.nickname }}
        </p>
        <p text="sm gray-6" py-4>
          {{ master?.introduce }}
        </p>
        <div v-spring:delay="100" text-gray-1>
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
    <TextAnimation min-h-10 :text="words" class="text-sm text-gray-400 px-4 pt-4 pb-8" />
    <!-- <Loadding :loadding="loading" /> -->
    <div v-if="!loading" v-spring>
      <div text-white text-sm>
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
      <div text-white mt-10 text-sm>
        <div flex justify-between items-end class="label">
          <div class="title" flex bg="#f17666">
            <div class="icon" bg="#ed3321">
              <div i-carbon:bookmark class="v-icon" inline-block />
            </div>
            <span px-3>记录生活</span>
          </div>
          <router-link to="/notes/latest" class="icon" bg="#f17666" p-4>
            <div i-carbon:chevron-right text-lg />
          </router-link>
        </div>
        <CardList :data="notes" type="notes" />
      </div>
      <div text-white mt-10 text-sm>
        <div flex justify-between items-end class="label">
          <div class="title" flex bg="#55bb8a">
            <div class="icon" bg="#12a182">
              <div i-carbon:bookmark class="v-icon" inline-block />
            </div>
            <span px-3>朋友们</span>
          </div>
          <router-link to="/friends" class="icon" bg="#55bb8a" p-4>
            <div i-carbon:chevron-right text-lg />
          </router-link>
        </div>
        <div class="friends" flex gap-10 px-10 overflow-x-auto w-full>
          <img shrink-0 shadow w-25 h-25 rounded-full object-cover src="https://image.dvaren.xyz/images/unsplash/bulksplash-jon_photos-RM5jjBIh8Hw.jpg" alt="">
          <img shrink-0 shadow w-25 h-25 rounded-full object-cover src="https://image.dvaren.xyz/images/unsplash/173814.jpg" alt="">
          <img shrink-0 shadow w-25 h-25 rounded-full object-cover src="https://image.dvaren.xyz/images/unsplash/bulksplash-tomofficials-WODiUmUDWGQ.jpg" alt="">
        </div>
      </div>
      <div text-white mt-10 text-sm>
        <div flex justify-between items-end class="label">
          <div class="title" flex bg="#2376b7">
            <div class="icon" bg="#144a74">
              <div i-carbon:bookmark class="v-icon" inline-block />
            </div>
            <span px-3>了解更多</span>
          </div>
          <!-- <button class="icon" bg="#2376b7" p-4 @click="Message.warning('没有更多了')">
              <div i-carbon:chevron-right text-lg />
            </button> -->
        </div>
        <div grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-8 text-sm>
          <router-link to="/about">
            <Card text="关于我" title="这里有我的小秘密" />
          </router-link>
          <router-link to="/gallery">
            <Card title="记录美好瞬间" text="相册" />
          </router-link>
          <Card title="你的话对我很重要" text="留言" @click="handleClick" />
        </div>
      </div>
    </div>
  </baselayout>
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
.friends::-webkit-scrollbar-thumb, .friends::-webkit-scrollbar-thum:hover {
  background-color: rgba(0,0,0,0);
}
</style>
