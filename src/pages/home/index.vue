<template>
  <div class="a">首页
    <div class="margin-top100">1231312</div>
    <button @click="$router.push({path: '/pages/home/test'})">test</button>
    <button @click="post">post</button>
    <button @click="send">send message</button>

  </div>

</template>

<script>
  export default {
    //todo webSocket 连接
    data() {
      return {
        socketOpen: false
      }
    },
    onShow() {
      this.webSocket()
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
        wx.onSocketMessage((res) => {
          console.log(`来自服务器的消息`, res)
        })
        wx.connectSocket({
          url: 'ws://127.0.0.1:3000',
          success: () => {
            console.log('ws connected')
          }
        })
        // wx.onSocketOpen((res) => {
        //   this.socketOpen = true
        //   console.log(`onSocketOpen`, res)
        //   if (this.socketOpen) {
        //     this.send()
        //   }
        // })
      },
      sendMsg() {
        wx.onSocketOpen((res) => {
          this.socketOpen = true
          console.log(`onSocketOpen`, res)
          if (this.socketOpen) {
            this.send()
          }
        })
      },
      send() {
        wx.sendSocketMessage({
          data: 'this is wx'
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
