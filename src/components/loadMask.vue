<script lang="ts" setup>
const showMask = ref(true)
const handleAnimationEnd = (e: AnimationEvent) => {
  if (e.animationName.startsWith('zoom-out'))
    showMask.value = false
}
</script>

<template>
  <div v-show="showMask" dark:bg-black class="load-mask" @animationend="handleAnimationEnd">
    <Logo width="6rem" />
  </div>
</template>

<style scoped>
.load-mask{
  background-color: white;
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: zoom-out .8s .3s ease-out forwards;
}
.icon{
  animation: zoom-in .2s ease-out forwards;
}
@keyframes zoom-in{
  0%{
    scale: 2;
    opacity: 0;
  }
  100%{
    scale: 1;
    opacity: 1;
  }
}
@keyframes zoom-out{
  0%{
    scale: 1;
  }
  70%{
    scale: 1.2;
    opacity: 1;
  }
  100%{
    scale: 6;
    opacity: 0;
    display: none;
  }
}
.dark .load-mask{
  background-color: black;
}
</style>
