<template>
  <div class="padding-top20 hidden">
    <div v-if="chatList.length == 0" class="text-align-center margin-top60">
      <img :src="nodata" style="width: 286rpx; height: 216rpx;">
      <div class="margin-top20 color-999">暂无问诊消息</div>
    </div>
    <chat-cell
      v-for="(item, index) of chatList"
      :key="index" :chat="item"
      @slide="onDelete(index)"
      @push="goRoom(item)"
    ></chat-cell>
  </div>
</template>

<script>
  import chatCell from '@/components/chat_cell'
  import nodata from '~/default/default_nodata.png'

  export default {
    components: {
      chatCell
    },
    name: "消息",
    onLoad() {
      Object.assign(this, this.$options.data())
    },
    onShow() {
      wx.startPullDownRefresh()

    },
    onPullDownRefresh() {
      this.getMessage()
    },
    data() {
      return {
        nodata,
        chatList: [],
      }
    },
    methods: {
      getMessage() {
        this.$post({
          url: this.$api.getChatList,
          param: {
            patientId: this.$store.state.userInfo.userId,
            chatStatus: ''
          }
        }).then(res => {
          wx.stopPullDownRefresh()
          this.chatList = res.data.reverse()
        })
      },
      goRoom(item) {
        this.$router.push({path: '/pages/message/chat_room', query: {chatId: item.chatId, doctorId: item.doctorId}})
      },
      onDelete(i) {
        console.log(i)
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
