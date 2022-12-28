<script lang="ts" setup>
import type { Article } from '~/types'
const { data } = defineProps<{ data: Array<Article> }>()
</script>

<template>
  <div grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-8 text-sm>
    <template v-for="p in data" :key="p._id">
      <router-link :to="`/posts/${p._id}`" gap-2 relative h-30 bg="#a7a8bd" rounded-xl class="card" overflow-hidden>
        <div class="card-title">
          <span>{{ p.title }}</span>
        </div>
      </router-link>
    </template>
  </div>
</template>

<style scoped>
.card:hover .card-title{
  color: #f6cec1;
}
.card-title{
  position: absolute;
  bottom: 0;
  color: rgba(255, 255, 255, 0.9);
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
  padding: .5rem 1rem;
  background-color: linear-gradient(rgba(38,69,61,.333),#26453da8);
  backdrop-filter: saturate(180%) blur(15px);
  transition: color .2s;
}
</style>
