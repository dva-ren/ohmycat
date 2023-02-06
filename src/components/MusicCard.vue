<script lang="ts" setup>
import { querySongInfo } from '~/api'
import { usePlayer } from '~/hooks'
const props = defineProps<{ id: string | number }>()
const songInfo = reactive({
  id: props.id as number,
  artist: '',
  name: '',
  pic: '',
  url: '',
  time: '',
})
const { player } = usePlayer()

const playState = ref(false)

onMounted(() => {
  setTimeout(() => {
    songInfo.name = 'Lover'
  }, 500)
})
const getInfo = async () => {
  const res = await querySongInfo(props.id)
  console.log(res)
  songInfo.artist = res.data.artist
  songInfo.name = res.data.name
  songInfo.pic = res.data.pic
}
getInfo()
const handleClick = () => {
  player.play(songInfo)
}
</script>

<template>
  <div rounded p-2 border flex gap-4 w-70 items-center relative shadow>
    <img :src="songInfo.pic" w-12 h-12 object-fit rounded>
    <div flex-1 overflow-hidden>
      <div>{{ songInfo.name }}</div>
      <div text-gray-3 text-sm>
        {{ songInfo.artist }}
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
