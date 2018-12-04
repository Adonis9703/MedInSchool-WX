<script>
export default {
  created () {
    // 调用API从本地缓存中获取数据
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    console.log('app created and cache logs by setStorageSync')
    let socket = this.$socket('http://127.0.0.1:3000')
    socket.emit('send', {
      msg: '这里是客户端'
    })
    socket.on('get', data => {
      console.log(data)
    })
  }
}
</script>

<style>
</style>
