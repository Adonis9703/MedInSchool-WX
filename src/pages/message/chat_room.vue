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
    <main style="padding-bottom: 130rpx" id="pop-height">
      <div class="detail" :class="{'showDetail': showDetail, 'hiddenDetail': !showDetail}">
        <div>主诉：{{chatInfo.complain}}</div>
        <img v-for="(item, index) in chatInfo.complainImgs" :key="index" :src="baseUrl+item" class="inline-block" style="width: 110rpx;height: 110rpx">
      </div>
      <div style="height: 150rpx;width: 2rpx"></div>
      <div v-if="chatInfo.chatStatus==0" class="width100 text-align-center paddingX60 padding-top70 border-box">
        <div class="border-top4">

        </div>
      </div>
      <chat-pop v-for="(item, index) of msgList" :key="index" :content="item"></chat-pop>
      <div style="clear: both;"></div>
      <div class="paddingX40" @click="goRp">
        <!--<div class="text-align-center padding20X color-999">医生已经开具处方</div>-->
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
        <input confirm-type="send" v-model.trim="text" :disabled="chatInfo.chatStatus !=1"/>
        <i @click="socketSend" class="icon-edit color-999 font-size18"></i>
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
    <van-toast id="van-toast"/>
  </div>
</template>

<script>
  import doctor from '~/default/default_doctorhead.png'
  import patient from '~/default/user_heading.png'
  import chatPop from '@/components/chat_pop'
  // import {connect} from '@/utils/socket'

  var socket = null

  export default {
    components: {
      chatPop,
    },
    name: "chat_room",
    onLoad() {
      Object.assign(this, this.$options.data())
      setTimeout(() => {
        this.showDetail = false
        this.scroll()
      }, 1600)
      socket = this.$socket(this.$api.base)
      socket.on('service2pat', data => {
        console.log(data)
        this.msgList.push(data)
      })
      socket.on('historySaved', res => {
        this.text = ''
      })
      socket.on('refreshChatStatus', () => {
        console.log('刷新就诊状态')
        this.getChatInfo()
        if (this.chatInfo.chatStatus == 0) {
          console.log('待接诊')
        } else if (this.chatInfo.chatStatus == 1) {
          this.$widget.toastSuccess('医生已接诊')
          console.log('问诊中')
        } else {
          console.log('问诊已结束')
        }
      })
    },
    onShow() {
      this.getDocInfo()
      this.getChatInfo()
      this.getMsgHistory()
      socket.emit('refresh', this.$store.state.userInfo)
      if (this.$route.query.createNew){
        console.log(`新增问诊`)
        socket.emit('createChat', {
          doctorId: this.$route.query.doctorId
        })
      }
      // this.chatId = this.$route.query.chatId
      // console.log(this.chatInfo)
    },
    onUnload() {
      if (socket) {
        socket.disconnect()
      }
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
        text: '',
        chatInfo: {},
        baseUrl: this.$api.base
      }
    },
    methods: {
      scroll() {
        if (this.msgList.length !== 0) {
          console.log(`滚动`)
          wx.createSelectorQuery().select('#pop-height').boundingClientRect(function (rect) {
            // 使页面滚动到底部
            wx.pageScrollTo({
              scrollTop: rect.bottom,
              duration: 500
            })
          }).exec()
        }
      },
      socketSend() {
        if (this.chatInfo.chatStatus == 0) {
          this.$widget.toast('请先等待医生接诊哦')
          return
        }
        if (this.text === '') {
          this.$widget.toast('消息不能为空哦')
          return
        }
        let data = {
          chatId: this.$route.query.chatId,
          senderType: '0',
          senderId: this.$store.state.userInfo.userId,
          receiverId: this.$route.query.doctorId,
          msgText: this.text,
          msgTime: new Date().toTimeString().substring(0, 5),
        }
        this.msgList.push(data)
        socket.emit('pat2service', data)
      },
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
          this.chatInfo.complainImgs = this.chatInfo.complainImgs.split(',')
          console.log('主诉图片', this.chatInfo.complainImgs)
          // if (res.data.chatStatus == 0) {
          //
          // } else if (res.data.chatStatus == 1) {
          //
          // } else {
          //
          // }
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
        this.$router.push({path: '/pages/my/rp'})
      }
    },
  }
</script>
<style lang="scss" scoped>
  .border-top4 {
    border-top: #32ae57 solid 6rpx;
  }
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
