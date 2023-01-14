<script lang="ts" setup>
import type { Comment } from '~/types'
import { dateFns } from '~/composables/date'
const { data } = defineProps<{ data: Comment }>()
</script>

<template>
  <div flex gap-4 text-12px text="gray-500" p-2>
    <img w-10 h-10 rounded-full src="https://cravatar.cn/avatar/40f0c69d79dd97b1bb9f2a54649431fb?d=retro" alt="">
    <div>
      <div>
        <a text-black :href="data.url" target="_blank" rel="noopener noreferrer">{{ data.author }}</a>
        <span pl-2>{{ dateFns(data.createTime).fromNow() }}</span>
        <span mx-2>#2</span>
        <span>来自：{{ data.location }}xxx</span>
      </div>
      <div py-4 text="black sm">
        {{ data.content }}
      </div>
      <button>回复</button>
    </div>
  </div>
</template>
