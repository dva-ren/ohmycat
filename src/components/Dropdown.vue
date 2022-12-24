<script lang="ts" setup>
const showMenu = ref(false)
let stop: Function

watch(showMenu, () => {
  if (showMenu.value) {
    stop && stop()
    setTimeout(() => {
      stop = useEventListener('click', () => {
        showMenu.value = false
      })
    }, 0)
  }
  else { stop && stop() }
})
</script>

<template>
  <div relative>
    <div @click="showMenu = !showMenu" @blur="showMenu = false">
      <slot />
    </div>
    <div v-show="showMenu" absolute bg-white z-10 py-1 mt-1 rounded shadow>
      <slot name="content" />
    </div>
  </div>
</template>
