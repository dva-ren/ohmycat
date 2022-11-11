---
title: vite 配置
date: 2022-11-09 11:00
---
## {{frontmatter.title}}

> 将markdown属性添加到路由meta字段上

```ts
import Pages from 'vite-plugin-pages'
import matter from 'gray-matter'

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    // ...,
    Pages({
      extensions: ['vue', 'md'],
      dirs: ['src/pages/', 'src/posts'],
      extendRoute(route) {
        const path = resolve(__dirname, route.component.slice(1))

        if (!path.includes('projects.md')) {
          const md = fs.readFileSync(path, 'utf-8')
          const { data } = matter(md)
          route.meta = Object.assign(route.meta || {}, { frontmatter: data })
        }
        return route
      },
    })
  ],
})

```
