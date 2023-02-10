<script lang="ts" setup>

</script>

<template>
  <BaseLayout>
    <div flex justify-center>
      <div v-for="i in 6" :key="i" class="category" :class="{ active: i === 1 }">
        {{ i }}
      </div>
    </div>
    <div flex gap-4 flex-wrap justify-center mt-8>
      <div v-for="i in 10" :key="i" class="img-item" />
    </div>
  </BaseLayout>
</template>

<style scoped>
.category{
  width: 4rem;
  height: 2rem;
  line-height: 2rem;
  border-radius: 1rem;
  text-align: center;
  transition: all 0.2s;
  cursor: pointer;
  user-select: none;
}
.category:hover{
  background-color: var(--yellow);
  color: white;
}
.active{
  color: white;
  background-color: #8076a3;
}
.img-item{
  width: 160px;
  height: 260px;
  border: 1px solid gray;
  border-radius: 10px;
}
</style>
