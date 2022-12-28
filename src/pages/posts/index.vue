<script lang="ts" setup>
import type { Article } from '~/types'
import { cloudApi } from '~/composables'

const posts = ref<Array<Article>>([])
const posts2 = ref<Array<Article>>([])
const loading = ref(true)
const words = ref('')

const getPosts = async () => {
  const res = await cloudApi.invokeFunction('get-article', {})
  posts.value = res.data.slice(0, 4)
  posts2.value = res.data.slice(4)
  loading.value = false
}
fetch('https://v1.hitokoto.cn/?encode=json&lang=cn').then((response) => {
  response.json().then((res) => {
    words.value = words.value = `「 ${res.hitokoto} 」 ——${res.from}`
  })
})
getPosts()
</script>

<template>
  <Layout full max-w-1050px m-auto p-4 gap-4>
    <!-- <Loadding v-model="loading" /> -->
    <div flex flex-col items-center justify-center sm="flex-row justify-unset" gap-6>
      <img src="" h-30 w-30 bg="#74759b" rounded-full object-cover>
      <div text-center sm:text-left>
        <p text-xl font-bold>
          X-BBI
        </p>
        <p text="sm gray-6" py-2>
          这是我的小屋
        </p>
        <div text-gray-1>
          <a href="https://github.com/dva-ren" target="_blank" class="circle-icon" bg-pink-400>
            <div i-carbon:logo-github class="v-icon" inline-block />
          </a>
          <a ml-4 href="#" class="circle-icon" bg-blue-400>
            <div i-ri:qq-line class="v-icon" inline-block />
          </a>
          <a ml-4 href="mailto:473029463@qq.com" class="circle-icon" bg-teal-400>
            <div i-ri:at-line class="v-icon" inline-block />
          </a>
        </div>
      </div>
    </div>
    <div text="sm gray-400" px-4 pt-4 pb-8>
      {{ words }}
    </div>
    <div v-if="!loading" class="_fadeInUp">
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
          <router-link to="/posts" class="icon" bg="#f17666" p-4>
            <div i-carbon:chevron-right text-lg />
          </router-link>
        </div>
        <CardList :data="posts2" />
      </div>
    </div>
  </Layout>
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
