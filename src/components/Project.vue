<script lang="ts" setup>
const { data } = defineProps<{ data: { name: string; descrption: string; icon?: string; url: string; color?: string; target?: string } }>()
</script>

<template>
  <div v-spring>
    <Link :to="data.url" flex items-center px-1 py-3 hover="bg-gray-100 text-gray-800" dark:hover="bg-gray-800 text-gray-100" transition rounded :target="data.target">
      <div :class="`i-${data.icon ? data.icon : 'ri:emotion-laugh-fill'}`" :style="{ color: data.color }" text-2xl w-10 mx-1 />
      <div flex-1>
        <div py-1>
          {{ data.name }}
        </div>
        <div text="gray-400 12px">
          {{ data.descrption }}
        </div>
      </div>
    </Link>
  </div>
</template>
