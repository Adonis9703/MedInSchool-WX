<template>
  <div class="padding-top40 color-666 paddingX36">
    <div class="card-panel shadow padding26X paddingX26" style="margin-bottom: 40rpx">
      <div class="logo flex-align-justify">
        <img :src="logo"/>
      </div>
      <div class="flex-align">
        <img :src="zust" class="zust margin-right20">
        <span class=" font-size4">个人信息</span>
      </div>
      <section class="paddingX20 font-size2">
        <div class="flex-align margin20X">
          <span class="title">性别</span>
          <div class="btn-light margin-right26">♂</div>
          <div class="btn-dark">♀</div>
        </div>
        <div class="flex-align margin20X">
          <span class="title" >姓名</span>
          <input v-model="userInfo.name"/>
        </div>
        <div class="flex-align margin20X">
          <span class="title" >学号</span>
          <input v-model="userInfo.id"/>
        </div>
        <div class="flex-align margin20X">
          <span class="title">手机号</span>
          <input  v-model="userInfo.tel"/>
        </div>
      </section>
    </div>
    <div class="card-panel shadow paddingX26 padding26X ">
      <div class="flex-align">
        <i class="theicon-homeinsurancepay  margin-right16"></i>
        <span class=" font-size4">就诊备注</span>
        <span class="color-999 relative top2 left10">完善信息，有助于医生精确诊断</span>
      </div>
      <section class="paddingX20 font-size2">
        <div class="flex-align margin20X">
          <span class="title80">血型</span>
          <div class="btn-light margin-right26">A</div>
          <div class="btn-dark margin-right26">B</div>
          <div class="btn-dark margin-right26">O</div>
          <div class="btn-dark margin-right26" style="padding: 6rpx 18rpx">AB</div>
          <div class="btn-dark" style="padding: 6rpx 18rpx">未知</div>
        </div>
        <div class="flex-align margin20X">
          <span class="title" >年龄</span>
          <input v-model="userInfo.age"/>
        </div>
        <div class="flex-align margin20X">
          <span class="title" >过敏</span>
          <input v-model="userInfo.allergy"/>
        </div>
        <div class="flex-align margin20X">
          <span class="title">其他</span>
          <input  v-model="userInfo.others"/>
        </div>
      </section>
    </div>
    <div class="btn-primary font-size4" style="margin-top: 40rpx">保 存 修 改</div>
  </div>
</template>

<script>
  import zust from '~/logo/logo_zust.png'
  import logo from '~/default/user_heading.png'
  export default {
    name: "user_setting",
    data() {
      return {
        zust,
        logo,
        userInfo: {
          name: 'Alex',
          sex: '男',
          id: '5150510116',
          tel: '15869106432',
          bloodType: 'A',
          age: '21',
          allergy: '傻子过敏',
          others: '暂无'
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .zust {
    height: 30rpx;
    width: 80rpx;
    display: inline-block;
  }

  input {
    display: inline-block;
    background-color: #f5f5f5;
    border-radius: 10rpx;
    padding-left: 20rpx;
    color: #666666;
  }

  .title {
    min-width: 120rpx;
    display: inline-block;
  }
  .title80 {
    min-width: 80rpx;
    display: inline-block;
  }
  .logo {
    float: right;
    margin: 0 auto;
    width: 172rpx;
    height: 172rpx;
    background-color: white;
    border-radius: 85rpx;
    img {
      width: 162rpx;
      height: 162rpx;
    }
  }

  .btn-light {
    display: inline-block;
    background-color: #32AE57;
    color: white;
    border-radius: 10rpx;
    padding: 6rpx 26rpx;
  }

  .btn-dark {
    display: inline-block;
    background-color: #f5f5f5;
    color: #32AE57;
    border-radius: 10rpx;
    padding: 6rpx 26rpx;
  }

</style>
