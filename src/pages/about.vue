<script setup lang="ts">
import { cloudApi } from '~/composables'

const text = ref('')
const getHomeInfo = async () => {
  const res = await cloudApi.invokeFunction('get-home-info', {})
  text.value = res.data.content
}
getHomeInfo()
</script>

<template>
  <Layout>
    <MyEditor v-if="text" v-model="text" mt-4 class="fade_in_up" />
  </Layout>
</template>

<style scoped>
:deep(.md-editor-dark) {
  --md-bk-color: transparent;
}
:deep(.md-editor-dark .default-theme blockquote) {
  background-color: rgba(224,224,224,0.1);
}
</style>
