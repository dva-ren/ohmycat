<script lang="ts" setup>
import { useCatalog } from './Mardown/catalog'
import { useMainStore } from '~/store'

const scroll = useWindowScroll()
const showFlags = reactive({
  main: true,
  scroll: false,
})
const mainStore = useMainStore()
const catalog = computed(() => mainStore.catalog)
const { show } = useCatalog()

function toTop() {
  document.documentElement.scrollTo({ top: 0, behavior: 'smooth' })
}
const watchMain = useThrottleFn((curr, pre) => {
  if (curr > pre)
    showFlags.main = false
  else
    showFlags.main = true
}, 200)
const showPlayer = () => {
  mainStore.showPlayer = true
}
const showCatalog = () => {
  show.value = true
}
watch(useThrottle(scroll.y, 100), (curr, pre) => {
  if (curr > 500)
    showFlags.scroll = true
  else
    showFlags.scroll = false
  watchMain(curr, pre)
})
</script>

<template>
  <Transition name="main">
    <div v-show="showFlags.main" fixed right-4 bottom-4>
      <div flex flex-col gap-2>
        <Transition>
          <button v-show="showFlags.scroll" class="button" @click="toTop">
            <div i-carbon-up-to-top />
          </button>
        </Transition>
        <button v-if="catalog.length" class="button" @click="showCatalog">
          <div i-ri-menu-2-fill />
        </button>
        <button class="button" @click="toggleDark()">
          <div dark:i-carbon-moon i-carbon-sun />
        </button>
        <button class="button" @click="showPlayer">
          <div i-ri-netease-cloud-music-line />
        </button>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.button{
  color: var(--light-color);
  padding: .74rem;
  background-color: white;
  border-radius: 9999px;
  box-shadow: 0 0 10px #7878781a, 0 5px 20px #78787833;
}
.dark .button{
  color: white;
  background-color: rgba(0,0,0,0.8);
}
.button div{
  font-size: 14px;
}
.v-enter-active,
.v-leave-active{
  transition: opacity 0.2s ease,transform 0.2s ease-in;
}
.v-enter-from,
.v-leave-to{
  opacity: 0;
  transform: scale(0.5);
}

.main-enter-active,
.main-leave-active{
  transition: transform 0.2s ease;
}
.main-enter-from,
.main-leave-to{
  transform: translateX(100%);
}
</style>
