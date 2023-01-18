<script lang="ts" setup>
import { adaptDPR } from '~/composables'
const canvas = $ref<HTMLCanvasElement>()

const numArray = ref<number[]>([])
const totalX = ref(0)
const totalY = ref(0)

const clientWidth = document.body.offsetWidth
const clientHeight = document.body.offsetHeight
const speed = ref(20)
let timer: any = null
function getRandomChar() {
  const chars = ['a', 'b', 'c', 'd', 'e', '#', '$', '*', '0', '1']
  return chars[Math.floor(Math.random() * chars.length)]
}

function getRandomColor() {
  return `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`
}

function start() {
  const ctx = canvas.getContext('2d')!
  const gap = 18
  canvas.width = clientWidth
  canvas.height = clientHeight
  adaptDPR(canvas, ctx)
  totalX.value = Math.round(clientWidth / gap) + 2
  totalY.value = Math.round(clientHeight / gap)
  numArray.value = new Array(totalX.value).fill(1)
  timer = setInterval(() => {
    draw(ctx)
  }, speed.value)
  watch(speed, () => {
    clearInterval(timer)
    timer = setInterval(() => {
      draw(ctx)
    }, speed.value)
  })
}

function draw(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = 'rgba(238,238,238,.1)'
  ctx.fillRect(0, 0, clientWidth, clientHeight)
  ctx.font = '16px arial'
  ctx.fillStyle = `${getRandomColor()}`
  for (let i = 0; i < numArray.value.length - 1; i++) {
    ctx.fillText(getRandomChar(), i * 18, numArray.value[i] * 18)
    if (numArray.value[i] < totalY.value)
      numArray.value[i]++
    else if (Math.random() > 0.95)
      numArray.value[i] = 0
  }
}
onMounted(() => {
  start()
})
</script>

<template>
  <a-slider v-model="speed" :min="5" :max="100" :style="{ width: '400px' }" />
  <div>
    <canvas ref="canvas" />
  </div>
</template>

<route lang="yaml">
meta:
  hideHeader: true
  hideFooter: true
</route>

