<script setup lang="ts">
import MdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { cloudApi } from '~/composables'

const text = ref('')
const getHomeInfo = async () => {
  const res = await cloudApi.invokeFunction('get-home-info', {})
  text.value = res.data.content
}
getHomeInfo()
</script>

<template>
  <MdEditor v-model="text" preview-only />
  <LoadMask />
</template>
