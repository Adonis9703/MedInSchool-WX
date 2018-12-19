<template>
  <div>就诊历史</div>
</template>

<script>
  export default {
    name: "history",
    data() {
      return {
        historyList: [
          {
            doctorName: '医生',
            chatId: '1123',
            rpId: '1234567',
            chatTime: '2018-12-12',
            diagnosis:'吃饱了撑的',
            complain: '脑壳疼'
          }
        ]
      }
    }
  }
</script>

<style scoped>

</style>
