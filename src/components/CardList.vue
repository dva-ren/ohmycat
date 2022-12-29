<script lang="ts" setup>
import type { Article } from '~/types'
const { data } = defineProps<{ data: Array<Article> }>()
</script>

<template>
  <div grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-8 text-sm v-bind="$attrs">
    <template v-for="p in data" :key="p._id">
      <router-link :to="`/posts/${p._id}`" h-30>
        <Card :title="p.title" :bg="p.cover" />
      </router-link>
    </template>
  </div>
</template>
