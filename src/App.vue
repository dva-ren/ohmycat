<script lang="ts" setup>
import DefaultLayout from './layout/default.vue'
import FullLayout from './layout/full.vue'
</script>

<template>
  <main font-inter text="dark:gray-200" class="main" h-full>
    <!-- <router-view v-slot="{ Component }">
      <transition>
        <component :is="Component" />
      </transition>
    </router-view> -->
    <!-- <router-view /> -->
    <router-view v-slot="{ Component, route }">
      <DefaultLayout v-if="!route.meta.full && !route.meta.windowFull">
        <component :is="Component" />
      </DefaultLayout>
      <DefaultLayout v-if="!route.meta.full && route.meta.windowFull" full>
        <component :is="Component" />
      </DefaultLayout>
      <FullLayout v-if="route.meta.full">
        <component :is="Component" />
      </FullLayout>
    </router-view>
  </main>
  <div class="z--1 inset-0 fixed op-80 bg-fixed pointer-events-none transition-opacity duration-500 ease transform-gpu">
    <div class="bg absolute inset-0 transform-gpu" />
  </div>
</template>

<style scoped>
.bg{
  z-index: -1;
  height: 100%;
  background-image: url('./assets/background2.png');
}
.dark .bg{
  background-image: url('./assets/background2.png');
}
</style>
