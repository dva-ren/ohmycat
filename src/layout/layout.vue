<script lang="ts" setup>
const { full, loadding } = defineProps({
  full: {
    type: Boolean,
    default: false,
  },
  loadding: {
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
    <Loadding :loadding="loadding" />
    <div v-if="!full && !loadding" v-spring v-bind="$attrs" flex justify-center>
      <div w-60 display-none xl:display-block>
        <slot name="pre" />
      </div>
      <div p-4 max-w-750px min-w-0 sm:max-w-750px flex-1>
        <slot />
      </div>
      <div w-60 display-none md:display-block>
        <slot name="sidebar" />
      </div>
    </div>
    <!-- <Footer /> -->
  </div>
</template>
