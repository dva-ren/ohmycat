<script lang="ts" setup>
import type { Comment, PageInfo } from '~/types'
import { queryComment } from '~/api'

const { refId, type } = defineProps<{ refId: string; type: 'note' | 'posts' }>()
const loadding = ref(false)
const visible = ref(false)
const commentRef = ref<HTMLElement>()
const commentPageInfo = ref<PageInfo<Comment>>()
const total = ref(0)
const getComments = async () => {
  loadding.value = true
  const res = await queryComment(refId)
  commentPageInfo.value = res.data
  total.value = res.data.total + 1
  loadding.value = false
}
onMounted(() => {
  let flag = false
  const { stop } = useIntersectionObserver(commentRef, () => {
    if (flag) {
      visible.value = true
      getComments()
      stop()
    }
    flag = true
  })
})
</script>

<template>
  <div>
    <div class="left-label" py-4>
      共有{{ commentPageInfo?.total }}条评论
    </div>
    <EditComment :ref-id="refId" :type="type" :index="total" @on-send="getComments" />
    <div ref="commentRef" />
    <div v-if="visible">
      <Loadding v-if="loadding" :loadding="loadding" />
      <div v-else>
        <div v-if="commentPageInfo?.total" mt-4>
          <template v-for="i, idx in commentPageInfo.list" :key="i.id">
            <CommentItem v-if="!i.isWhispers" :data="i" :index="idx" @on-replay="getComments" />
          </template>
        </div>
        <Empty v-else>
          这里空空的，想说点什么吗...
        </Empty>
      </div>
    </div>
  </div>
</template>
