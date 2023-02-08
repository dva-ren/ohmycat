<script lang="ts" setup>
import { usePlayer } from '~/hooks'

const { player, current, playState, time, process } = usePlayer()

const changeState = () => {
  if (playState.value === 'play')
    player.pause()

  else
    player.play()
}
onBeforeMount(() => {
  player.pause()
})
</script>

<template>
  <div fixed left-0 bottom-0 rounded max-w-18>
    <Transition>
      <div rounded class="player" select-none h-16 flex gap-2>
        <div relative min-w-16 class="cover-container" @click="changeState">
          <img :src="current?.pic" w-16 h-16 rounded>
          <div class="btn-mask" flex items-center text-xl justify-evenly :class="{ 'btn-pause': playState === 'play' }">
            <div v-if="playState === 'pause'" i-carbon-play-filled-alt class="play-btn" />
            <div v-else i-carbon-pause-filled class="play-btn" />
          </div>
        </div>
        <div class="song-info" text-gray-9>
          <div class="song-name">
            {{ current?.name }}
          </div>
          <div text-gray class="song-name" text-sm>
            {{ current?.artist }}
          </div>
          <div>
            {{ time }}
          </div>
        </div>
      </div>
    </Transition>
    <Teleport to="body">
      <div class="progress-bar" :style="{ width: `${process}%` }" />
    </Teleport>
  </div>
</template>

<style>
.player {
  width: 100%;
  margin-bottom: 2px;
}
.player:hover .song-info{
  display: block;
}

.progress-bar{
  position: fixed;
  bottom: 0;
  left: 0;
  height: 2px;
  transition: width 2s;
  border-radius: 1px;
  background-color: var(--yellow);
}
.btn-mask{
  position: absolute;
  color: rgb(255, 255, 255);
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  transition: .2s;
}
.btn-pause{
  left: 75%;
  top: 75%;
  font-size: 16px;
}
.btn-mask div:hover{
  cursor: pointer;
  color: orange;
}
.cover-container{
  cursor: pointer;
}
.cover-container:hover + .song-info{
  opacity: 1;
}
.song-info{
  display: block;
  transition: all .2s;
  font-size: 12px;
  display: none;
  user-select: text;
}
.song-name {
  font-size: 14px;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 10rem;
}
v-enter-active,
v-leave-active{
  transition: transform 0.2s;
}
.v-enter-from,
.v-leave-to {
  transform: translateX(-100%);
}
</style>
