<script lang="ts" setup>
const { full } = defineProps({
  full: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <NavBar />
  <div v-if="full">
    <slot />
  </div>
  <div v-else m-auto max-w-860px p-4 sm:p="5em 2em" lg:px-10>
    <slot />
  </div>
</template>
