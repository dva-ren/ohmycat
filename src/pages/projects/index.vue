<script lang="ts" setup>
import Layout from '../../layout/default.vue'
import projects from './projects.json'
</script>

<template>
  <Layout>
    <h1 text-2xl font-bold>
      Projects
    </h1>
    <div text-sm text-gray-400 py-4>
      All Projects demo and code snapshot
    </div>
    <div class="project-grid py-2 -mx-3 gap-2">
      <Project v-for="(p, idx) in projects" :key="idx" :data="p" />
    </div>
    <div display-none>
      <div i-ri:emotion-laugh-fill />
      <div i-ri:heart-pulse-fill />
      <div i-carbon-align-box-middle-left />
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
