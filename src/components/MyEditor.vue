<script lang="ts" setup>
import { Viewer } from '@bytemd/vue-next'
import gfm from '@bytemd/plugin-gfm'
import highlight from '@bytemd/plugin-highlight'
import mediumZoom from '@bytemd/plugin-medium-zoom'
import mermaid from '@bytemd/plugin-mermaid'
// import 'bytemd/dist/index.css'
import 'highlight.js/styles/atom-one-light.css'

const { modelValue } = defineProps<{ modelValue: string }>()
const plugins = [
  gfm(),
  highlight(),
  mermaid(),
  mediumZoom(),
]
</script>

<template>
  <div v-bind="$attrs">
    <Viewer :value="modelValue" w-full :plugins="plugins" />
  </div>
</template>
