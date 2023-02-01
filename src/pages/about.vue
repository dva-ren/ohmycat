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
    <MarkdownViewer v-if="text" :value="text" mt-4 class="fade_in_up" />
  </Layout>
</template>
