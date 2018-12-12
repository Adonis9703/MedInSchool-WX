<template>
  <div>
    <img class="z-index-1 absolute block height100 width100" :src="background">
    <section class="relative top-60">
      <div class="logo flex-align-justify">
        <img :src="userInfo.logo ? userInfo.logo : defaultLogo"/>
      </div>
      <div class="card-panel">
        asdas
      </div>
      <div class="card-panel"></div>
    </section>
  </div>
</template>

<script>
  import background from '~/back/bg.png'
  import defaultLogo from '~/default/default_patient.png'

  export default {
    name: "index",
    data() {
      return {
        background,
        defaultLogo,
        userInfo: {
          logo: '',
          id: '5150510116',
          tel: '15869106432'
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
