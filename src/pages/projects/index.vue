<script lang="ts" setup>
import projects from './projects.json'
</script>

<template>
  <Layout>
    <h1 text-2xl font-bold>
      Projects
    </h1>
    <div text-sm text-gray-400 py-4>
      一些代码片段和好玩的项目
    </div>
    <div v-spring class="project-grid py-2 -mx-3 gap-2">
      <Project v-for="(p, idx) in projects" :key="idx" :data="p" />
    </div>
    <div display-none>
      <div i-carbon-align-box-middle-left />
      <div i-ri:heart-pulse-fill />
      <div i-ri-code-box-line />
      <div i-ri:emotion-laugh-fill />
      <div i-ri-snowy-fill />
      <div i-carbon:button-centered />
      <div i-ri-fire-fill />
    </div>
  </Layout>
</template>

<style scoped>
  .project-grid{
    display: grid;
    grid-template-columns: repeat(2,1fr);
    column-gap: 1rem;
  }
</style>
