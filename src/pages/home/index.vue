<template>
  <div class="a">首页
    <div class="margin-top100">1231312</div>
    <button @click="$router.push({path: '/pages/home/test'})">test</button>
    <button @click="post">post</button>
    <button @click="webSocket">send message</button>

  </div>

</template>

<script>
  export default {
    //todo webSocket 连接
    onShow() {
      // this.webSocket()
    },
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
      },
      webSocket() {
        let socketOpen = false
        wx.connectSocket({
          url: 'ws://127.0.0.1:3000',
          success: ()=> {
            console.log('ws connected')
          }
        })
        console.log(1111)
        wx.onSocketOpen((res)=> {
          socketOpen = true
        })
        console.log(222)
        if (socketOpen) {
          wx.sendSocketMessge({
            data: 'from wx'
          })
        }
        console.log(333)
      },
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
