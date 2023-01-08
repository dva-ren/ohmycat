<script lang="ts" setup>
import type { Article, Note } from '~/types'
const { data, type = 'posts' } = defineProps<{ data: Array<Article | Note>; type?: string }>()
</script>

<template>
  <div grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-8 text-sm v-bind="$attrs">
    <template v-for="p in data" :key="p.id">
      <router-link :to="`/${type}/${p.id}`" h-30>
        <Card :title="p.title" :bg="p.cover" />
      </router-link>
    </template>
  </div>
</template>
