<script lang="ts" setup>
const { to } = defineProps<{ to: string }>()
</script>

<template>
  <template v-if="!to.startsWith('http')">
    <router-link :to="to">
      <slot />
    </router-link>
  </template>
  <template v-else>
    <a :href="to" target="_blank">
      <slot />
      <div i-ri-share-circle-fill text-sm />
    </a>
  </template>
</template>
