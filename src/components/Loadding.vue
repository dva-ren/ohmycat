<script lang="ts" setup>
const { modelValue } = defineProps<{ modelValue: boolean }>()
</script>

<template>
  <div v-if="modelValue" w-full relative mt-10>
    <div class="loader">
      <!-- --i为自定义属性，可通过var函数对其调用 -->
      <span class="ball" style="--i:1;" />
      <span class="shadow" style="--i:1;" />
      <span class="ball" style="--i:2;" />
      <span class="shadow" style="--i:2;" />
      <span class="ball" style="--i:3;" />
      <span class="shadow" style="--i:3;" />
      <span class="ball" style="--i:4;" />
      <span class="shadow" style="--i:4;" />
      <span class="ball" style="--i:5;" />
      <span class="shadow" style="--i:5;" />
    </div>
  </div>
</template>

<style scoped>
.loader span.ball{
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background-color: lightseagreen;
    /* 绝对定位 */
    position: absolute;
    /* 通过var函数调用自定义属性--i，计算出每个小球的位置 */
    left: calc(var(--i) * 40px);
    /* 执行动画：动画名 时长 线性的 无限次播放 利用变量让小球的运动拉开时间 */
    animation: jump 2s linear infinite calc(var(--i) * 0.3s);
}
/* 小球阴影 */
.loader span.shadow{
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background-color: #000;
    position: absolute;
    left: calc(var(--i) * 40px);
    bottom: -12.5px;
    z-index: -1;
    animation: shadow 2s linear infinite calc(var(--i) * 0.3s);
}

/* 定义动画 */
/* 小球跳动的动画 */
@keyframes jump {
    0%,100%{
        bottom: 150px;
    }
    40%,60%{
        bottom: 0;
        height: 50px;
    }
    50%{
        height: 25px;
        /* 加个颜色滤镜，改变小球的颜色 */
        /* 可以设置不同的度数来改变颜色 */
        filter: hue-rotate(180deg);
    }
}
/* 小球阴影的变化 */
@keyframes shadow {
    0%,100%{
        transform: scale(2);
        opacity: 0.1;
        /* 模糊滤镜 */
        filter: blur(5px);
    }
    40%,60%{
        transform: scale(1);
        opacity: 1;
        filter: blur(2px);
    }
}
</style>
