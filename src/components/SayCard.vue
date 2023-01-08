<script lang="ts" setup>
import { useMotion } from '@vueuse/motion'
import { relativeTime } from '~/composables'
import type { Say } from '~/types'

interface SayInfo extends Say {
  color?: string
  delay?: number
}
const { data, delay = 0 } = defineProps<{ data: SayInfo; delay?: number }>()
const sayItem = ref<HTMLDivElement>()
const transition = {
  type: 'spring',
  stiffness: 400,
  damping: 20,
  mass: 1,
}
const { apply } = useMotion(sayItem, {
  initial: {
    y: 60,
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
    transition,
  },
})
onMounted(() => {
  setTimeout(() => {
    apply('show')
  }, delay * 500)
})
</script>

<template>
  <div ref="sayItem" class="say-item" :style="`--color:${data.color};--bg:${data.color}1a;--delay:${delay}s`">
    <div pb-4>
      {{ data.content }}
    </div>
    <div class="say-info">
      <em flex-1>
        发布于：{{ relativeTime(data.createTime) }}
      </em>
      <em>{{ data.author }}</em>-
      <em>{{ data.origin }}</em>
    </div>
  </div>
</template>

<style scoped>
.say-item{
  padding: 1em 1em 1em 2em;
  font-size: 14.5px;
  background-color: var(--bg);
  border-left: 4px solid var(--color) ;
  /* animation: bounceInUp forwards .5s var(--delay); */
  /* opacity: 0; */
  /* transition-delay: var(--delay); */
  margin-bottom: 1em;
}
.say-info{
  color: gray;
  display: flex;
  justify-content: space-between;
  font-size: 13px;
}

@keyframes bounceInUp {
  from,
  60%,
  75%,
  90%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  from {
    transform: translate3d(0, 100px, 0);
  }

  60% {
    opacity: 1;
    transform: translate3d(0, -5px, 0);
  }

  75% {
    transform: translate3d(0, 5px, 0);
  }

  90% {
    transform: translate3d(0, -2px, 0);
  }

  to {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

.bounceInUp {
  animation-name: bounceInUp;
}
</style>
