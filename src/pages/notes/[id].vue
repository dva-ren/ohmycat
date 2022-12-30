<script lang="ts" setup>
import type { Article } from '~/types'
import { cloudApi, formateToLocaleHasWeek } from '~/composables'

const loading = ref(true)
const post = ref<Article>()
const posts = ref<Array<Article>>([])
const route = useRoute()

const getArticle = async (id: string) => {
  const res = await cloudApi.invokeFunction('query-article', { id })
  post.value = res.data
  loading.value = false
}
const getPosts = async () => {
  const id = route.params.id as string
  if (id && id !== 'new')
    getArticle(id)
  const res = await cloudApi.invokeFunction('get-article', {})
  posts.value = res.data
  loading.value = false
  getArticle(posts.value[0]._id)
}

getPosts()
</script>

<template>
  <Layout v-if="post">
    <div class="info" border p-4>
      <p class="left-label">
        {{ formateToLocaleHasWeek(post.createTime) }}
      </p>
      <p text-center pt-4 text="16.8px">
        {{ post.title }}
      </p>
      <MyEditor v-model="post.content" />
    </div>
    <div py-10>
      <p text-center py-4>
        <router-link to="/timeLine?type=notes" border>
          时间线
        </router-link>
      </p>
      <div flex justify-between>
        <button btn>
          上一篇
        </button>
        <button btn>
          下一篇
        </button>
      </div>
    </div>
  </Layout>
</template>

<style scoped>
.info{
  color: var(--light-brown);
}
.dark .info{
  color: white;
}
</style>
