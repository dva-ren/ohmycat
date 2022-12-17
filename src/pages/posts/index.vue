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
const getYear = (a: Date | string | number) => new Date(a).getFullYear()
const isSameYear = (a: Date | string | number, b: Date | string | number) => a && b && getYear(a) === getYear(b)
</script>

<template>
  <div>
    <h1 text-2xl font-bold>
      Posts
    </h1>
    <ul>
      <li v-for="r, idx in names" :key="r.path" my-2>
        <div v-if="!isSameYear(r.meta.date, names[idx - 1]?.meta.date)" relative h20 pointer-events-none>
          <span text-6em op10 absolute left-1rem top--.5rem font-bold>{{ getYear(r.meta.date) }}</span>
        </div>
        <router-link :to="r.path" link text-18px flex gap-2 items-center>
          <div min-w-2rem>
            <div v-if="r.meta.label" text-sm border rounded>
              {{ r.meta.label }}
            </div>
          </div>
          <div>
            <div block>
              {{ r.meta.title ?? r.name }}
            </div>
            <div text-14px>
              {{ format(parseISO(r.meta.date), 'MM-dd HH:mm') }}
            </div>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>
