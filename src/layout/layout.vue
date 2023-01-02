<script lang="ts" setup>
const { full } = defineProps({
  full: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div>
    <div v-if="full" v-bind="$attrs">
      <slot />
    </div>
    <div v-else v-bind="$attrs" flex justify-center>
      <div w-60 display-none lg:display-block>
        <slot name="pre" />
      </div>
      <div p-4 max-w-750px min-w-0 sm:min-w-750px flex-1 h-full>
        <slot />
      </div>
      <div w-60 display-none lg:display-block>
        <slot name="sidebar" />
      </div>
    </div>
    <!-- <Footer /> -->
  </div>
</template>
