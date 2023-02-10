<script setup lang="ts">
import { drawerProps } from './drawer'
const props = defineProps(drawerProps)
const emits = defineEmits(['update:modelValue', 'close'])

const computedName = computed(() => `${props.direction}Move`)

const computedDrawerPosition = computed(() => {
  const positionObj: Record<string, any> = {
    width:
    ((props.direction === 'left') || (props.direction === 'right'))
      ? '70%'
      : '100%',
    height:
    ((props.direction === 'top') || (props.direction === 'bottom'))
      ? '30%'
      : '100%',
  }
  positionObj[props.direction] = 0
  return positionObj
})
// 关闭抽屉弹出框
const close = () => {
  emits('update:modelValue', false)
  emits('close')
}
const closeDrawer = () => {
  // 若传递了beforeClose函数，就抛出关闭函数，供外部使用
  if (props.beforeClose)
    props.beforeClose(close)
  // 没有beforeClose函数，直接关闭即可
  else
    close()
}

const clickMaskCloseFn = () => {
  if (props.clickMaskClose) {
    closeDrawer()
  }
  else {
    /* 这里要控制一下冒泡事件，注意第十行使用@click.stop
        不控制冒泡的话，点击内容区也会导致弹出框关闭 */
  }
}
const onEnter = () => {
  document.body.style.overflow = 'hidden'
}

const onLeave = () => {
  document.body.style.overflow = 'auto'
}
</script>

<template>
  <Teleport to="body">
    <Transition
      :name="computedName"
      @after-enter="onEnter"
      @after-leave="onLeave"
    >
      <div
        v-show="props.modelValue"
        class="myDrawerWrap"
        :class="{ isShowDrawerMask: mask }"
        @click="clickMaskCloseFn"
      >
        <div
          ref="drawerContentRef"
          class="drawerContent"
          :style="computedDrawerPosition"
          @click.stop
        >
          <header v-show="props.isShowHeader" class="drawerHeader">
            <slot name="title">
              <span>{{ title }}</span>
            </slot>
            <div v-show="props.showCloseIcon" text-right p-4 @click="onClose">
              <button i-ri-close-line text-xl @click="closeDrawer" />
            </div>
          </header>
          <section class="drawerBody">
            <slot />
          </section>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.myDrawerWrap {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 999;
  overflow: hidden;
}
.drawerContent {
  /* // 搭配定位的方式控制在上下左右的那个方位 */
  position: absolute;
  background-color: #fff;
  box-shadow: 2px 2px 12px 0 rgba(0, 0, 0, 0.24);
  display: flex;
  flex-direction: column;
}
/* // 抽屉头部 */
.drawerHeader {
  width: 100%;
  height: 48px;
  box-sizing: border-box;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: bolder;
  color: #333;
}
/* 抽屉内容体部分 */
.drawerBody {
  width: 100%;
  box-sizing: border-box;
  padding: 12px;
  flex: 1;
  overflow-y: auto;
}
:deep(.dark .myDrawerWrap){
  background-color: #000000c4;
}
/* 遮罩层即为背景色 */
.isShowDrawerMask {
  background-color: rgba(0, 0, 0, 0.3);
}
/**
  动画
*/
/**右边 */
.rightMove-enter-from,
.rightMove-leave-to {
  opacity: 0;
}
.rightMove-enter-active, .rightMove-enter-active .drawerContent,
.rightMove-leave-active, .rightMove-leave-active .drawerContent {
  transition: all 0.3s ease-in-out;
}
.rightMove-enter-from,
.rightMove-leave-to {
  opacity: 0;
}
.rightMove-enter-from .drawerContent,
.rightMove-leave-to .drawerContent {
  transform: translate3d(100%,0,0);
}
/** 底部 */
.bottomMove-enter-from,
.bottomMove-leave-to {
  opacity: 0;
}
.bottomMove-enter-active, .bottomMove-enter-active .drawerContent,
.bottomMove-leave-active, .bottomMove-leave-active .drawerContent {
  transition: all 0.3s ease-in-out;
}
.bottomMove-enter-from,
.bottomMove-leave-to {
  opacity: 0;
}
.bottomMove-enter-from .drawerContent,
.bottomMove-leave-to .drawerContent {
  transform: translate3d(0,100%,0);
}
</style>
