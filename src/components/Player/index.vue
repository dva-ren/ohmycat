<script lang="ts" setup>
import data from './list.json'
const songs = data.playlist.data.slice(0, 10)
const play = ref(false)
</script>

<template>
  <div fixed left-0 bottom-0 rounded>
    <div flex bg-gray-3 w-40 rounded>
      <div relative @click="play = !play">
        <img :src="songs[0].picUrl" w-16 h-16 rounded>
        <div class="btn-mask" />
        <div v-if="play" i-ri-play-fill class="play-btn" />
        <div v-else i-ri-pause-fill class="play-btn" />
      </div>
      <div p-1>
        111
      </div>
    </div>
    <div class="progress-bar" w-full />
  </div>
</template>

<style>
.progress-bar{
  height: 1px;
  width: 100vw;
}
.play-btn{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  color: white;
  font-size: 1.4rem;
  padding: .8rem;
  cursor: pointer;
}
.btn-mask{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  height: 1.6rem;
  width: 1.6rem;
  background-color: rgba(194, 194, 194, 0.44);
}
</style>
