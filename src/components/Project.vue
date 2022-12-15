<script lang="ts" setup>
const { data } = defineProps<{ data: { name: string; descrption: string; icon: string; url: string } }>()
</script>

<template>
  <router-link :to="data.url" flex m-w-20 items-center py-3 text-gray-400 hover="bg-gray-100 text-gray-800" transition rounded>
    <div :class="`i-${data.icon ? data.icon : 'ri:emotion-laugh-fill'}` " text-xl w-10 mx-1 />
    <div flex-1>
      <div py-1>
        {{ data.name }}
      </div>
      <div text="gray 12px">
        {{ data.descrption }}
      </div>
    </div>
  </router-link>
</template>
