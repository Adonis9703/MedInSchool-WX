<template>
  <div class="a">首页
    <div class="margin-top100">socket 测试</div>
    <button @click="post">post</button>
    <button @click="setCache">缓存</button>
    <button @click="login">登录</button>
    <button @click="checkToken">Token</button>
    <button @click="testSocket">socket</button>
    <van-button>van</van-button>
  </div>

</template>

<script>
  var socket = null
  export default {
    //todo webSocket 连接 使用socket.io
    data() {
      return {
        socketOpen: false,
        socket: null
      }
    },
    onLoad() {
      socket = this.$socket('http://47.101.185.46:3000')
      socket.emit('send', {
        msg: '这里是客户端'
      })
      socket.on('get', data => {
        console.log(data)
      })
    },
    onUnload() {
      socket.disconnect()
    },
    methods: {
      testSocket() {
        socket.emit('send', {
          msg: '测试测试'
        })
      },
      checkToken() {
        this.$post({
          url: 'http://127.0.0.1:3000/checkToken'
        }).then(res => {
          console.log(`token check `, res)
        })
      },
      login() {
        this.$post({
          url: this.$api.login,
          param: {
            studentId: '5150510116',
            password: 123456
          }
        }).then(res => {
          console.log(`登录信息`, res.token)
          this.$store.commit('setToken', res.token)
          console.log(this.$store.state.token)
        })
      },
      setCache() {
        this.$cache.set('name', 'alex')
      },
      post() {
        this.$post({
          url: 'http://47.101.185.46:3000/hello',
          param: {
            name: 'alex'
          }
        }).then(res => {
          console.log(res)
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
  .a {
    text-align: center;
    button {
    }
  }
</style>
