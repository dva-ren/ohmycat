<script lang="ts" setup>
import data from './songs.json'
const songs = data.songs.slice(0, 10)
const play = ref(false)
</script>

<template>
  <div fixed left-0 bottom-0 rounded>
    <div flex bg-gray-3 w-40 rounded class="player" select-none>
      <div relative min-w-16 class="cover-container" @click="play = !play">
        <img :src="songs[1].al.picUrl" w-16 h-16 rounded>
        <div class="btn-mask" flex items-center text text-base justify-evenly>
          <div i-ri-skip-back-fill />
          <div v-if="!play" i-ri-play-fill class="play-btn" />
          <div v-else i-ri-pause-fill class="play-btn" />
          <div i-ri-skip-forward-fill />
        </div>
      </div>
      <div m-1 text="12px" overflow-hidden flex-shrink justify-end flex flex-col>
        <div i-ri-menu-add-fill />
        <div>
          <span>2:01</span>
          <span>/5:01</span>
        </div>
        <div class="song-name">
          {{ songs[1].name }}
        </div>
      </div>
    </div>
    <div class="progress-bar" w-full />
  </div>
</template>

<style>
.player{
  transform: translateX(-90%);
  transition: transform .6s;
  padding-right: .1rem;
  /* transform: translateX(0); */
}
.player:hover{
  transform: translateX(0);
}
.progress-bar{
  height: 1px;
  width: 100vw;
  background-color: rgb(29, 211, 165);
}
.btn-mask{
  position: absolute;
  color: rgb(255, 255, 255);
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  height: 100%;
  width: 100%;
  transition: .2s;
  opacity: 0;
  background-color: rgba(66, 88, 88, 0.651);
}
.btn-mask div:hover{
  cursor: pointer;
  color: orange;
}
.cover-container:hover .btn-mask{
  opacity: 1;
}
.song-name{
  overflow: hidden;
  white-space: nowrap;
  animation: 14s wordsLoop linear infinite normal;
}
@keyframes wordsLoop {
  0% {
    transform: translateX(0px);
    -webkit-transform: translateX(0px);
  }
  100% {
    transform: translateX(-100%);
    -webkit-transform: translateX(-100%);
  }
}

@-webkit-keyframes wordsLoop {
  0% {
    transform: translateX(0px);
    -webkit-transform: translateX(0px);
  }
  100% {
    transform: translateX(-100%);
    -webkit-transform: translateX(-100%);
  }
}
</style>
