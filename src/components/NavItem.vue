<script lang="ts" setup>
import type { NavItem } from '~/types'

const { data, active } = defineProps<{ data: NavItem; active?: boolean }>()
</script>

<template>
  <div text-sm h-full flex px-4 class="nav-item" :class="active ? 'active' : ''">
    <router-link v-if="!data.children" :to="data.url" flex items-center>
      <div :class="data.icon" inline-block />
      <span p-l-2>{{ data.name }}</span>
    </router-link>
    <Popper v-else trigger="hover" flex>
      <router-link :to="data.url" flex items-center w-full>
        <div :class="data.icon" inline-block />
        <span p-l-2>{{ data.name }}</span>
      </router-link>
      <template #content>
        <div v-for="child in data.children" :key="child.name">
          <router-link :to="child.url" p-x-10 py-2 block hover:text-orange-400 transition>
            {{ child.name }}
          </router-link>
        </div>
      </template>
    </Popper>
  </div>
</template>

<style scoped>
.nav-item{

}
.active{

}
</style>
