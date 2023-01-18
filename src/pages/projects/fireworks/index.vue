<script setup lang="ts">
import { Fires } from './Fire'
const canvas = $ref<HTMLCanvasElement>()
const instances: Fires[] = []
let ctx: CanvasRenderingContext2D
const initValue = {
  random: true,
  randomSpeed: 35,
  speed: 5,
  size: 2,
  color: 60,
  count: 60,
}
const options = reactive(initValue)
const handleClick = (e: MouseEvent) => {
  const f = new Fires(canvas!, ctx, e.x, e.y, options.count, options.size, options.speed)
  instances.push(f)
}
const reset = () => {
  Object.assign(options, initValue)
}
const repaint = () => {

}
onMounted(() => {
  canvas!.width = window.innerWidth
  canvas!.height = window.innerHeight
  ctx = canvas!.getContext('2d')!
  let idx = 0
  function start() {
    requestAnimationFrame(() => {
      if (options.random && idx % options.randomSpeed === 0) {
        const f = new Fires(canvas!, ctx, Math.random() * canvas!.width, Math.random() * canvas!.height - 80, options.count, options.size, options.speed)
        instances.push(f)
      }
      idx++
      if (idx > 200)
        idx = 0
      ctx.fillStyle = `rgba(0,0,0,${10 / 100})`
      ctx.fillRect(0, 0, canvas!.width, canvas!.height)
      for (let i = 0; i < instances.length; i++) {
        instances[i].draw()
        if (instances[i].points.length === 0)
          instances.splice(i, 1)
      }
      start()
    })
  }
  start()
})
</script>

<template>
  <div>
    <canvas ref="canvas" @click="handleClick" />
    <Popper placement="top" class="fixed bottom-20 right-4" :offset="10">
      <button p-2 rounded-full cursor-pointer select-none bg="#68b88e">
        <div i-ri:settings-4-line text-2xl text-gray-100 />
      </button>
      <template #content>
        <div class="options" flex="~ col" gap-1 px-2 py-4 select-none rounded>
          <div>
            <span>粒子数量：</span>
            <input v-model="options.count" type="number">
          </div>
          <div>
            <span>随机生成：</span>
            <div class="simple-switch" :class="{ active: options.random }" inline-block @click="options.random = !options.random" />
          </div>
          <div>
            <span>粒子大小：</span>
            <input v-model="options.size" type="number">
          </div>
          <div>
            <span>生成速度：</span>
            <input v-model="options.randomSpeed" type="number">
          </div>
          <div>
            <span>发射速度：</span>
            <input v-model="options.speed" type="number">
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
      </template>
    </Popper>
  </div>
</template>

<style scoped>
.options {
  backdrop-filter: blur(10px);
}

.options input {
  width: 4rem;
  background: none;
  padding-left: .2rem;
}

.options input:focus {
  outline: 1px solid gray;
}

.simple-switch {
  transform: scale(0.7);
  width: 70px;
  height: 32px;
  border: solid 2px #ddd;
  border-radius: 30px;
  background-color: #FFF;
  position: relative;
  padding-left: 28px;
  -webkit-transition: background-color 0.3s;
  transition: background-color 0.3s;
  -webkit-user-select: none;
  font-size: 14px;
}

.simple-switch>input[type="checkbox"] {
  display: none;
}

.simple-switch:before {
  content: '关';
  text-align: center;
  display: block;
  width: 100%;
  height: 100%;
  line-height: 28px;
  color: #999;
}

.simple-switch>.switch-handler {
  position: absolute;
  left: 2px;
  top: 0px;
  width: 28px;
  height: 28px;
  background-color: #FFF;
  border-radius: 50%;
  -webkit-box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.52);
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.52);
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
}

.simple-switch.active {
  border-color: #4cd964;
  background-color: #4cd964;
  padding-left: 0;
  padding-right: 28px;
}

.simple-switch.active:before {
  content: '开';
  color: #FFF;
}

.simple-switch.active>.switch-handler {
  left: 38px;
}
</style>

<route lang="yaml">
meta:
  hideHeader: true
  hideFooter: true
</route>
