/// <reference types="vitest" />

import path, { resolve } from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Unocss from 'unocss/vite'

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    Vue({
      reactivityTransform: true,
      include: [/\.vue$/, /\.md$/],
    }),
    // https://github.com/hannoeru/vite-plugin-pages
    Pages({
      extensions: ['vue'],
      dirs: ['src/pages/'],
      extendRoute(route) {
        const path = resolve(__dirname, route.component.slice(1))
        if (!path.includes('projects.md'))
          route.meta = Object.assign(route.meta || {})
        return route
      },
    }),
    AutoImport({
      imports: [
        'vue',
        'vue/macros',
        'vue-router',
        '@vueuse/core',
      ],
      dts: true,
      dirs: [
        './src/composables',
      ],
      vueTemplate: true,
    }),
    Components({
      dts: true,
      dirs: [
        './src/layout',
        './src/components',
      ],
    }),

    // see unocss.config.ts for config
    Unocss(),
  ],

  test: {
    environment: 'jsdom',
  },
})
