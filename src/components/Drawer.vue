<script setup lang="ts">
const { modelValue } = defineProps<{ modelValue: boolean }>()
const emits = defineEmits(['update:modelValue', 'close'])

const drawerContent = ref<HTMLElement>()

const onClose = () => {
  emits('update:modelValue', false)
  emits('close')
}
const onEnter = () => {
  document.body.style.overflow = 'hidden'
}

const onLeave = () => {
  document.body.style.overflow = 'auto'
}
const handleClick = (e: Event) => {
  if (e.target === e.currentTarget)
    emits('update:modelValue', false)
}
onMounted(() => {

})
</script>

<template>
  <Teleport to="body">
    <Transition
      @after-enter="onEnter"
      @after-leave="onLeave"
    >
      <div v-if="modelValue" fixed inset-0 bg="#00000030" z-100 @click="handleClick">
        <div ref="drawerContent" absolute right-0 w-70 bg-white h-full class="content">
          <div text-right p-4 @click="onClose">
            <button i-ri-close-line text-xl />
          </div>
          <div p-4>
            <slot />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.v-enter-active{
  animation: op .2s ease-in;
}
.v-enter-active .content{
  animation: slideInRight .2s ease-in;
}
.v-leave-active{
  animation: op .2s ease-in reverse;
}
.v-leave-active .content{
  animation: slideOutRight .2s ease-in ;
}

@keyframes op {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideInRight {
  from {
    transform: translate3d(100%, 0, 0);
  }

  to {
    transform: translate3d(0, 0, 0);
  }
}

@keyframes slideOutRight {
  from {
    transform: translate3d(0, 0, 0);
  }

  to {
    transform: translate3d(100%, 0, 0);
  }
}
</style>
