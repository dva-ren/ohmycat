<script setup lang="ts">
const loadding = ref(true)
const route = useRoute()
const meta = computed(() => route.meta)
</script>

<template>
  <NavBar v-if="!meta.hideHeader" />
  <main font-inter text="dark:gray-200" class="main" w-full>
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </main>
  <Footer v-if="!meta.hideFooter" />
  <div class="z--1 inset-0 fixed op-80 bg-fixed pointer-events-none transition-opacity duration-500 ease transform-gpu">
    <div class="bg absolute inset-0 transform-gpu" />
  </div>
  <LoadMask v-model="loadding" @end="loadding = false" />
  <ToolsBar />
</template>

<style scoped>
main{
  min-height: calc(100vh - 5rem);
}
.bg{
  z-index: -1;
  height: 100%;
  background-image: url('./assets/background2.png');
}
.dark .bg{
  background-image: url('./assets/background2.png');
}
</style>
