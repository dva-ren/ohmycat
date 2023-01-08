<script lang="ts" setup>
const route = useRoute()

const showFooter = computed(() => !route.path.includes('projects'))
</script>

<template>
  <footer v-if="showFooter" text-sm w-full text-white>
    <img class="footer-img" src="../assets/footer.png" alt="">
    <div class="content" inline-flex justify-center gap-2 w-full bg="#67ACA0" py-10>
      <p>
        <span px-2>Powered by</span>
        <a href="https://github.com/dva-ren">dvaren</a>
        <span px-1>•</span>
        <a href="https://github.com/dva-ren/ohmycat">ohmycat</a>
      </p>
    </div>
  </footer>
</template>

<style scoped>
.footer-img{
  width: 100%;
  vertical-align: bottom;
  transform: translateY(2px);
}
a{
  transition: color .2s;
}
a:hover{
  color: var(--yellow)
}
</style>
