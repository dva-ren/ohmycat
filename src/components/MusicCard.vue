<script lang="ts" setup>
import { useMainStore } from '~/store'

const props = defineProps<{ id: string | number }>()
const songInfo = reactive({
  name: '',
  author: 'Taylor Swift',
  cover: 'https://p2.music.126.net/6CB6Jsmb7k7qiJqfMY5Row==/109951164260234943.jpg',
})
const playState = ref(false)
const mainStore = useMainStore()

onMounted(() => {
  setTimeout(() => {
    songInfo.name = 'Lover'
  }, 500)
})
const handleClick = () => {
  mainStore.showPlayer = true
}
</script>

<template>
  <div rounded p-2 border flex gap-4 w-70 items-center relative shadow>
    <img :src="songInfo.cover" w-12 h-12 object-fit rounded>
    <div flex-1 overflow-hidden>
      <div>{{ songInfo.name }}</div>
      <div text-gray-3 text-sm>
        {{ songInfo.author }}
      </div>
    </div>
    <div>
      <button @click="handleClick">
        <div v-if="!playState" i-carbon-play-outline text-3xl />
        <div v-else i-carbon-pause-outline text-3xl />
      </button>
    </div>
    <div pointer-events-none bg-gray-1 w-full h-full absolute left-0 rounded transition duration-500 :style="{ opacity: songInfo.name ? 0 : 1 }" />
  </div>
</template>
