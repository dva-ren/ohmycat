<script lang="ts" setup>
import { useCatalog } from './catalog'

const { anchor, active } = useCatalog()
const index = ref(0)

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
  </div>
</template>

<style scoped>
.items{
  border-left: 1px solid var(--yellow);
  padding-left: 0.8rem;
  position: relative;
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
}
.catalog-item a:hover{
  color: #8076a3;
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
  color: #8076a3;
  opacity: 1 !important;
  margin-left: -0.25rem;
}
</style>
