<script lang="ts" setup>
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

defineEmits(['destroy'])

const visible = ref(false)

function close() {
  visible.value = false
}

function startTimer() {
  setTimeout(() => {
    close()
  }, 3000)
}

onMounted(() => {
  startTimer()
  visible.value = true
})

defineExpose({
  visible,
  close,
})
</script>

<template>
  <transition
    @before-leave="onClose"
    @after-leave="$emit('destroy')"
  >
    <div v-show="visible" class="message" :style="{ top: `${props.top}px` }" text-sm>
      <div v-if="type === 'success'" i-ri-checkbox-circle-fill class="icon" text-green />
      <div v-if="type === 'warning'" i-ri-error-warning-fill class="icon" text-orange />
      <div v-if="type === 'error'" i-ri-close-circle-fill class="icon" text-red />
      <div inline-block>
        {{ msg }}
      </div>
    </div>
  </transition>
</template>

<style scoped>
.message{
  /* border: 1px solid red; */
  position: fixed;
  top: 1.2rem;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0 3px 12px rgba(0,0,0,0.2);
  padding: 6px 12px;
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
.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
