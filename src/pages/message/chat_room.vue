<template>
  <div>
    <header class="bgcolor-white fixed width100 padding-bottom20 paddingX20 shadow z-index1">
      <section class="flex-align">
        <img :src="doctor" class="block" style="width: 110rpx;height: 110rpx"/>
        <div class="margin-left20">
          <title class="flex-align">
            <div class="color-333 font-size6 bold">{{doctorInfo.name}}</div>
            <div class="color-666 margin-left20">{{doctorInfo.department}}</div>
            <div class="splitter"></div>
            <div class="color-666">{{doctorInfo.title}}</div>
          </title>
          <div class="color-666 margin-top20" @click.stop="showDetail = !showDetail">
            问诊编号：{{chatInfo.chatId}}
            <i class="icon-unfold margin-left20 font-size-2" :class="{'rotate180' : showDetail, 'rotate0': !showDetail}"></i>
          </div>
        </div>
      </section>
    </header>
    <main style="padding-bottom: 130rpx">
      <div class="detail" :class="{'showDetail': showDetail, 'hiddenDetail': !showDetail}">
        <div>主诉：{{chatInfo.complain}}</div>
          <!--<img :src="doctor" class="block" style="width: 110rpx;height: 110rpx">-->
      </div>
      <div style="height: 130rpx;width: 2rpx"></div>
        <chat-pop v-for="(item, index) of chatInfo.chatList" :key="index" :content="item"></chat-pop>
      <div style="clear: both;"></div>
    </main>
    <footer class="fixed bottom0 width100 shadow">
      <div class="bgcolor-white flex-align padding20X paddingX20">
        <input confirm-type="send"/>
      </div>
    </footer>
  </div>
</template>

<script>
  import doctor from '~/default/default_doctorhead.png'
  import patient from '~/default/user_heading.png'
  import chatPop from '@/components/chat_pop'
  export default {
    components: {
      chatPop
    },
    name: "chat_room",
    data() {
      return {
        doctor,
        patient,
        showDetail: false,
        chatId: null,
        doctorInfo: {
          photo: '',
          name: '医生',
          title: '医师',
          department: '全科',
        },
        //todo 进入页面时通过接口查询聊天记录并显示，实时聊天时不请求，只通过socket连接
        // 存到缓存中
        chatInfo: {
          chatId: '20181108140001120423',
          complain: '脑壳疼',
          photos: [],
          status: '1',
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
              message: '吃了吗吃了吃了吗吃了吗吃了吃了吗吃了吗吃了吃了吗吃了吗吃了吃了吗吃了吗吃了吃了吗吃了吗吃了吗吃了吗吃了吗吃了吗吃了吗吃了吗'
            },
            {
              originUserId: '1',
              originUserName: '来源',
              targetUserId: '2',
              targetUserName: '目标',
              originUserType: '1', //0 医生，1 患者
              time: '10:27',//todo 2018-12-18 10:27 年月日做剪切
              message: '吃了吃了吗吃了吗吃了吗吃了吗吃了吗吃了吗吗吃了吗'
            },
            {
              originUserId: '1',
              originUserName: '来源',
              targetUserId: '2',
              targetUserName: '目标',
              originUserType: '0', //0 医生，1 患者
              time: '10:27',
              message: '吃了吗吃了吗吃了吃了吗吃了吗吃了吃了吗吃了吗吃了吃了吗吃了吗吃了吃了吗吃了吗吃了吃了吗吃了吗吃了吃了吗吃了吗吃了吗吃了吗吃了吗吃了吗吃了吗吃了吗吃了吗吃了吗'
            }, {
              originUserId: '1',
              originUserName: '来源',
              targetUserId: '2',
              targetUserName: '目标',
              originUserType: '1', //0 医生，1 患者
              time: '10:27',
              message: '吃了吗吃了吗吃了吗吃了吗吃了吗吃了吗吃了吗吃了吗吃了吗吃了吗'
            },

          ]
        }
      }
    },
    onShow() {
      // this.chatId = this.$route.query.chatId
      // console.log(this.chatInfo)
    }
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
    width: 560rpx;
    display: inline-block;
    background-color: #f5f5f5;
    border-radius: 8rpx;
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

</style>
