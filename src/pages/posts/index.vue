<script lang="ts" setup>
import { format, parseISO } from 'date-fns'
const router = useRouter()
const names = computed(() => {
  const reg = /\/posts\/(.*)/
  return router.getRoutes().map((r) => {
    const res = reg.exec(r.path)
    return {
      path: r.path,
      name: res && res.length > 1 ? res[1] : null,
      meta: r.meta.frontmatter as any,
    }
  }).filter(i => i.name).sort((a, b) => {
    return parseISO(b.meta.date).getTime() - parseISO(a.meta.date).getTime()
  })
})
</script>

<template>
  <div>
    <h2 text-2xl font-bold py-4>
      posts
    </h2>
    <ul ml-4>
      <li v-for="r in names" :key="r.path" my-2>
        <router-link :to="r.path" link text-18px>
          <div block>
            {{ r.meta.title ?? r.name }}
          </div>
          <div text-14px>
            {{ format(parseISO(r.meta.date), 'MM-dd hh:mm') }}
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>
