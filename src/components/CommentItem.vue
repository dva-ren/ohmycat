<script lang="ts" setup>
import md5 from 'js-md5' // 引入
import type { Comment } from '~/types'
import { dateFns } from '~/composables/date'
const { data, index } = defineProps<{ data: Comment; index: number }>()
const emits = defineEmits(['onReplay'])
const visible = ref(false)

const onReplayed = () => {
  visible.value = false
  emits('onReplay')
}
</script>

<template>
  <div flex gap-4 text-12px p-2>
    <img w-10 h-10 rounded-full :src="`https://cravatar.cn/avatar/${md5(data.mail)}?d=monsterid`" alt="">
    <div>
      <div>
        <a v-if="data.url" class="link" :href="data.url" target="_blank" rel="noopener noreferrer">{{ data.author }}</a>
        <span v-else>{{ data.author }}</span>
        <span text="gray-500">
          <span pl-2>{{ dateFns(data.createTime).fromNow() }}</span>
          <span mx-2>#{{ data.commentsIndex }}</span>
          <span v-if="data.location">来自：{{ data.location }}xxx</span>
        </span>
      </div>
      <div py-4 text="sm" text-black dark:text-gray-4>
        {{ data.content }}
      </div>
      <button mb-2 text="gray-500" @click="visible = !visible">
        回复
      </button>
      <EditComment v-if="visible" :index="index" :ref-id="data.ref" :type="data.refType" :parent-id="data.ref" @on-send="onReplayed" />
      <CommentItem v-for="child in data.children" :key="child.id" :data="child" :index="data.children.length" />
    </div>
  </div>
</template>

<style scoped>
.link{
  color: var(--light-color)
}
</style>
