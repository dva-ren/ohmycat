<script lang="ts" setup>
const { modelValue } = defineProps<{ modelValue: boolean }>()
const emits = defineEmits(['update:modelValue', 'close'])

const srcElement = ref<HTMLElement>()
const handleClick = (e: MouseEvent) => {
  if (e.target === srcElement.value)
    emits('close')
}
</script>

<template>
  <Transition>
    <div v-show="modelValue" ref="srcElement" z-20 bg-gray-400 bg-op-80 fixed inset-0 flex items-center justify-center dark:bg-black @click="handleClick">
      <div class="content">
        <slot />
      </div>
    </div>
  </Transition>
</template>

<style scoped>
/* 下面我们会解释这些 class 是做什么的 */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.1s ease;
}
.v-enter-active,
.v-leave-active .content {
  transition: transform 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.v-enter-from,
.v-enter-from .content {
  transform: scale(0.5);
}
</style>
