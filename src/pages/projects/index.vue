<script lang="ts" setup>
import Layout from '../../layout/default.vue'
const projects = ref([
  { name: 'blog', descrption: '一个辣鸡博客', icon: '', url: 'https://github.com/dva-ren/blog-demo-app' },
  { name: 'work', descrption: '生成电视查询信息', icon: '', url: '/projects/work' },
])
</script>

<template>
  <Layout>
    <h1 text-2xl font-bold>
      Projects
    </h1>
    <div text-sm text-gray-400 py-4>
      All Projects demo and code snapshot
    </div>
    <div flex gap-6>
      <Project v-for="(p, idx) in projects" :key="idx" flex-1 :data="p" />
    </div>
  </Layout>
</template>
