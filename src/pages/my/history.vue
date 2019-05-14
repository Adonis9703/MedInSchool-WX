<template>
  <main class="paddingX20 padding24X">
    <div v-if="historyList.length == 0" class="text-align-center margin-top60">
      <img :src="nodata" style="width: 286rpx; height: 216rpx;">
      <div class="margin-top20 color-999">暂无问诊历史</div>
    </div>
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
        <div class="color-theme flex-align" @click="goRp(item)">
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
  import nodata from '~/default/default_nodata.png'
  export default {
    name: "history",
    onLoad() {
      Object.assign(this, this.$options.data())
    },
    data() {
      return {
        doctor,
        patient,
        nodata,
        historyList: []
      }
    },
    mounted() {
      this.getHistory()
    },
    methods: {
      goRp(item) {
        this.$router.push({path: '/pages/my/rp', query: {chat: JSON.stringify(item)}})
      },
      getHistory() {
        this.$post({
          url: this.$api.getChatList,
          param: {
            patientId: this.$store.state.userInfo.userId,
            chatStatus: 2
          }
        }).then(res => {
          this.historyList = res.data
        })
      }
    }
  }
</script>

<style scoped>

</style>
