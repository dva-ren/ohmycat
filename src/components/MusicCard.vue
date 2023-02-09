<script lang="ts" setup>
import { querySongInfo } from '~/api'
import { usePlayer } from '~/hooks'
import { useMainStore } from '~/store'
import type { SongInfo } from '~/types'
const props = defineProps<{ id: string }>()
const mainStore = useMainStore()

const songInfo = reactive<SongInfo>({
  id: props.id,
  artist: '',
  name: '',
  pic: '',
  url: '',
  time: '',
  lrc: '',
})
const { player } = usePlayer()
const playing = ref(false)

const getInfo = async () => {
  const res = await querySongInfo(props.id)
  try {
    const artists = JSON.parse(res.data.artist).map((i: any) => i.name) as Array<String>
    songInfo.artist = artists.join(',')
  }
  catch {
  }
  songInfo.name = res.data.name
  songInfo.pic = res.data.pic
  songInfo.lrc = res.data.lrc
  songInfo.time = res.data.time
  songInfo.url = res.data.url
}
getInfo()
const handleClick = () => {
  if (mainStore.showPlayer === false)
    mainStore.showPlayer = true
  if (!playing.value)
    player.play(songInfo)
  else
    player.pause()
  playing.value = !playing.value
}
</script>

<template>
  <div rounded p-2 border flex gap-4 max-w-80 items-center relative shadow hover:shadow-xl transition>
    <MyImg :src="songInfo.pic" w-12 h-12 object-fit rounded />
    <div flex-1 overflow-hidden>
      <div>{{ songInfo.name }}</div>
      <div text-gray-3 text-sm overflow-hidden text-ellipsis whitespace-nowrap>
        {{ songInfo.artist }}
      </div>
    </div>
    <div>
      <button @click="handleClick">
        <div v-if="!playing" i-carbon-play-outline text-3xl />
        <div v-else i-carbon-pause-outline text-3xl />
      </button>
    </div>
    <div pointer-events-none bg-gray-1 w-full h-full absolute left-0 rounded transition duration-500 :style="{ opacity: songInfo.name ? 0 : 1 }" />
  </div>
</template>
