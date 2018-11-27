<template>
  <div class="a">首页
    <div class="margin-top100">1231312</div>
    <button @click="$router.push({path: '/pages/home/test'})">test</button>
    <button @click="post">post</button>

  </div>

</template>

<script>
  export default {
    //todo webSocket 连接
    methods: {
      post() {
        this.$post({
          url: 'http://127.0.0.1:3000/hello',
          param: {
            name: 'alex'
          }
        }).then(res => {
          console.log(res)
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .a {
    button {
      background-color: #999999;
    }
  }
</style>
