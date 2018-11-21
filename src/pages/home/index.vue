<template>
  <div class="a">首页
    <button @click="$router.push({path: '/pages/home/test'})">test</button>
  </div>

</template>

<script>
  export default {
    name: "index"
  }
</script>

<style lang="scss" scoped>
  .a {
    button {
      background-color: #999999;
    }
  }
</style>
