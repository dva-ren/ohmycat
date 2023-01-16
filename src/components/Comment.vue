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
    <div mt-4>
      <CommentItem v-for="i, idx in commentPageInfo.list" :key="i.id" :data="i" :index="idx" @on-replay="getComments" />
    </div>
  </div>
</template>
