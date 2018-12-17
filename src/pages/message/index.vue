<template>
  <div class="padding-top20 hidden">
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

  export default {
    components: {
      chatCell
    },
    name: "消息",
    data() {
      return {
        chatList: [
          {
            doctor: '古力娜扎',
            patient: 'Alex',
            status: '问诊中', //0 待接诊,1问诊中,2已完成
            complain: '脑壳疼',
            chatInfo: {
              user: 'Alex',
              message: '你好',
              time: '12:20'
            }
          },
          {
            doctor: 'WEQ',
            patient: '1232',
            complain: '脑壳疼',
            chatInfo: {
              user: 'Alex',
              message: '你好',
              time: '12:20'
            }
          }
        ],
      }
    },
    methods: {
      goRoom(item) {
        console.log(item)
        this.$router.push({path:'/pages/message/chat_room'})
      },
      onDelete(i) {
        console.log(i)
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
