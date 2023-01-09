<script lang="ts" setup>
import Snow from './snow'
const canvas = $ref<HTMLCanvasElement>()
let ctx: CanvasRenderingContext2D
const points: Snow[] = []

onMounted(() => {
  canvas.width = document.documentElement.clientWidth
  canvas.height = document.documentElement.clientHeight
  ctx = canvas!.getContext('2d')!
  // setup()
  // 第一帧 创建1000 个
  for (let i = 0; i < 1000; i++)
    points.push(new Snow(canvas.width, canvas.height, 100))
  // 后面都是更新
  // 调用每个粒子的更新函数
  const update = () => {
    requestAnimationFrame(() => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      // ctx.fillStyle = 'rgba(0,128,255,1)'
      ctx.fillStyle = 'rgba(224,224,224,1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      points.forEach((point) => {
        point.draw(ctx).update()
      })
      update()
    })
  }
  update()
})
</script>

<template>
  <div absolute>
    <canvas ref="canvas" />
  </div>
</template>

<route lang="yaml">
meta:
  hideHeader: true
  hideFooter: true
</route>
