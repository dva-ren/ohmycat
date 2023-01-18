<script lang="ts" setup>
import type { Note } from '~/types'
import { formatTime, getOutOfDate, getOutOfMouth, getOutOfYear } from '~/composables'
import { queryNoteList } from '~/api'
const loading = ref(true)
const notes = ref<Array<Note>>([])

const outOfTime = ref<string | number>()
const total = ref(0)

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
  const res = await queryNoteList()
  notes.value = res.data.list
  total.value = res.data.total
  loading.value = false
}
const isNewYear = (date: string | Date, idx: number) => {
  if (idx === 0)
    return true
  return (new Date(notes.value[idx - 1].createTime).getFullYear() !== new Date(date).getFullYear())
}
getNotes()
</script>

<template>
  <Layout :loadding="loading">
    <p text-2xl>
      <TextAnimation text="时间线" />
    </p>
    <p text-gray py-1>
      <TextAnimation :text="`共有${notes.length}篇文章,继续加油`" />
    </p>
    <div>
      <div text-sm text-gray-600 pt-4>
        <p py-1>
          今天是：{{ formateToLocaleHasWeek(new Date().toDateString()) }}
        </p>
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
    <!-- <Loadding :loadding="loading" /> -->
    <div v-if="!loading" pl-8 py-4>
      <ul class="posts" text-gray-500>
        <template v-for="item, idx in notes" :key="item.id">
          <div class="fade_in_up" :style="`--delay:${idx * 0.1}s`">
            <p v-if="isNewYear(item.createTime, idx)" class="left-label" pl-4 py-2>
              {{ new Date(item.createTime).getFullYear() }}
            </p>
            <li class="item" flex items-center>
              <span text-sm>{{ formatTime(item.createTime, 'MM/dd') }}</span>
              <router-link :to="`/notes/${item.id}`" class="link" mx-2 text-gray-800 text-sm>
                {{ item.title }}
              </router-link>
              <span text="12px">
                <span>{{ item.mood }}/</span>
                <span>{{ item.weather }}</span>
              </span>
            </li>
          </div>
        </template>
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
  border-bottom: 1px orange solid;
  /* text-decoration: underline orange; */
}
</style>
