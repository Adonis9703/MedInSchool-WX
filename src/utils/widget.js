import Toast from '../../static/vant/toast/toast'

export const widget = {
  toast (message, complete) {
    Toast({
      message: message,
      complete: complete || null
    })
    },
  toastWarn (message, complete) {
    Toast.fail({
      message: message,
      complete: complete || null
    })
    },
  toastSuccess (message, complete) {
    Toast.success({
      message: message,
      complete: complete || null
    })
    },
  alert (message, complete, title) {
    wx.showModal({
      title: title || '提示',
      showCancel: false,
      content: message,
      success: (res) => {
        if (res.confirm) {
          if (complete) {
            complete()
          }
        }
      }
    })
  },
  confirm (message, complete, title, buttonName, cancel) {
    var trueTitle, cancelTitle
    if (buttonName) {
      if (buttonName.length == 1) {
        trueTitle = buttonName[0]
      } else if (buttonName.length == 2) {
        trueTitle = buttonName[0]
        cancelTitle = buttonName[1]
      }
    }

    wx.showModal({
      title: title || '提示',
      content: message,
      confirmText: trueTitle || '确定',
      cancelTitle: cancelTitle || '取消',
      success: (res) => {
        if (res.confirm) {
          if (complete) {
            complete()
          }
        } else if (res.cancel) {
          if (cancel) {
            cancel()
          }
        }
      }
    })
  }
}
