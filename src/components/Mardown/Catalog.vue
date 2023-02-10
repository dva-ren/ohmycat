<script lang="ts" setup>
import { useCatalog } from './catalog'
import { useMainStore } from '~/store'

const { anchor, active, show, parse } = useCatalog()
const index = ref(0)
const mainStore = useMainStore()
const showCatalog = ref(false)

onMounted(() => {
  parse()
  mainStore.catalog = anchor.value
})

onBeforeUnmount(() => {
  document.body.onscroll = null
})
watch(active, () => {
  index.value = Number(active.value.split('-')[1]) || 0
})
</script>

<template>
  <div v-if="anchor.length" class="catalog">
    <div class="items" :style="`--top:${26 * index}px`">
      <div v-for="i in anchor" :key="i.id" class="catalog-item">
        <a :href="i.id" :class="{ active: i.id === active }">{{ i.text }}</a>
      </div>
    </div>
    <!-- 目录 -->
    <Drawer v-model="show" direction="bottom">
      <template #title>
        目录
      </template>
      <div class="items" :style="`--top:${26 * index}px`" ml-4>
        <div v-for="i in anchor" :key="i.id" class="catalog-item">
          <a :href="i.id" :class="{ active: i.id === active }">{{ i.text }}</a>
        </div>
      </div>
    </Drawer>
  </div>
</template>

<style scoped>
.catalog{
  max-height: 500px;
  overflow-y: scroll;
}
.items{
  border-left: 1px solid var(--yellow);
  padding-left: 0.8rem;
  position: relative;
  font-size: 14px;
}
.items::before{
  content: '';
  position: absolute;
  height: 20px;
  width: 2px;
  background-color: var(--light-color);
  left: -1px;
  transition: transform .2s;
  transform: translateY(var(--top));
}
.catalog-item a{
  display: block;
  height: 26px;
  padding: 0 2px;
  line-height: 26px;
  transition: .2s;
  opacity: 0.75;
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.catalog-item a:hover{
  color: #845EC2;
  opacity: 1;
  margin-left: -0.25rem;
}
.catalog-h2{
  padding-left: 1.5rem;
}
.catalog-h3{
  padding-left: 2.5rem;
}
.catalog-h4{
  padding-left: 3.5rem;
}
.active{
  color: #845EC2;
  opacity: 1 !important;
  margin-left: -0.25rem;
}
</style>
