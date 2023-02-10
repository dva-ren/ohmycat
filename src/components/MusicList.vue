<script lang="ts" setup>
import type { Playlist, SongInfo } from '~/types'
import { usePlayer } from '~/hooks'
import { useMainStore } from '~/store'
const { type, playlist } = defineProps<{
  type: string
  playlist: Playlist
}>()
const { player, current, process } = usePlayer()
const mainStore = useMainStore()

const handleClick = (song: SongInfo) => {
  if (!mainStore.showPlayer)
    mainStore.showPlayer = true
  player?.play(song)
}
</script>

<template>
  <Loadding :loadding="!playlist" />
  <div flex gap-4 flex-col sm:flex-row pb-8>
    <div>
      <MyImg m-auto :src="playlist?.coverImgUrl" w-30 h-30 rounded-full static top-10 />
      <div py-2 text="center">
        {{ type }}
      </div>
    </div>
    <ul flex-1 :style="`--process:${process}%`">
      <li v-for="song, idx in playlist?.data" :key="idx" class="song-item" :class="{ playing: song.name === current.name }" @click="handleClick(song)">
        <div class="omit">
          <span mr-2>
            {{ idx + 1 }}.
          </span>
          <span mr-2>
            {{ song.name }}
          </span>
        </div>
        <div>{{ song.time }}</div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.song-item{
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.75rem;
  border-radius: 0.25rem;
  transition: background-color .5s;
  cursor: pointer;
}
.song-item:hover{
  background-color: #2333;
}
.playing{
  position: relative;
  color: var(--light-color)
}
.playing::before{
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
  border-radius: 0.25rem;
  content: '';
  height: 100%;
  width: var(--process);
  transition: width 1s;
  background-color: antiquewhite;
}
</style>
