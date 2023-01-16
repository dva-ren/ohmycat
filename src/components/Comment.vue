<script lang="ts" setup>
import type { Comment, PageInfo } from '~/types'
import { queryComment } from '~/api'

const { refId, type } = defineProps<{ refId: string; type: 'note' | 'posts' }>()
const comments = ref<Comment[]>([])
const loadding = ref(false)

const commentPageInfo = ref<PageInfo<Comment>>()
const total = ref(0)
const getComments = async () => {
  loadding.value = true
  const res = await queryComment(refId)
  commentPageInfo.value = res.data
  total.value = res.data.total + 1
  loadding.value = false
}
getComments()
</script>

<template>
  <div v-if="commentPageInfo">
    <div class="left-label" py-4>
      共有{{ commentPageInfo.total }}条评论
    </div>
    <EditComment :ref-id="refId" :type="type" :index="total" @on-send="getComments" />
    <div v-if="commentPageInfo.total" mt-4>
      <CommentItem v-for="i, idx in commentPageInfo.list" :key="i.id" :data="i" :index="idx" @on-replay="getComments" />
    </div>
    <div v-else text-center p-10 text-sm>
      <svg m-auto t="1673855992163" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2771" width="60" height="60"><path fill="gray" d="M831.7 369.4H193.6L64 602v290.3h897.2V602L831.7 369.4zM626.6 604.6c0 62.9-51 113.9-114 113.9s-114-51-114-113.9H117.5l103.8-198h582.5l103.8 198h-281zM502.2 131h39.1v140.6h-39.1zM236.855 200.802l27.647-27.647 99.419 99.418-27.648 27.648zM667.547 272.637l99.418-99.419 27.648 27.648-99.418 99.418z" p-id="2772" /></svg>
      这空空的，想说点什么吗 ..
    </div>
  </div>
</template>
