import io from 'weapp.socket.io'

let wsStatus = false
let onSocket = null

export const connect = function (cb) {
  if (!onSocket) {
    onSocket = io('http://127.0.0.1:3000')
    onSocket.on('connect', function (res) {
      cb(true, onSocket)
      wsStatus = true
    })
    setTimeout(function () {
      if (!wsStatus) {
        cb(false, onSocket)
      }
    }, 10000)
  } else {
    cb(true, onSocket)
  }
}
