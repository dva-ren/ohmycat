<script lang="ts" setup>
import { useUnionNumber } from '~/composables'
const props = defineProps<{
  title: string
  bg?: string
  text?: string
}>()

const img = 'https://api.yimian.xyz/img?type=wallpaper'
function getImageUrl() {
  return `${img}&time=${useUnionNumber()}`
}
</script>

<template>
  <div class="card" h-30 rounded-xl>
    <img v-lazy="props.bg ? props.bg : getImageUrl()" rounded-xl w-full alt="" class="bg-img">
    <div class="card-title">
      <span>{{ props.title }}</span>
    </div>
    <div class="mask" h-full w-full absolute top-0>
      {{ props.text }}
    </div>
  </div>
</template>

<style scoped>
.card{
  position: relative;
  overflow: hidden;
  background-attachment:fixed;
  cursor: pointer;
}
.card:hover .card-title{
  color: #f6cec1;
}
.card .bg-img{
  transition: transform .2s;
  /* object-fit: cover; */
}
.card:hover .bg-img{
  /* height: 100%; */
  transform: rotateZ(4deg) scale(1.1);
}
.card-title{
  position: absolute;
  bottom: 0;
  color: rgba(255, 255, 255, 0.9);
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
  padding: .4rem 1rem;
  background: linear-gradient(rgba(38,69,61,.333),#26453da8);
  backdrop-filter: saturate(180%) blur(15px);
  transition: color .2s;
}
.mask{
  user-select: none;
  text-align: center;
  padding-top: 2.5rem;
  font-size: 16px;
  font-weight: 600;
  background: -webkit-gradient(linear,left top,left bottom,from(#80808000),to(hsla(0,0%,50%,.357)));
}
</style>
