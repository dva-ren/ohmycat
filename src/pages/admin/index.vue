<script lang="ts" setup>

</script>

<template>
  <div flex p="x4 y8">
    <div p-6 bg-white h-full>
      <div my-2>
        <router-link to="/admin/user" px-4 btn>
          用户管理
        </router-link>
      </div>
      <div>
        <router-link to="/admin/article" px-4 btn>
          文章管理
        </router-link>
      </div>
    </div>
    <div>
      content
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  full: true
</route>

