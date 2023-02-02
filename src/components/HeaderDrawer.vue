<script setup lang="ts">
import type { NavItem } from '~/types'
const { menus, activeIndex = -1 } = defineProps<{ menus: NavItem[]; activeIndex: number }>()
const visible = ref(false)
const router = useRouter()

const open = () => {
  visible.value = true
}
router.beforeEach(() => {
  visible.value = false
})
</script>

<template>
  <nav v-bind="$attrs">
    <button @click="open">
      <div i-ri-menu-fold-fill />
    </button>
    <Drawer v-model="visible">
      <ul v-for="menu, idx in menus" :key="menu.url" class="links" mb-4>
        <router-link :to="menu.url" class="nav-link" :class="activeIndex === idx ? 'label' : ''">
          <div :class="menu.icon" />
          <span>{{ menu.name }}</span>
        </router-link>
        <div grid grid-cols-2 m-4>
          <li v-for="item in menu.children" :key="item.url" my-2 text-sm>
            <router-link :to="item.url">
              {{ item.name }}
            </router-link>
          </li>
        </div>
      </ul>
    </Drawer>
  </nav>
</template>

<style scoped>
.nav-link{
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: large;
}
.links{
  color: var(--light-color);
}
</style>
