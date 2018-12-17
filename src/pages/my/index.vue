<template>
  <div class="">
    <img class="z-index-1 absolute block height100 width100" :src="background">
    <section class="relative top-60 paddingX36">
      <div @click="goSetting" class="logo flex-align-justify ">
        <img :src="userInfo.logo ? userInfo.logo : defaultLogo"/>
      </div>
      <div class="card-panel paddingX20 padding20X">
        <div class="margin-top60 flex-align-spacearound">
          <div class="text-align-center padding-bottom30">
            <i class="inline-block icon-personal2-fill font-size20 color-theme"></i>
            <div class="color-999 margin-top20">{{userInfo.id}}</div>
          </div>
          <div class="text-align-center">
            <div class="font-size18 color-theme">{{userInfo.name}}</div>
            <i class="icon-male margin-top16 font-size10 color-999"></i>
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
        <!--<setting-cell :icon="'icon-clock'" :title="'就诊历史'" :border="true"/>-->
        <!--<setting-cell @click.native="goSetting" :icon="'icon-edit'" :title="'编辑个人信息'" :border="true"/>-->
        <!--<setting-cell :icon="'icon-feedback'" :title="'意见反馈'" :border="false"/>-->
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
    data() {
      return {
        background,
        defaultLogo,
        userInfo: {
          name: 'Alex',
          logo: '',
          id: '5150510116',
          tel: '15869106432'
        },
        cellConfig: [
          {
            icon: 'icon-clock',
            title: '就诊历史',
            border: true
          },
          {
            icon: 'icon-edit',
            title: '编辑个人信息',
            border: true
          },
          {
            icon: 'icon-feedback',
            title: '意见反馈',
            border: false
          }
        ]
      }
    },
    methods: {
      routerPush(index) {
        if (index === 0) {
          this.$router.push({path: '/pages/my/user_setting'})
        }
        if (index === 1) {
          this.$router.push({path: '/pages/my/user_setting'})
        }
        if (index === 2) {
          this.$router.push({path: '/pages/my/user_setting'})
        }
      }
    }
  }
</script>

<!--suppress CssInvalidPropertyValue -->
<style lang="scss" scoped>
  .logo {
    position: relative;
    top: 86rpx;
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
</style>
