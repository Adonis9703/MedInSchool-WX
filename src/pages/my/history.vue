<template>
  <main class="paddingX20 padding24X">
    <div class="card-panel shadow padding26X paddingX26" style="margin-bottom: 20rpx"
         v-for="(item, index) of historyList" :key="index">
      <section class="flex-align-spacebetween">
        <div class="flex-align">
          <img :src="patient" class="block" style="height: 50rpx;width: 50rpx;"/>
          <div class="color-theme font-size4 margin-left10">主诉</div>
        </div>
        <div class="color-999">{{item.chatTime}}</div>
      </section>
      <section class="padding-left60 color-666 margin-top6">
        {{item.complain}}
      </section>
      <div class="flex-align margin-top12">
        <img :src="doctor" class="block" style="height: 50rpx;width: 50rpx;"/>
        <div class="color-theme font-size4 margin-left10">诊断结果</div>
      </div>
      <section class="padding-left60 color-666 margin6X padding-bottom20 border-bottom1">
        {{item.diagnosis}}
      </section>
      <div class="flex-align-spacebetween margin-top16">
        <div class="font-size-2 color-999">问诊编号：{{item.chatId}}</div>
        <div class="color-theme flex-align" @click="goRp">
          <i class="icon-template font-size4"></i>
          &nbsp;查看处方
        </div>
      </div>
    </div>
  </main>
</template>

<script>
  import doctor from '~/default/default_doctorhead.png'
  import patient from '~/default/user_heading.png'

  export default {
    name: "history",
    onLoad() {
      Object.assign(this, this.$options.data())
    },
    data() {
      return {
        doctor,
        patient,
        historyList: [
          {
            doctorName: '医生',
            chatId: '1123',
            rpId: '1234567',
            chatTime: '2018-12-12',
            diagnosis: '吃饱了撑的',
            complain: '脑壳疼脑壳疼脑脑壳疼脑壳疼脑壳疼脑壳疼壳疼脑壳疼脑壳疼'
          },
          {
            doctorName: '医生',
            chatId: '201811081270001160116',
            rpId: '1234567',
            chatTime: '2018-12-12',
            diagnosis: '吃饱了撑的',
            complain: '脑壳疼脑壳疼脑脑壳疼脑壳疼脑壳疼脑壳疼壳疼脑壳疼脑壳疼'
          },
          {
            doctorName: '医生',
            chatId: '1123',
            rpId: '1234567',
            chatTime: '2018-12-12',
            diagnosis: '吃饱了撑的',
            complain: '脑壳疼脑壳疼脑脑壳疼脑壳疼脑壳疼脑壳疼壳疼脑壳疼脑壳疼'
          },
          {
            doctorName: '医生',
            chatId: '1123',
            rpId: '1234567',
            chatTime: '2018-12-12',
            diagnosis: '吃饱了撑的',
            complain: '脑壳疼脑壳疼脑脑壳疼脑壳疼脑壳疼脑壳疼壳疼脑壳疼脑壳疼'
          }
        ]
      }
    },
    methods: {
      goRp() {
        this.$router.push({path: '/pages/my/rp'})
      }
    }
  }
</script>

<style scoped>

</style>
