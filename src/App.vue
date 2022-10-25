<template>
  <NavBar />
  <main font-inter p="y-10" text="gray-700 dark:gray-200 max-w-100">
    <!-- <router-view v-slot="{ Component }">
      <transition>
        <component :is="Component" />
      </transition>
    </router-view> -->
    <router-view />
  </main>
</template>
