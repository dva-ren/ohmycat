<script lang="ts" setup>
const canvas = $ref<HTMLCanvasElement>()
const options = reactive({
  scale: 10,
  pointCount: 260,
  pointSize: 2,
  drawSpeed: 1,
})
const showOptions = ref(false)

interface Point {
  x: number
  y: number
}

const start = () => {
  const ctx = canvas.getContext('2d')!
  canvas.width = document.documentElement.clientWidth
  canvas.height = document.documentElement.clientHeight - 72 - 80
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  const p = generatePoints(options.pointCount, options.scale, { x: canvas.width / 2, y: canvas.height / 2 })
  delayShow(ctx, p, options.drawSpeed)
}

function getColor() {
  const colors = ['#FCE4EC', '#F8BBD0', '#F48FB1', '#F06292', '#EC407A', '#E91E63', '#D81B60', '#C2185B', '#AD1457', '#880E4F']
  return colors[Math.floor(Math.random() * colors.length)]
}

function drawPoint(ctx: CanvasRenderingContext2D, point: Point) {
  // console.log(point)
  // ctx.fillStyle = 'rgba(224,224,224,0.4)'
  ctx.fillStyle = getColor()
  ctx.beginPath()
  ctx.arc(point.x, point.y, options.pointSize, 0, 2 * Math.PI)
  ctx.fill()
}

function generatePoints(count: number, scale: number, offset = { x: 0, y: 0 }) {
  const points = []
  const step = (2 * Math.PI) / count
  for (let i = 0; i < count; i++) {
    const x = scale * (16 * Math.sin(step * i) ** 3) + offset.x + (Math.random() * 10) * 1.2
    const y
        = -scale
        * (13 * Math.cos(step * i)
          - 5 * Math.cos(2 * step * i)
          - 2 * Math.cos(3 * step * i)
          - Math.cos(4 * step * i)) + offset.y + (Math.random() * 10) * 1.2
    points.push({ x, y })
  }
  return points
}
function delayShow(ctx: CanvasRenderingContext2D, points: Point[], speed = 1) {
  const median = Math.floor(points.length / 2)
  let index = 0
  let frame = 0
  const drawToPanel = () => {
    requestAnimationFrame(() => {
      if (speed > 0) {
        for (let i = 0; i < speed; i++) {
          drawPoint(ctx, points[index])
          drawPoint(ctx, points[points.length - 1 - index])
          index++
        }
      }
      else {
        if (frame % Math.abs(speed) === 0) {
          drawPoint(ctx, points[index])
          drawPoint(ctx, points[points.length - 1 - index])
          index++
          frame = 0
        }
      }
      frame++

      if (points.length - index > median)
        drawToPanel()
    })
  }
  drawToPanel()
}

const repaint = useDebounceFn(() => {
  start()
}, 200)
const reset = () => {
  options.scale = 10
  options.pointCount = 200
  options.pointSize = 2
  options.drawSpeed = -2
}

const switchDisplay = () => {

}

onMounted(() => {
  start()
  window.onresize = repaint
})
</script>

<template>
  <div>
    <div v-show="showOptions" class="options" :class="showOptions ? 'zoom-in' : 'zoom-out'" absolute right-4 bottom-18 border flex="~ col" gap-1 px-2 py-4 select-none rounded>
      <div>
        <span>点数量：</span>
        <input v-model="options.pointCount" type="number">
      </div>
      <div>
        <span>点大小：</span>
        <input v-model="options.pointSize" type="number">
      </div>

      <div>
        <span>缩 放：</span>
        <input v-model="options.scale" type="number">
      </div>
      <div>
        <span>绘制速度：</span>
        <input v-model="options.drawSpeed" type="number">
      </div>
      <div flex justify-center gap-4>
        <button btn @click="reset">
          重置
        </button>
        <button btn @click="repaint">
          生成
        </button>
      </div>
    </div>
    <div fixed right-4 bottom-4 p-2 rounded-full cursor-pointer select-none bg="#68b88e" @click="showOptions = !showOptions">
      <div i-ri:settings-4-line text-2xl text-gray-100 />
    </div>
    <canvas ref="canvas" @click="showOptions = false" />
  </div>
</template>

<style scoped>
.options{
  backdrop-filter: blur(10px);
}
.options input{
  width: 4rem;
  background: none;
  padding-left: .2rem;
}
.options input:focus{
  outline: 1px solid gray;
}
.zoom-in{
  transform-origin: right bottom;
  animation: animation-zoom-in 0.1s ease-in;
}
.zoom-out{
  transform-origin: right bottom;
  animation: animation-zoom-in 0.1s ease-in reverse;
}
@keyframes animation-zoom-in{
  0%{
    scale: 0;
  }
  100%{
    scale: 1;
  }
}
</style>

