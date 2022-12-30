<script lang="ts" setup>
const { text } = defineProps<{ text: string | string[] }>()
</script>

<template>
  <div v-bind="$attrs">
    <span v-for="char, idx in text" :key="char" class="char" :style="`animation-delay:${idx * 0.1}s`">{{ char }}</span>
  </div>
</template>

<style scoped>
.char{
  display: inline-block;
  animation: bounce .2s forwards;
  opacity: 0;
  transform: translateY(20px);
}
@keyframes bounce {
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
