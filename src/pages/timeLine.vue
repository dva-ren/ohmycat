<script lang="ts" setup>
import type { Article } from '~/types'
import { cloudApi, formatTime, getOutOfDate, getOutOfMouth, getOutOfYear } from '~/composables'

const loading = ref(true)
const posts = ref<Array<Article>>([])
const route = useRoute()

const type = computed(() => route.query.type || 'posts')

const getPosts = async () => {
  const res = await cloudApi.invokeFunction('get-article', {})
  posts.value = res.data
  loading.value = false
}
const outOfTime = ref<string | number>()

let timer: any
onMounted(() => {
  timer = setInterval(() => {
    outOfTime.value = getOutOfDate(new Date()).toFixed(8)
  }, 10)
})
onBeforeMount(() => {
  clearInterval(timer)
})
getPosts()
</script>

<template>
  <Layout class="_fadeInUp">
    <p text-xl>
      时间线 · 记录生活
    </p>
    <div py-4 px-8>
      <div text-sm text-gray-600 pt-4>
        <p>今年已过: {{ getOutOfYear(new Date()) }}%</p>
        <p py-1>
          本月已过: {{ getOutOfMouth(new Date()) }}%
        </p>
        <p>今天已过: {{ outOfTime }}%</p>
        <p py-1>
          珍惜时间 享受当下
        </p>
      </div>
    </div>
    <div v-if="!loading" px-10 class="_fadeInUp">
      <p class="left-label" pl-4 py-2>
        2022
      </p>
      <ul class="posts" text-gray-500>
        <li v-for="item in posts" :key="item._id" class="item" flex items-center>
          <span text-sm>{{ formatTime(item.createTime, 'MM/dd') }}</span>
          <router-link :to="`/${type}/${item._id}`" class="link" px-2 text-gray-800>
            {{ item.title }}
          </router-link>
        </li>
      </ul>
    </div>
  </Layout>
</template>

<style scoped>
.item{
  position: relative;
  height: 30px;
  padding-left: 1rem;
}
.item::before{
  content: '';
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 9999px;
  top: 50%;
  left: -0.3rem;
  transform: translateY(-50%);
  background-color: var(--yellow);
}
.item::after{
  content: '';
  position: absolute;
  width: 1px;
  height: 30px;
  top: 50%;
  left: -0.1rem;
  transform: translateY(-50%);
  background-color: var(--yellow);
}
.posts .item:first-child::after{
  transform: translateY(10%);
}
.posts .item:last-child::after{
  transform: translateY(-90%);
}
.link{

}
.link:hover{
  /* outline: 1px solid orange; */
  border-bottom: 1px orange solid;
  /* text-decoration: underline orange; */
}
</style>
