<script lang="ts" setup>
const { loadding } = defineProps<{ loadding: boolean }>()
</script>

<template>
  <div v-if="loadding" class="loading">
    <div class="ball-container">
      <div class="ball" />
    </div>
  </div>
</template>

<style scoped>
.loading{
  position: relative;
  width: 100%;
  height: 200px;
}
.ball-container{
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
.ball{
  height: 36px;
  width: 36px;
  border-radius: 50%;
  background-color: #105D67;
  animation: loading alternate infinite 0.6s ease-in;
  transform: scale(0.2);
}
@keyframes loading {
  0%{
    transform: translateY(0) scale(0.2);
  }
  80%{
    transform: translateY(60px) scale(0.4);
  }
  100%{
    transform: translateY(80px) scale(1);
  }
}
</style>
