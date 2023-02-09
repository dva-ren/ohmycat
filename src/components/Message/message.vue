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
  const x = message.value!.clientWidth

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
  apply('show')
  setTimeout(() => {
    apply('hidden')
    setTimeout(() => {
      props.onClose && props.onClose()
      emits('destroy')
    }, 100)
  }, 3000)
})

defineExpose({
  close,
})
</script>

<template>
  <div class="message-container" :style="{ top: `${props.top}px` }" text-sm>
    <div ref="message" class="message">
      <div v-if="type === 'success'" i-ri-checkbox-circle-fill class="icon" text-green />
      <div v-if="type === 'warning'" i-ri-error-warning-fill class="icon" text-orange />
      <div v-if="type === 'error'" i-ri-close-circle-fill class="icon" text-red />
      <div inline-block>
        {{ msg }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.message-container{
  position: fixed;
  z-index: 100;
  left: 50%;
  user-select: none;
  transition: top 0.1s;
  transform: translateX(-50%);
}
.message{
  background-color: white;
  /* border: 1px solid red; */
  top: 1.2rem;
  box-shadow: 0 3px 12px rgba(0,0,0,0.2);
  padding: 8px 12px;
  border-radius: 9999px;
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
