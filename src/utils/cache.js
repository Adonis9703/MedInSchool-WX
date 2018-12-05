export const cache = {
  set(key, data) {
    wx.setStorageSync(key, data)
  },
  get(key) {
    return wx.getStorageSync(key)
  },
  remove(key) {
    wx.removeStorageSync(key)
  }
}

//todo base64 加密 key,data
