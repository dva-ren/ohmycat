<script lang="ts" setup>
import type { Article } from '~/types'
import { cloudApi, formateToLocaleHasWeek } from '~/composables'

const loading = ref(true)
const note = ref<Article>()
const notes = ref<Array<Article>>([])
const route = useRoute()
const id = computed(() => route.params.id as string)
const index = computed(() => {
  const idx = notes.value.findIndex(n => n._id === id.value)
  return idx > 0 ? idx : 0
})

const getNote = async (id: string) => {
  loading.value = true
  const res = await cloudApi.invokeFunction('get-note', { id })
  note.value = res.data
  loading.value = false
}
const getNotes = async () => {
  const res = await cloudApi.invokeFunction('get-notes', {})
  notes.value = res.data
}

const fetchData = async () => {
  await getNotes()
  if (id.value && id.value === 'latest')
    getNote(notes.value[0]._id!)
  else
    getNote(id.value)
}
watch(id, () => {
  getNote(id.value)
})
fetchData()
</script>

<template>
  <Layout>
    <Loadding v-model="loading" />
    <div v-if="!loading && note" class="fade_in_up">
      <div class="info" border p-4>
        <p class="left-label">
          {{ formateToLocaleHasWeek(note.createTime) }}
        </p>
        <p text-center pt-4 text="16.8px">
          {{ note.title }}
        </p>
        <MyEditor v-model="note.content" />
      </div>
      <div py-10>
        <p text-center py-4>
          <router-link to="/timeLine?type=notes" border>
            时间线
          </router-link>
        </p>
        <div flex justify-between>
          <div>
            <router-link v-if="index > 0" :to="`/notes/${notes[index - 1]?._id}`" btn>
              上一篇
            </router-link>
          </div>
          <div>
            <router-link v-if="index < notes.length - 1" :to="`/notes/${notes[index + 1]?._id}`" btn>
              下一篇
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<style scoped>
.info{
  color: var(--light-brown);
}
.dark .info{
  color: white;
}
</style>
