<script lang="ts" setup>
import DefaultLayout from './layout/default.vue'
import FullLayout from './layout/full.vue'
</script>

<template>
  <main font-inter text="gray-700 dark:gray-200">
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
</template>
