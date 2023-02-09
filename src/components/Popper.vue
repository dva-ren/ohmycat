<script lang="ts" setup>
import { createPopper } from '@popperjs/core/lib/popper-lite'
import type { Instance, Placement } from '@popperjs/core'
import type { PropType } from 'vue'

type TriggerType = 'click' | 'focus' | 'hover' | 'contextmenu'
const props = defineProps({
  trigger: {
    type: String as PropType<TriggerType>,
    default: 'click',
  },
  placement: {
    type: String as PropType<Placement>,
    default: 'bottom',
  },
  offset: {
    type: Number,
    default: 0,
  },
})

const inTooltip = ref(false)

const visible = ref(false)
const popcorn = ref<HTMLDivElement>()
const tooltip = ref<HTMLDivElement>()
const instance = ref<Instance>()
type stringKey = Record<string, any>

const handler: stringKey = {
  click: (e: MouseEvent) => {
    e.stopPropagation()
    visible.value = !visible.value
  },
  mouseenter: () => {
    if (!visible.value)
      visible.value = true
  },
  mouseleave: () => {
    setTimeout(() => {
      if (!visible.value)
        visible.value = true
      else if (!inTooltip.value)
        visible.value = false
    }, 0)
  },
} as const

function handleWindowClick(e: Event) {
  visible.value = false
}
function handleWindowTouchMove(e: Event) {
  visible.value = false
}

const trigger: stringKey = {
  click: () => {
    popcorn.value!.addEventListener('click', handler.click)
    window.document.addEventListener('click', handleWindowClick)
  },
  hover: () => {
    popcorn.value!.addEventListener('mouseenter', handler.mouseenter)
    popcorn.value!.addEventListener('mouseleave', handler.mouseleave)
    window.document.addEventListener('touchmove', handleWindowTouchMove)
  },
  focus: () => {

  },
  contextmenu: () => {

  },
  stop: (e: MouseEvent) => {
    e.stopPropagation()
  },
}
onBeforeMount(() => {
  for (const eventName in handler)
    popcorn.value?.removeEventListener(eventName, (handler[eventName]))
  window.document.removeEventListener('click', handleWindowClick)
  window.document.removeEventListener('click', trigger.stop)
})

onMounted(() => {
  instance.value = createPopper(popcorn.value!, tooltip.value!, {
    placement: props.placement,
    modifiers: [
      {
        name: 'eventListeners',
        options: {
          scroll: false,
        },
      },
    ],
  })
  trigger[props.trigger]()
  tooltip.value?.addEventListener('click', trigger.stop)
})
function handleMouseLeave() {
  if (props.trigger === 'click')
    return
  inTooltip.value = false
  visible.value = false
}

watch(visible, () => {
  if (visible.value && instance.value)
    instance.value.update()
})
</script>

<template>
  <div ref="popcorn" v-bind="$attrs">
    <slot />
  </div>
  <Teleport to="body">
    <Transition>
      <div v-show="visible" ref="tooltip" z-40 class="content" bg-white dark:bg-gray-800 @mouseenter="inTooltip = true" @mouseleave="handleMouseLeave">
        <slot name="content" />
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.content{
  box-shadow: 0 0 10px #7878781a, 0 5px 20px #78787833;
  border-radius: 0.25rem;
  overflow: hidden;
  padding: 0.25rem 0;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
