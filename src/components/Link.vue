<script lang="ts" setup>
const { to, target = '' } = defineProps<{ to: string; target: string }>()
</script>

<template>
  <template v-if="!to.startsWith('http')">
    <router-link :target="target" :to="to">
      <slot />
    </router-link>
  </template>
  <template v-else>
    <a :href="to" target="_blank">
      <slot />
      <div i-ri-share-circle-fill text-sm mr-1 />
    </a>
  </template>
</template>
