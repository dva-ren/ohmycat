<script lang="ts" setup>
interface ToastOptions { type: 'warning' | 'success' | 'error'; msg: string }

const { type = 'success', msg } = defineProps<ToastOptions>()
</script>

<template>
  <div class="toast">
    <div v-if="type === 'success'" i-ri-checkbox-circle-fill class="icon" text-green />
    <div v-if="type === 'warning'" i-ri-error-warning-fill class="icon" text-orange />
    <div v-if="type === 'error'" i-ri-close-circle-fill class="icon" text-red />
    <div inline-block>
      {{ msg }}
    </div>
  </div>
</template>

<style scoped>
.toast{
  font-size: 14px;
  position: fixed;
  left: 50%;
  top: 2rem;
  transform: translateX(-50%);
  background-color: white;
  padding: .5rem .8rem;
  box-shadow: 0 4px 10px #0000001a;
}
.icon{
  display: inline-block;
  font-size: 1.25rem;
  vertical-align: -0.45rem;
  margin-right: .2rem;
}
</style>
