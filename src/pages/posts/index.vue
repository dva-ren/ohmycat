<script lang="ts" setup>
const router = useRouter()
const names = computed(() => {
  const reg = /\/posts\/(.*)/
  return router.getRoutes().map((r) => {
    const res = reg.exec(r.path)
    return {
      path: r.path,
      name: res && res.length > 1 ? res[1] : null,
    }
  }).filter(i => i.name)
})
</script>

<template>
  <div>
    <h2 text-2xl font-bold py-4>
      posts
    </h2>
    <ul ml-4>
      <li v-for="r in names" :key="r.path" link>
        <router-link :to="r.path">
          {{ r.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>
