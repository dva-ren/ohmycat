<script lang="ts" setup>
const router = useRouter()
const names = computed(() => {
  const reg = /\/posts\/(.*)/
  return router.getRoutes().map((r) => {
    const res = reg.exec(r.path)
    return {
      path: r.path,
      name: res && res.length > 1 ? res[1] : null,
      meta: r.meta.frontmatter,
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
      <li v-for="r in names" :key="r.path">
        <router-link :to="r.path" link>
          {{ r.meta.title ?? r.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>
