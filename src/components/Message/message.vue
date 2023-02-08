<script lang="ts" setup>
import { useMotion } from '@vueuse/motion'
const props = defineProps({
  msg: {
    type: String,
  },
  type: {
    type: String,
  },
  onClose: {
    type: Function,
    required: false,
  },
  top: {
    type: Number,
    required: false,
  },
})

const emits = defineEmits(['destroy'])

const message = ref<HTMLElement>()

onMounted(() => {
  const transition = {
    type: 'spring',
    stiffness: 300,
    damping: 20,
    mass: 1,
  }
  const { apply } = useMotion(message, {
    initial: {
      y: 80,
      scale: 0.2,
      opacity: 0,
    },
    show: {
      y: 0,
      scale: 1,
      opacity: 1,
      transition,
    },
    hidden: {
      y: -80,
      scale: 0.2,
      opacity: 0,
    },
  })
  setTimeout(() => {
    apply('hidden')
    setTimeout(() => {
      props.onClose && props.onClose()
      emits('destroy')
    }, 100)
  }, 3000)
  apply('show')
})

defineExpose({
  close,
})
</script>

<template>
  <div ref="message" class="message" :style="{ top: `${props.top}px` }" text-sm>
    <div v-if="type === 'success'" i-ri-checkbox-circle-fill class="icon" text-green />
    <div v-if="type === 'warning'" i-ri-error-warning-fill class="icon" text-orange />
    <div v-if="type === 'error'" i-ri-close-circle-fill class="icon" text-red />
    <div inline-block>
      {{ msg }}
    </div>
  </div>
</template>

<style scoped>
.message{
  /* border: 1px solid red; */
  position: fixed;
  top: 1.2rem;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0 3px 12px rgba(0,0,0,0.2);
  padding: 8px 12px;
  border-radius: 9999px;
  user-select: none;
  transition: top .2s;
  z-index: 100;
  background-color: white;
}
.dark .message{
  background-color: gray;
}
.icon{
  display: inline-block;
  font-size: 1.25rem;
  vertical-align: -0.25rem;
  margin-right: .4rem;
}
</style>
