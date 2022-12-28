<script lang="ts" setup>
import type { NavItem } from '~/types'

const { data } = defineProps<{ data: NavItem }>()
</script>

<template>
  <div text-sm h-full flex p-4>
    <router-link v-if="!data.children" :to="data.url" flex items-center>
      <i i-ri:book-read-line class="v-icon" inline-block />
      <span p-l-1>{{ data.name }}</span>
    </router-link>
    <Popper v-else trigger="hover" flex>
      <router-link :to="data.url" flex items-center>
        <i i-ri:book-read-line class="v-icon" inline-block />
        <span p-l-1>{{ data.name }}</span>
      </router-link>
      <template #content>
        <div v-for="child in data.children" :key="child.name">
          <router-link :to="child.url" p-x-10 py-2 block>
            {{ child.name }}
          </router-link>
        </div>
      </template>
    </Popper>
  </div>
</template>
