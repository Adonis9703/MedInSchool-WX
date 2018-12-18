<template>
  <div class="pop">
    <!--患者-->
    <div v-if="content.originUserType==='1'" class="margin-top30 flex-baseline float-right">
      <div class="color-gray padding-right20 font-size-4">{{content.time}}</div>
      <div class="msg bgcolor-theme color-white margin-right20 font-size4">
        {{content.message}}
      </div>
      <img :src="patient" class="block margin-right20" style="width: 90rpx;height: 90rpx;"/>
    </div>
    <!--医生-->
    <div v-else class="margin-top30 flex-baseline float-left">
      <img :src="doctor" class="block margin-left20" style="width: 90rpx;height: 90rpx;"/>
      <div class="msg bgcolor-white margin-left20 font-size4">
        {{content.message}}
      </div>
      <div class="color-gray padding-left20 font-size-4">{{content.time}}</div>
    </div>
  </div>
</template>

<script>
  import doctor from '~/default/default_doctorhead.png'
  import patient from '~/default/user_heading.png'

  export default {
    props: ['content'],
    name: "chat_pop",
    data() {
      return {
        doctor,
        patient
      }
    }
  }
</script>

<!--suppress CssInvalidPropertyValue -->
<style lang="scss" scoped>
  .pop {
    color: #666666;
    .msg {
      max-width: 388rpx;
      /*margin-right: 20rpx;*/
      /*background: white;*/
      padding: 26rpx 26rpx;
      border-radius: 8rpx;
    }
  }
</style>
