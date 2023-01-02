<template>
  <footer text-sm inline-flex justify-center gap-2 w-full p-10 relative>
    <span>Powered by <a href="https://github.com/dva-ren">dvaren</a>.ohmycat</span>
  </footer>
</template>

<style scoped>
footer::before{
  content: '';
  position: absolute;
  top: 0;
  width:100%;
  height:2px;
  background-image:linear-gradient(to right,rgb(207, 203, 203) 0%, rgb(214, 207, 207) 50%, transparent 75%);
  background-size:20px 10px;
  background-repeat:repeat-x;
}
</style>
