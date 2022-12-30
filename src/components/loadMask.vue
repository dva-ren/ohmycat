<script lang="ts" setup>
const emits = defineEmits(['end'])
const showMask = ref(true)
const handleAnimationEnd = (e: AnimationEvent) => {
  if (e.animationName.startsWith('zoom-out')) {
    showMask.value = false
    emits('end')
  }
}
</script>

<template>
  <div v-if="showMask" dark:bg-black class="load-mask" @animationend="handleAnimationEnd">
    <Logo width="6rem" />
  </div>
</template>

<style scoped>
.load-mask{
  background-image: url('../assets/texture.png');
  background-color: #a7a8bd;
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: zoom-out .8s .3s ease-out forwards;
  z-index: 100;
}
.icon{
  animation: zoom-in .2s ease-out forwards;
}
@keyframes zoom-in{
  0%{
    transform:scale(2);
    opacity: 0;
  }
  100%{
    transform:scale(1);
    opacity: 1;
  }
}
@keyframes zoom-out{
  0%{
    transform:scale(1);
  }
  70%{
    transform:scale(1.2);
    opacity: 1;
  }
  100%{
    transform:scale(6);
    opacity: 0;
    display: none;
  }
}
.dark .load-mask{
  background-color: black;
}
</style>
