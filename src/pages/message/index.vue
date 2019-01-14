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
    onLoad() {
      Object.assign(this, this.$options.data())
    },
    onShow() {
      this.getMessage()
    },
    data() {
      return {
        chatList: [],
      }
    },
    methods: {
      getMessage() {
        this.$post({
          url: this.$api.getChatList,
          param: {
            patientId: this.$store.state.userInfo.userId
          }
        }).then(res=> {
          this.chatList = res.data
          console.log(res.data)
        })
      },
      goRoom(item) {
        this.$router.push({path:'/pages/message/chat_room', query:{chatId: item.chatId, doctorId: item.doctorId}})
      },
      onDelete(i) {
        console.log(i)
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
