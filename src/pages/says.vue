<script lang="ts" setup>
import type { Say } from '../types'
import { querySayList } from '~/api'

interface SayInfo extends Say {
  color?: string
  delay?: number
}

const list1 = ref<Array<SayInfo>>([])
const list2 = ref<Array<SayInfo>>([])

const windowSize = useWindowSize()

const isMini = ref(windowSize.width.value < 600)
const loadding = ref(true)

const says = ref<Array<SayInfo>>([])

const colors = [
  '#eba0b3',
  '#3170a7',
  '#a4aca7',
  '#f8c387',
  '#f17666',
  '#f8df72',
  '#ed3333',
]

const initList = (data: Say[]) => {
  data.forEach((say, idx) => {
    const s = {
      ...say,
      color: colors[idx % colors.length],
      delay: idx * 0.1,
    }
    says.value.push(s)
    if (idx % 2 === 0)
      list1.value.push(s)
    else
      list2.value.push(s)
  })
}

const getSays = async () => {
  const res = await querySayList()
  initList(res.data.list)
  loadding.value = false
}
watch(useDebounce(windowSize.width, 500), () => {
  if (windowSize.width.value < 600)
    isMini.value = true
  else
    isMini.value = false
})
getSays()
</script>

<template>
  <div max-w-1000px p-4 m-auto>
    <Loadding :loadding="loadding" />
    <div v-if="!loadding">
      <div v-if="!isMini" flex gap-4>
        <div flex-1>
          <SayCard v-for="s in list1" :key="s.id" :data="s" :delay="s.delay" />
        </div>
        <div flex-1>
          <SayCard v-for="s in list2" :key="s.id" :data="s" :delay="s.delay" />
        </div>
      </div>
      <div v-else>
        <SayCard v-for="s in says" :key="s.id" :data="s" :delay="s.delay" />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
