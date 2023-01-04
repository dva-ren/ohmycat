<script lang="ts" setup>
import type { Article } from '~/types'
import { cloudApi, formatTime, getOutOfDate, getOutOfMouth, getOutOfYear } from '~/composables'

const loading = ref(true)
const list = ref<Array<Article>>([])
const route = useRoute()

const type = computed(() => route.query.type || 'posts')
const category = computed(() => route.query.category)
const outOfTime = ref<string | number>()

const getNotes = async () => {
  let timer: any
  onMounted(() => {
    timer = setInterval(() => {
      outOfTime.value = getOutOfDate(new Date()).toFixed(8)
    }, 10)
  })
  onBeforeMount(() => {
    clearInterval(timer)
  })
  const res = await cloudApi.invokeFunction('get-notes', {})
  list.value = res.data.slice(0, 4)
  loading.value = false
}

const getPosts = async () => {
  loading.value = true
  const res = await cloudApi.invokeFunction('get-article', { category: category.value })
  list.value = res.data
  loading.value = false
}

const fetchData = async () => {
  if (type.value === 'posts')
    getPosts()
  else
    getNotes()
}
watch(category, () => {
  getPosts()
})
fetchData()
</script>

<template>
  <Layout class="fade_in_up">
    <p text-xl>
      时间线 · 记录生活
    </p>
    <div v-if="type === 'notes'" px-8>
      <div text-sm text-gray-600 pt-4>
        <p>今天是：{{ formateToLocaleHasWeek(new Date().toDateString()) }}</p>
        <p>今年已过: {{ getOutOfYear(new Date()) }}%</p>
        <p py-1>
          本月已过: {{ getOutOfMouth(new Date()) }}%
        </p>
        <p>今日已过: {{ outOfTime }}%</p>
        <p py-1>
          珍惜时间，享受当下！
        </p>
      </div>
    </div>
    <p v-else text-gray text="15px" py-1>
      <span>该分类下共有</span>
      <span px-2 text-gray-6>{{ list.length }}</span>
      <span>篇文章</span>
    </p>
    <Loadding v-model="loading" />
    <div v-if="!loading" px-10 py-4>
      <p class="left-label" pl-4 py-2>
        2022
      </p>
      <ul class="posts" text-gray-500>
        <li v-for="item, idx in list" :key="item._id" class="item fade_in_up" :style="`--delay:${idx * 0.1}s`" flex items-center>
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
