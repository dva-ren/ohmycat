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
  <div v-if="full" v-bind="$attrs">
    <slot />
  </div>
  <div v-else v-bind="$attrs">
    <!-- <div w-60 display-none lg:display-block>
      <slot name="pre" />
    </div> -->
    <div p-4 max-w-850px m-auto>
      <slot />
    </div>
    <!-- <div w-60 display-none lg:display-block>
      <slot name="sidebar" />
    </div> -->
  </div>
</template>
