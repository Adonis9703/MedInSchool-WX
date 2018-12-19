<template>
  <div class="height100">
    <img @click="isTransition= !isTransition" :src="back" class="absolute z-index-1" :class="{'transform':!isTransition, 'transform0': isTransition}">
    <main>
      <section class="flex-justify">
        <div class="logo flex-align-justify ">
          <img :src="logo"/>
        </div>
      </section>
      <div class="color-white text-align-center font-size6"  style="padding: 0 160rpx">
        <input v-model="loginInfo.id" type="number" :class="{'bold': loginInfo.id !==''}" placeholder="学号"/>
        <input v-model="loginInfo.password" placeholder="密码" type="password" class="margin-top20"/>
        <div class="margin-top40 bold" @click="doLogin">登录</div>
      </div>
      <section class="flex-align-spacebetween paddingX100 color-ddd margin-top100">
        <div>学号注册</div>
        <div>忘记密码</div>
      </section>
    </main>
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
        pageType: 0, //0登录 //1注册 //2忘记密码
        isTransition: false,
        loginInfo: {
          id:'',
          password:''
        }
      }
    },
    onShow() {
      this.isTransition = !this.isTransition
    },
    methods: {
      doLogin() {
        // this.isTransition = !this.isTransition
        // this.$router.push({path: '/pages/home', isTab: true})
      }
    }
  }
</script>

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
</style>
