<template>
  <div class="height100">
    <img @click="isTransition= !isTransition" :src="back" class="absolute z-index-1"
         :class="{'transform':!isTransition, 'transform0': isTransition}">
    <main>
      <section class="flex-justify">
        <div class="logo flex-align-justify ">
          <img :src="logo"/>
        </div>
      </section>
      <div :class="{'fadeIn': pageType === 0, 'fadeOut': pageType !== 0}"
           class="color-white text-align-center font-size6 width100 border-box" style="padding: 0 160rpx">
        <input v-model="loginInfo.id" type="number" :class="{'bold': loginInfo.id !==''}" placeholder="学号"/>
        <input v-model="loginInfo.password" placeholder="密码" type="password" class="margin-top20"/>
        <div class="margin-top40 bold" @click="doLogin">登录</div>
      </div>
      <div :class="{'fadeIn': pageType === 1, 'fadeOut': pageType !== 1}"
           class="color-white text-align-center font-size6 width100 border-box" style="padding: 0 160rpx">
        <input v-model="registerInfo.id" type="number" :class="{'bold': registerInfo.id !==''}" placeholder="学号"/>
        <input v-model="registerInfo.password" placeholder="密码" type="password" class="margin-top20"/>
        <input v-model="registerInfo.tel" placeholder="手机号" type="number" :class="{'bold': registerInfo.tel !==''}"
               class="margin-top20"/>
        <input v-model="registerInfo.msgCode" placeholder="验证码" type="number"
               :class="{'bold': registerInfo.msgCode !==''}"
               class="margin-top20"/>
        <div class="margin-top40 bold" @click="doRegister">注册</div>
      </div>
      <div :class="{'fadeIn': pageType === 2, 'fadeOut': pageType !== 2}"
           class="color-white text-align-center font-size6 width100 border-box" style="padding: 0 160rpx">
        <input v-model="restInfo.id" type="number" :class="{'bold': restInfo.id !==''}" placeholder="学号"/>
        <input v-model="restInfo.tel" placeholder="手机号" type="number" :class="{'bold': restInfo.tel !==''}"
               class="margin-top20"/>
        <input v-model="restInfo.msgCode" placeholder="验证码" type="number" :class="{'bold': restInfo.msgCode !==''}"
               class="margin-top20"/>
        <input v-model="restInfo.password" placeholder="新密码" type="password"
               class="margin-top20"/>
        <div class="margin-top40 bold" @click="">重置</div>
      </div>
      <section class="flex-align-spacebetween paddingX100 absolute width100 border-box bottom100 color-ddd">
        <div v-if="pageType===1 || pageType===2" @click="pageType=0" class="color-white">用户登录</div>
        <div v-if="pageType===0 || pageType === 2" @click="pageType=1">用户注册</div>
        <div v-if="pageType===1 || pageType === 0" @click="pageType=2">忘记密码</div>
        <!--<div @click="$router.push('/im/webrtcroom/room/room')">视频</div>-->
      </section>
    </main>
    <van-toast id="van-toast"/>
  </div>
</template>

<script>
  import back from '~/back/bg_person.jpg'
  import logo from '~/default/user_heading.png'

  export default {
    name: "login",
    data() {
      return {
        back,
        logo,
        pageType: null, //0登录 //1注册 //2忘记密码
        isTransition: false,
        loginInfo: {
          id: '',
          password: ''
        },
        registerInfo: {
          id: '',
          password: '',
          tel: '',
          msgCode: '',
        },
        restInfo: {
          id: '',
          tel: '',
          msgCode: '',
          newPassword: ''
        }
      }
    },
    onLoad() {
      Object.assign(this, this.$options.data())
    },
    onShow() {
      this.isTransition = !this.isTransition
      // this.pageType=0
      setTimeout(() => {
        this.pageType = 0
      }, 300)
    },
    methods: {
      doLogin() {
        this.$post({
          isLoading: true,
          url: this.$api.login,
          param: {
            userId: this.loginInfo.id,
            password: this.loginInfo.password
          }
        }).then(res => {
          console.log('login', res)
          if (res.success) {
            this.$store.commit('setToken', res.token)
            this.$store.commit('setUserInfo', res.data)
            this.$router.push({path: '/pages/home', isTab: true})
          } else {
            this.$widget.toastWarn(res.message)
          }
          // this.$router.push({path: '/pages/home', isTab: true})
        })
      },
      doRegister() {
        this.$post({
          isLoading: true,
          url: this.$api.register,
          param: {
            userId: this.registerInfo.id,
            password: this.registerInfo.password,
            tel: this.registerInfo.tel,
            userType: 0
          }
        }).then(res => {
          if (res.success) {
            this.$widget.toastSuccess('注册成功！请登陆')
            this.pageType = 0
          } else {
            this.$widget.toastWarn(res.message)
          }
        })
      }
    }
  }
</script>

<!--suppress CssInvalidPropertyValue -->
<style lang="scss" scoped>
  input {
    height: 80rpx;
    border-radius: 10rpx;
    background-color: rgba(234, 239, 229, 0.24);
  }

  .logo {
    /*position: relative;*/
    /*top: 86rpx;*/
    margin: 100rpx auto;
    width: 174rpx;
    height: 174rpx;
    background-color: white;
    border-radius: 50%;
    img {
      width: 162rpx;
      height: 162rpx;
    }
  }

  .transform {
    width: 120%;
    height: 120%;
    transition: all 15s;
  }

  .transform0 {
    width: 100%;
    height: 100%;
    transition: all 15s;
  }

  .fadeIn {
    position: absolute;
    transform: translateY(0);
    visibility: visible;
    opacity: 1;
    transition: all .6s;
  }

  .fadeOut {
    position: absolute;
    transform: translateY(30px);
    opacity: 0;
    visibility: hidden;
    transition: all .2s;
  }
</style>
