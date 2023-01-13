<script lang="ts" setup>
import type { Note } from '~/types'
import { formateToLocaleHasWeek } from '~/composables'
import { queryNote, queryNoteList } from '~/api'
import Message from '~/components/Message'
import { dateFns } from '~/composables/date'

const loading = ref(true)
const note = ref<Note>()
const notes = ref<Array<Note>>([])
const route = useRoute()
const id = computed(() => route.params.id as string)
const index = computed(() => {
  const idx = notes.value.findIndex(n => n.id === id.value)
  return idx > 0 ? idx : 0
})

const getNote = async (id: string) => {
  loading.value = true
  const res = await queryNote(id)
  note.value = res.data
  loading.value = false
}
const getNotes = async () => {
  const res = await queryNoteList()
  notes.value = res.data.list
}

const fetchData = async () => {
  await getNotes()
  if (notes.value.length === 0) {
    Message.error('内容为空')
    return
  }
  if (id.value && id.value === 'latest')
    getNote(notes.value[0].id!)
  else
    getNote(id.value)
}

const weather = () => {
  const { weather } = note.value!
  if (weather.includes('晴'))
    return 'i-carbon-sun'
  if (weather.includes('阴'))
    return 'i-carbon-cloud'
  if (weather.includes('雨'))
    return 'i-carbon-rain-heavy'
  if (weather.includes('雪'))
    return 'i-carbon-snow-scattered'
  return 'i-carbon-word-cloud'
}

watch(id, () => {
  fetchData()
}, { immediate: true })
</script>

<template>
  <Layout :loadding="loading">
    <!-- <Loadding :loadding="loading" /> -->
    <div v-if="note">
      <div class="info" border p-4>
        <p class="left-label">
          {{ formateToLocaleHasWeek(note.createTime) }}
        </p>
        <p text-center p-4 text="16.8px">
          {{ note.title }}
        </p>
        <MyEditor v-model="note.content" min-h-60vh />
        <div class="line" />
        <div text="center sm">
          <router-link to="/timeLine?type=notes">
            <span pr-1>时间线</span>
            <div i-ri-time-line inline-block />
          </router-link>
        </div>
        <div text-sm flex justify-between>
          <div>
            <router-link v-if="index > 0" :to="`/notes/${notes[index - 1]?.id}`">
              <div flex items-center>
                <div text-xl i-ri-arrow-drop-left-line />
                <span>上一篇</span>
              </div>
              <div pl-5 max->
                {{ notes[index - 1]?.title }}
              </div>
            </router-link>
          </div>
          <div>
            <router-link v-if="index < notes.length - 1" :to="`/notes/${notes[index + 1]?.id}`">
              <div flex items-center>
                <span>下一篇</span>
                <div text-xl i-ri-arrow-drop-right-line />
              </div>
              <div>
                {{ notes[index + 1]?.title }}
              </div>
            </router-link>
          </div>
        </div>
        <div text-sm flex justify-between mt-4>
          <div flex items-center gap-4>
            <div v-if="note.weather" flex items-center gap-1>
              <div :class="weather()" />
              <div>{{ note.weather }}</div>
            </div>
            <div display-none>
              <div i-carbon-sun />
              <div i-carbon-rain-heavy />
              <div i-carbon-cloud />
              <div i-carbon-snow-scattered />
              <div i-carbon-word-cloud />
            </div>
            <div flex items-center gap-1>
              <div i-ri-calendar-todo-line />
              <div>{{ dateFns(note.createTime).fromNow() }}</div>
            </div>
          </div>
          <div flex items-center gap-2px>
            <div i-ri-heart-3-fill />
            <div>0</div>
          </div>
        </div>
      </div>
      <div py-10 style="color: var(--light-brown)" />
    </div>
  </Layout>
</template>

<style scoped>
.info{
  color: var(--light-brown);
  position: relative;
}
.dark .info{
  color: white;
}
.info::before{
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  right: 0;
  bottom: 0;
  border-top: rgba(0, 0, 0, 0.5) 1rem solid;
  border-right: transparent 1rem solid;
}
.line{
  position: relative;
  padding-bottom: 1rem;
}
.line::before{
  content: '';
  position: absolute;
  background: #2333;
  left: 50%;
  width: 200px;
  transform: translateX(-50%);
  height: 1px;
}
</style>
