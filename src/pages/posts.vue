<script lang="ts" setup>
const router = useRouter()
const names = computed(() => {
  return router.getRoutes().flatMap(r => r.path)
})
</script>

<template>
  <div m-auto max-w-650px px-4 lg:px-10>
    <h2 text-2xl py-4>
      posts
    </h2>
    <ul>
      <li v-for="r in names" :key="r" link>
        <router-link :to="r">
          {{ r }}
        </router-link>
      </li>
    </ul>
    <router-view />
  </div>
</template>
