<template>
  <div class="a">
    <button @click="post">post</button>
    <button @click="testSocket">socket</button>
    <button @click="select">去问诊</button>
    <button @click="popup">弹窗</button>
    <button @click="loginSocket">login Socket</button>
    <section class="padding20X paddingX20">
      <div class="cell flex-align-spacebetween"
           @click="goFillInfo"
           v-for="(item, index) of doctorList" :key="index">
        <div class="flex-align">
          <img :src="doctor" class="block" style="width: 110rpx; height: 110rpx"/>
          <div class="padding-left20 color-666">
            <div class="margin-bottom16 font-size4 bold color-333">{{item.name}}</div>
            <i class="icon-dept"></i>
            <span class=""> {{item.department}}</span>
            <span> · {{item.title}}</span>
          </div>
        </div>
        <i class="icon-enter color-theme"></i>
      </div>
    </section>
  </div>

</template>

<script>
  import doctor from '~/default/default_doctorhead.png'

  var socket = null
  export default {
    //todo webSocket 连接 使用socket.io
    data() {
      return {
        socketOpen: false,
        socket: null,
        doctor,
        doctorList: [
          {
            id: '1234',
            name: '医生1',
            title: '医师',
            department: '外科',
          },
          {
            id: '12345',
            name: '医生2',
            title: '护士',
            department: '内科'
          },
          {
            id: '32145',
            name: '医生3',
            title: '医师',
            department: '科室'
          },
        ]
      }
    },
    onLoad() {
      Object.assign(this, this.$options.data())
      if (!this.$store.state.userInfo) {
        this.$widget.alert('请登陆', () => {
          this.$router.push({path: '/pages/login', reLaunch: true})
          return
        })
      }
      if (this.$store.state.userInfo && !this.$store.state.userInfo.name) {
        this.$widget.alert('请将个人信息补充完整', () => {
          this.$router.push({path: '/pages/my/user_setting'})
        })
      }
      // socket = this.$socket('http://47.101.185.46:3000')
      socket = this.$socket('http://127.0.0.1:3000')
      socket.emit('send', {
        msg: '这里是客户端'
      })
      socket.on('get', data => {
        console.log(data)
      })
    },
    onUnload() {
      if (socket) {
        socket.disconnect()
      }
    },
    methods: {
      goFillInfo() {
        this.$router.push({path: '/pages/home/fill_info'})
      },
      loginSocket() {
        socket.emit('login', {
          userId: '5150510116'
        })
      },
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
          url: this.$api.test,
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
  .cell {
    background-color: #fff;
    padding: 20rpx;
    margin-top: 20rpx;
    border-radius: 10rpx;
  }
</style>
