<script lang="ts" setup>
import type { Article } from '~/types'
import { formatTime } from '~/composables'
import { queryArticleList } from '~/api'
const loading = ref(true)
const list = ref<Array<Article>>([])
const route = useRoute()

const categoryId = computed(() => route.query.id as string)
const total = ref(0)

const getPosts = async () => {
  loading.value = true
  const res = await queryArticleList(categoryId.value)
  list.value = res.data.list
  total.value = res.data.total
  loading.value = false
}

watch(categoryId, () => {
  getPosts()
}, { immediate: true })
</script>

<template>
  <Layout :loadding="loading">
    <p text-2xl>
      <TextAnimation :text="`分类 - ${list[0]?.categoryName}`" />
    </p>
    <p text-gray text="15px" py-1>
      <TextAnimation :text="`该分类下共有${list.length}篇文章,加油!`" />
    </p>
    <!-- <Loadding :loadding="loading" /> -->
    <div v-if="!loading" pl-8 py-4 text-sm>
      <ul class="posts" text-gray-500>
        <template v-for="item, idx in list" :key="item.id">
          <li class="item fade_in_up" :style="`--delay:${idx * 0.1}s`" flex items-center tracking-wider>
            <router-link :to="`/posts/${item.id}`" class="link" px-2 text-gray-800>
              {{ item.title }}
            </router-link>
            <span text="12px gray-600">{{ formatTime(item.createTime, 'MM/dd/yyyy') }}</span>
          </li>
        </template>
      </ul>
    </div>
  </Layout>
</template>

<style scoped>
.item{
  position: relative;
  height: 30px;
  padding-left: .4rem;
}
.item::before{
  content: '';
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 9999px;
  top: 50%;
  left: -0.3rem;
  transform: translateY(-50%);
  background-color: var(--yellow);
}
.item::after{
  content: '';
  position: absolute;
  width: 1px;
  height: 30px;
  top: 50%;
  left: -0.1rem;
  transform: translateY(-50%);
  background-color: var(--yellow);
}
.posts .item:first-child::after{
  transform: translateY(10%);
}
.posts .item:last-child::after{
  transform: translateY(-90%);
}
.link{
}
.link:hover{
  /* outline: 1px solid orange; */
  /* border-bottom: 1px orange solid; */
  text-decoration: underline orange;
}
</style>
