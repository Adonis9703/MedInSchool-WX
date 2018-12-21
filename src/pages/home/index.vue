<template>
  <div class="a">
    <button @click="post">post</button>
    <!--<button @click="setCache">缓存</button>-->
    <!--<button @click="login">登录</button>-->
    <!--<button @click="checkToken">Token</button>-->
    <button @click="testSocket">socket</button>
    <button @click="select">去问诊</button>
    <button @click="popup">弹窗</button>
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
      Object.assign(this, this.$options.data())
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
      popup() {
        wx.showModal({
          title: '提示',
          content: '这是一个模态弹窗',
          success(res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      },
      select() {
        this.$router.push({path: '/pages/home/select_doctor'})
      },
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
