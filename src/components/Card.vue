<script lang="ts" setup>
import imgs from '../utils/images.json'
import { randomNumber, useUnionNumber } from '~/composables'

const props = defineProps<{
  title: string
  bg?: string
  text?: string
}>()
const imgApis = ref([
  'http://127.0.0.1:3000/img',
  // girl
  'https://api.tjit.net/api/img/rand',
  'https://cdn.seovx.com/?mom=302',
  'https://cdn.seovx.com/ha/?mom=302',
  'https://api.isoyu.com/beibei_images.php',
  'https://imgapi.cn/cos.php',
  // bing
  'https://api.yimian.xyz/img?type=wallpaper',
  // 2次元
  'https://img.xjh.me/random_img.php?return=302',
])

function getImageUrl() {
  // const api = imgApis.value[0]
  // return `${api}${api.includes('?') ? '&' : '?'}time=${useUnionNumber()}`
  return imgs[randomNumber(0, imgs.length)]
}
</script>

<template>
  <div class="card" h-30 rounded-xl>
    <img v-lazy="props.bg ? props.bg : getImageUrl()" loading="../assets/img-bg.webp" w-full alt="" class="bg-img">
    <div class="card-title">
      <span rounded-xl>{{ props.title }}</span>
    </div>
    <div class="mask" h-full w-full absolute top-0>
      <span>{{ props.text }}</span>
    </div>
  </div>
</template>

<style scoped>
.card{
  position: relative;
  overflow: hidden;
  cursor: pointer;
  background-color: rgba(224,224,224,0.3);
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
  /* z-index: 10; */
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
  -webkit-backdrop-filter: saturate(180%) blur(15px);
  backdrop-filter: saturate(180%) blur(15px);
  transition: color .2s;
  border-radius:0 0 0.75rem 0.75rem;
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
