<template>
  <main font-inter text="dark:gray-200" class="main" h-full w-full>
    <router-view v-slot="{ Component, route }">
      <NavBar v-if="!route.meta.full" />
      <component :is="Component" />
    </router-view>
  </main>
  <div class="z--1 inset-0 fixed op-80 bg-fixed pointer-events-none transition-opacity duration-500 ease transform-gpu">
    <div class="bg absolute inset-0 transform-gpu" />
  </div>
  <LoadMask />
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
