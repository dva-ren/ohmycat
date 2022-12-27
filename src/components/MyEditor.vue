<script lang="ts" setup>
import MdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { isDark } from '~/composables'
const { modelValue } = defineProps<{ modelValue: string }>()
</script>

<template>
  <MdEditor preview-theme="cyanosis" editor-id="my-editor" preview-only style="--md-bk-color: transparent;" :model-value="modelValue" :theme="isDark ? 'dark' : 'light'" w-full />
</template>

<style scoped>
:deep(.md-editor-dark) {
  --md-bk-color: transparent;
}
:deep(.md-editor-dark blockquote) {
  background-color: rgba(224,224,224,0.1) ;
}
</style>
