<template>
  <div class="">
    <img class="z-index-1 absolute block height100 width100" :src="background">
    <section class="relative top-60 paddingX36">
      <div class="logo flex-align-justify ">
        <img :src="defaultLogo"/>
      </div>
      <div class="card-panel paddingX20 padding20X">
        <div class="margin-top60 flex-align-spacearound">
          <div class="text-align-center padding-bottom30">
            <i class="inline-block icon-personal2-fill font-size20 color-theme"></i>
            <div class="color-999 margin-top20">{{userInfo.userId}}</div>
          </div>
          <div class="text-align-center">
            <div class="font-size18 color-theme">{{userInfo.name}}</div>
            <i class="margin-top16 font-size10 color-999"
               :class="{'icon-male': userInfo.sex==='男', 'icon-female': userInfo.sex==='女'}"></i>
          </div>
          <div class="text-align-center padding-bottom30">
            <i class="inline-block icon-phone-fill font-size20 color-theme"></i>
            <div class="color-999 margin-top20">{{userInfo.tel}}</div>
          </div>
        </div>
      </div>
      <div class="card-panel relative top40 color-666 paddingX20">
        <div class="flex-baseline-spacebetween paddingX20"
             v-for="(item, index) of cellConfig" :key="index"
             @click="routerPush(index)"
             :class="{'border-bottom1' : item.border}">
          <div class="flex-align margin28X ">
            <i :class="[item.icon, 'font-size10', 'margin-right20']"></i>
            <span class="font-size6"> {{item.title}} </span>
          </div>
          <i class="inline-block icon-enter"></i>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import background from '~/back/bg_person.jpg'
  import defaultLogo from '~/default/user_heading.png'
  import settingCell from "@/components/setting_cell";

  export default {
    name: "index",
    components: {settingCell},
    onLoad() {
      Object.assign(this, this.$options.data())
    },
    onShow() {
      this.userInfo = this.$store.state.userInfo
    },
    data() {
      return {
        background,
        defaultLogo,
        userInfo: {},
        cellConfig: [
          {
            icon: 'icon-clock',
            title: '已完成的问诊',
            border: true
          },
          {
            icon: 'icon-edit',
            title: '编辑个人信息',
            border: true
          },
          {
            icon: 'icon-feedback',
            title: '退出登录',
            border: false
          }
        ]
      }
    },
    methods: {
      routerPush(index) {
        if (index === 0) {
          this.$router.push({path: '/pages/my/history'})
        }
        if (index === 1) {
          this.$router.push({path: '/pages/my/user_setting'})
        }
        if (index === 2) {
          this.$post({
            url: this.$api.getChatList,
            param: {
              patientId: this.$store.state.userInfo.userId,
              chatStatus: 1
            }
          }).then(res => {
            let count = 0
            res.data.forEach(item => {
              if (item.chatStatus == 1) {
                count++
              }
            })
            if (count > 0) {
              this.$widget.confirm(`还有 ${count} 个问诊正在进行中，确定退出吗？`, () => {
                this.$store.commit('setUserInfo', null)
                this.$store.commit('setToken', null)
                this.$router.push({path: '/pages/login', reLaunch: true})
              })
            }
          })
        }
      },
    }
  }
</script>

<!--suprpess CssInvalidrpopertyValue -->
<style lang="scss" scoped>
  .logo {
    position: relative;
    top: 86rpx;
    margin: 0 auto;
    width: 172rpx;
    height: 172rpx;
    background-color: white;
    border-radius: 50%;
    img {
      width: 162rpx;
      height: 162rpx;
    }
  }
</style>
