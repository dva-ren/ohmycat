<script lang="ts" setup>
import { Viewer } from '@bytemd/vue-next'
import gfm from '@bytemd/plugin-gfm'
import math from '@bytemd/plugin-math'
import highlight from '@bytemd/plugin-highlight'
import gemoji from '@bytemd/plugin-gemoji'
import mediumZoom from '@bytemd/plugin-medium-zoom'
import codeCopy from '@uvdream/bytemd-plugin-code-copy'
import Message from '../Message'
import lazyload from './plugin-lazyload'
import figure from './plugin-figure'
import 'highlight.js/styles/atom-one-light.css'

const { value } = defineProps<{ value: string }>()
const plugins = [
  gfm(),
  highlight(),
  mediumZoom(),
  math(),
  gemoji(),
  codeCopy({
    // 拷贝按钮文字
    copyText: 'COPY',
    copyIcon: 'copyLight',
    copySuccess: (text: string) => {
      Message.success('COPYED')
      return text
    },
    copyError: () => {
      Message.error('COPY ERROR')
      return {}
    },
  }),
  figure(),
  // container(),
  lazyload(),
]
const viewer = ref()
onMounted(() => {
  // console.log(viewer.value)
})
</script>

<template>
  <!-- <div v-bind="$attrs"> -->
  <div v-lazy-container="{ selector: 'img' }" v-bind="$attrs">
    <Viewer ref="viewer" :value="value" w-full :plugins="plugins" />
  </div>
</template>

<style>
.bytemd{
  height: calc(100vh - 200px);
}
</style>
