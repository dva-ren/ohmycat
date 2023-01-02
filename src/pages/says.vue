<script lang="ts" setup>
import type { Say } from '../types'
import SayCard from './SayCard.vue'
import { cloudApi } from '~/composables'
const list1 = ref<Array<Say>>([])
const list2 = ref<Array<Say>>([])

const windowSize = useWindowSize()

const isMini = computed(() => windowSize.width.value < 600)
const loadding = ref(true)

const says = ref<Array<Say>>([])

const colors = [
  '#eba0b3',
  '#3170a7',
  '#a4aca7',
  '#f8c387',
  '#f17666',
  '#f8df72',
  '#ed3333',
]

const initList = () => {
  says.value.forEach((say, idx) => {
    say.color = colors[idx % colors.length]
    if (idx % 2 === 0)
      list1.value.push(say)
    else
      list2.value.push(say)
  })
}

const getSays = async () => {
  const res = await cloudApi.invokeFunction('get-says', {})
  says.value = res.data
  initList()
  loadding.value = false
}

getSays()
</script>

<template>
  <div max-w-1000px p-4 m-auto>
    <Loadding v-model="loadding" />
    <div v-if="!loadding">
      <div v-if="!isMini" flex gap-4>
        <div flex-1>
          <SayCard v-for="s, idx in list1" :key="s._id" :data="s" :delay="idx * 0.1" />
        </div>
        <div flex-1>
          <SayCard v-for="s, idx in list2" :key="s._id" :data="s" :delay="idx * 0.1" />
        </div>
      </div>
      <div v-else>
        <SayCard v-for="s, idx in says" :key="s._id" :data="s" :delay="idx * 0.1" />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
