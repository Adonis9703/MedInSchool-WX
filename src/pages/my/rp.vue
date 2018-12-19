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
            <div>姓名：{{rp.patient.name}}</div>
            <div>性别：{{rp.patient.sex}}</div>
            <div>年龄：{{rp.patient.age}}</div>
          </div>
          <div class="flex-align-spacebetween padding-top10 paddingX10">
            <div>科室：{{rp.doctor.department}}</div>
            <div>问诊编号：{{rp.chatId}}</div>
          </div>
          <div class="padding10X paddingX10 border-bottom1">
            <div>诊断结果：{{rp.diagnosis}}</div>
          </div>
        </section>
        <main class="border-bottom1 padding-top20 padding-bottom60">
          <div class="font-size16 bold color-333" style="font-family: 'Sitka Display'">Rp.</div>
          <section class="color-555 font-size-5 paddingX20">
            <div v-for="(item, index) of rp.medicine" :key="index" :class="{'border-bottom':index+1 < rp.medicine.length}">
              <div class="flex-align-spacebetween bold margin-top16">
                <div style="width: 500rpx;">{{index+1}}. {{item.name}}</div>
                <div>{{'×'+item.amount+item.amountUnit}}</div>
                <div>{{item.price}}元</div>
              </div>
              <div class="margin-left32 margin-top10 font-size-6">
               用法用量：
                <span>每次{{item.dosage}}{{item.dosageUnit}}</span>
                <span>&ensp;{{item.method}}</span>
                <span>&ensp;{{item.timeState}}</span>
                <span>&ensp;共{{item.day}}天</span>
              </div>
            </div>
          </section>
        </main>
        <section class="flex-spacebetween font-size-5 margin-top20 paddingX20 color-555">
          <div>药品费用：{{rp.medPrice}}元</div>
          <div>问诊费用：{{rp.chatPrice}}元</div>
          <div>其他费用：{{rp.otherPrice}}元</div>
        </section>
        <footer class="flex-spacebetween paddingX20 padding40X font-size-4 bold">
          <div>医生：{{rp.doctor.name}}</div>
          <div>合计：{{rp.totalPrice}}元</div>
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
      data() {
          return {
            zust,
            //todo 处方中的药品列表内容 医生端选择药品后 在数据库以字符串拼接的方式储存，后端处理后返回给患者端
            rp: {
              rpId: '123123123',
              chatId: '2018121212312312312',
              diagnosis: '吃饱了撑的',
              medPrice:'60',
              chatPrice: '1',
              otherPrice: '0',
              totalPrice: '61',
              patient: {
                name: 'Alex',
                sex: '男',
                age: '21',
              },
              doctor: {
                name: '医生',
                department: '全科',
                title: '医师'
              },
              medicine: [
                {
                  name: '头孢克圬颗啊啊啊啊啊啊啊啊啊啊啊啊啊啊粒 50mg*6袋',
                  amount: '2',
                  amountUnit: '盒',
                  dosage: '30',
                  dosageUnit: '毫克',
                  timeState: '一天3次',
                  day:'5',
                  method: '口服',
                  price: '20',
                },
                {
                  name: '头孢克圬撒大颗粒 50mg*6袋',
                  amount: '2',
                  amountUnit: '盒',
                  dosage: '30',
                  dosageUnit: '毫克',
                  timeState: '一天3次',
                  day:'5',
                  method: '口服',
                  price: '20',
                },
                {
                  name: '头孢克圬颗阿斯达说啊说的粒 50mg*6袋',
                  amount: '2',
                  amountUnit: '盒',
                  dosage: '30',
                  dosageUnit: '毫克',
                  timeState: '一天三次',
                  day:'5',
                  method: '口服',
                  price: '20',
                },

              ]
            }
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
