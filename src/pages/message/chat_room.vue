<template>
  <div>
    <header class="bgcolor-white fixed flex-align width100 padding-bottom20 paddingX20 shadow z-index1">
      <img :src="doctor" class="block" style="width: 110rpx;height: 110rpx"/>
      <div class="margin-left20" style="width: 75%">
        <title class="flex-align-spacebetween">
          <div class="flex-align">
            <div class="color-333 font-size6 bold">{{doctorInfo.name}}</div>
            <div class="color-666 margin-left20">{{doctorInfo.department}} · {{doctorInfo.title}}</div>
          </div>
          <div class="end-btn font-size-2" @click="showConfirm = !showConfirm">结束问诊</div>
        </title>
        <div class="color-666 margin-top20" @click.stop="showDetail = !showDetail">
          问诊编号：{{chatInfo.chatId}}
          <i class="icon-unfold margin-left20 font-size-2"
             :class="{'rotate180' : showDetail, 'rotate0': !showDetail}"></i>
        </div>
      </div>
    </header>
    <main style="padding-bottom: 130rpx">
      <div class="detail" :class="{'showDetail': showDetail, 'hiddenDetail': !showDetail}">
        <div>主诉：{{chatInfo.complain}}</div>
        <!--<img :src="doctor" class="block" style="width: 110rpx;height: 110rpx">-->
      </div>
      <div style="height: 150rpx;width: 2rpx"></div>
      <div v-if="chatInfo.chatStatus==1" class="width100 text-align-center color-999 padding-top20">
        问诊已经发起
        <div class="color-theme font-size4 margin-top10">请等待医生接诊！</div>
      </div>
      <chat-pop v-for="(item, index) of msgList" :key="index" :content="item"></chat-pop>
      <div style="clear: both;"></div>
      <div class="paddingX40" @click="goRp">
        <div class="text-align-center padding20X color-999">医生已经开具处方</div>
        <!--<div class="rp">-->
        <!--<title class="flex-baseline-spacebetween paddingX26 padding-top26">-->
        <!--<div class="flex-baseline">-->
        <!--<div class="font-size4 margin-right20">{{chatInfo.patientName}}</div>-->
        <!--<div class="color-666">{{chatInfo.patientSex}} {{chatInfo.patientAge}}</div>-->
        <!--</div>-->
        <!--<div class="color-666">{{chatInfo.rpTime}}</div>-->
        <!--</title>-->
        <!--<div class="color-999 margin16X paddingX26">诊断结果：{{chatInfo.diagnosis}}</div>-->
        <!--<div class="rp-detail" v-for="(item, index) of chatInfo.rp" :key="index">-->
        <!--<div class="flex-align-spacebetween color-333">-->
        <!--<div style="max-width: 500rpx;">{{item.name}}</div>-->
        <!--<div>{{item.amount}}{{item.amountUnit}}</div>-->
        <!--</div>-->
        <!--<div class=" margin-top16 color-666">-->
        <!--<i class="icon-tip-fill margin-right10 color-theme"></i>-->
        <!--<span>每次{{item.dosage}}{{item.dosageUnit}}</span>-->
        <!--<span>&ensp;{{item.method}} </span>-->
        <!--<span>{{item.timeState}}</span>-->
        <!--<span>&ensp;共{{item.day}}天</span>-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->
      </div>
    </main>
    <footer class="fixed bottom0 width100 shadow">
      <div class="bgcolor-white flex-align-spacebetween padding20X paddingX20">
        <input confirm-type="send"/>
        <i class="icon-image-fill color-999 font-size18"></i>
      </div>
    </footer>
    <van-popup :show="showConfirm" :overlay="true" close-on-click-overlay>
      <div class="paddingX40 padding40X">
        确定要结束问诊吗？
        <div @click="showConfirm = !showConfirm">
          确定
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
  import doctor from '~/default/default_doctorhead.png'
  import patient from '~/default/user_heading.png'
  import chatPop from '@/components/chat_pop'

  export default {
    components: {
      chatPop,
    },
    name: "chat_room",
    onLoad() {
      Object.assign(this, this.$options.data())
      setTimeout(() => {
        this.showDetail = false
      }, 1600)
    },
    onShow() {
      this.getDocInfo()
      this.getChatInfo()
      this.getMsgHistory()
      // this.chatId = this.$route.query.chatId
      // console.log(this.chatInfo)
    },
    data() {
      return {
        doctor,
        patient,
        showConfirm: false,
        showDetail: true,
        chatId: null,
        doctorInfo: {},
        msgList: [],
        //todo 进入页面时通过接口查询聊天记录并显示，实时聊天时不请求，只通过socket连接
        // 存到缓存中
        chatInfo: {
          chatId: '20181108140001120423',
          doctorId: '123',
          doctorName: '医生',
          patientId: '1234',
          patientName: '患者',
          patientAge: '16',
          patientSex: '男',
          complain: '脑壳疼',
          photos: [],
          status: '1',
          rpId: '123123',
          rpTime: '2018-01-01',
          diagnosis: '吃饱了撑的',
          rp: [
            {
              name: '头孢克圬颗啊啊啊啊啊啊啊啊啊啊啊啊啊啊粒 50mg*6袋',
              amount: '2',
              amountUnit: '盒',
              dosage: '30',
              dosageUnit: '毫克',
              timeState: '一天3次',
              day: '5',
              method: '口服',
              price: '2'
            },
            {
              name: '头孢克圬颗粒 50mg*6袋',
              amount: '2',
              amountUnit: '盒',
              dosage: '30',
              dosageUnit: '毫克',
              timeState: '一天3次',
              day: '5',
              method: '口服'
            },
            {
              name: '头孢克圬颗粒 50mg*6袋',
              amount: '2',
              amountUnit: '盒',
              dosage: '30',
              dosageUnit: '毫克',
              timeState: '一天三次',
              day: '5',
              method: '口服'
            },
          ],
          chatList: [
            {
              originUserId: '1',
              originUserName: '来源',
              targetUserId: '2',
              targetUserName: '目标',
              originUserType: '1', //0 医生，1 患者
              time: '10:27',
              message: '吃了哦吃了哦'
            },
            {
              originUserId: '1',
              originUserName: '来源',
              targetUserId: '2',
              targetUserName: '目标',
              originUserType: '0', //0 医生，1 患者
              time: '10:27',
              message: '吃吗吃了吗吃了吃了吗吃了吗吃了吃了吗吃了吗吃了吗吃了吗吃了吗吃了吗吃了吗吃了吗吃了吗吃了吗'
            },
          ]
        },
      }
    },
    methods: {
      getDocInfo() {
        this.$post({
          url: this.$api.getUserInfoById,
          param: {
            userId: this.$route.query.doctorId
          }
        }).then(res => {
          this.doctorInfo = res.data
        })
      },
      getChatInfo() {
        this.$post({
          url: this.$api.getChatInfoByChatId,
          param: {
            chatId: this.$route.query.chatId
          }
        }).then(res => {
          this.chatInfo = res.data
          console.log(res.data)
        })
      },
      getMsgHistory() {
        this.$post({
          url: this.$api.getMsgHistory,
          param: {
            chatId: this.$route.query.chatId
          }
        }).then(res => {
          this.msgList = res.data
        })
      },
      goRp() {
        console.log(123123)
        this.$router.push({path: '/pages/my/rp'})
      }
    },
  }
</script>
<style lang="scss" scoped>
  .splitter {
    margin: 0 12rpx;
    background-color: #999999;
    height: 26rpx;
    width: 2rpx;
  }

  input {
    width: 610rpx;
    display: inline-block;
    background-color: #f5f5f5;
    border-radius: 10rpx;
    padding-left: 20rpx;
    height: 60rpx;
    color: #666666;
  }

  .detail {
    position: fixed;
    opacity: 0;
    width: 100%;
    background-color: white;
    padding: 20rpx;
    color: #666666;
  }

  .showDetail {
    z-index: 0;
    opacity: 1;
    transform: translateY(64px);
    transition: all .3s;
  }

  .hiddenDetail {
    z-index: 0;
    opacity: 0;
    transform: translateY(0px);
    transition: all .3s;
  }

  .end-btn {
    border-radius: 10rpx;
    padding: 6rpx 10rpx;
    background-color: red;
    color: white;
  }

  .rp {
    background-color: white;
    border: #CDCDCD solid 2rpx;
    border-radius: 4rpx;
  }

  .rp-detail {
    background-color: #fcfcfc;
    padding: 20rpx;
    border-bottom: #CDCDCD dashed 2rpx;
    &:last-child {
      border-bottom: none;
    }
  }
</style>
