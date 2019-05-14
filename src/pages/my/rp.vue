<template>
    <div class="paddingX20 padding20X">
      <div class="card-panel padding36X paddingX20">
        <header class="flex-align">
          <img :src="zust" class="block" style="height: 40rpx;width: 100rpx">
          <div class="margin-left96 font-size2 color-333 bold">浙科医务室 处方笺</div>
        </header>
        <section class="margin-top30 font-size-6 color-555">
          <div class=" border-bottom1 padding-bottom10">处方编号：{{rp.rpId}}</div>
          <div class="flex-align-spacebetween padding-top10 paddingX10">
            <div>姓名：{{chatInfo.patientName}}</div>
            <div>性别：{{chatInfo.patientSex}}</div>
            <div>年龄：{{chatInfo.patientAge}}</div>
          </div>
          <div class="flex-align-spacebetween padding-top10 paddingX10">
            <!--<div>科室：{{rp.doctor.department}}</div>-->
            <div>问诊编号：{{chatInfo.chatId}}</div>
          </div>
          <div class="padding10X paddingX10 border-bottom1">
            <div>诊断结果：{{rp.diagnosis || '暂无'}}</div>
          </div>
        </section>
        <main class="border-bottom1 padding-top20 padding-bottom60">
          <div class="font-size16 bold color-333" style="font-family: 'Sitka Display'">Rp.</div>
          <section class="color-555 font-size-5 paddingX20">
            <div class="flex-align border-bottom-dashed font-size-4 padding8X" v-for="(item,index) of medicineListTemp" :key="index">
              <div style="width: 250px">{{index+1}}. {{item.name}}</div>
              <div class="padding-left10">{{item.count}}</div>
              <div class="">{{item.unit}}</div>
              <div class="padding-left30">{{item.method}}</div>
              <div class="padding-left30">{{item.dosage}}</div>
              <div class="padding-left30">{{item.price}}元</div>
            </div>
          </section>
        </main>
        <!--<section class="flex-spacebetween font-size-5 margin-top20 paddingX20 color-555">-->
          <!--<div>药品费用：{{rp.medPrice}}元</div>-->
          <!--<div>问诊费用：{{rp.chatPrice}}元</div>-->
          <!--<div>其他费用：{{rp.otherPrice}}元</div>-->
        <!--</section>-->
        <footer class="flex-spacebetween paddingX20 padding40X font-size-4 bold">
          <!--<div>医生：{{doctorInfo.name}}</div>-->
          <div>合计：{{rp.medPrice + rp.chatPrice + rp.otherPrice}}元</div>
        </footer>
      </div>
      <section class="text-align-center color-theme margin-top40">
        可凭该处方至医务室配取药品
      </section>
    </div>
</template>

<script>
  import zust from '~/logo/logo_zust.png'

  export default {
    name: "rp",
    onLoad() {
      Object.assign(this, this.$options.data())
    },
    onShow() {
      this.chatInfo = JSON.parse(this.$route.query.chat)
      this.getRp()
    },
    data() {
      return {
        zust,
        chatInfo: null,
        rp: {},
        medicineListTemp:[]
      }
    },
    methods: {
      getRp() {
        this.$post({
          url: this.$api.getRpInfo,
          param: {
            chatId: this.chatInfo.chatId
          }
        }).then(res => {
          this.rp = res.data
          this.medicineListTemp = JSON.parse(this.rp.medicines)
          console.log(this.medicineListTemp)
          console.log('处方详情', res.data)
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .splitter {
    height: 2rpx;
  }
  .border-bottom1 {
    border-bottom: #999999 2rpx solid;
  }
  .border-bottom {
    padding-bottom: 16rpx;
    border-bottom: #555555 2rpx dashed;
  }
  .color-555 {
    color: #444 ;
  }
</style>
