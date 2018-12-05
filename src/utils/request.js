import store from '@/store/index'

export const setURL = (url, args) => {
  if (typeof url === 'undefined') {
    throw 'no url!'
  }
  if (!args) return url
  for (var i = 0; i < args.length; i++) {
    if (url.indexOf('{?}') < 0) {
      break
    }
    url = url.replace(/\{\?\}/, args[i] + '')
  }
  // 最后是否有/{?}
  if (url.lastIndexOf('/{?}') > -1) {
    url = url.substr(0, url.lastIndexOf('/{?}'))
  }
  return url
}

/**
 * option {
    isLoading: boolean true 菊花， false， 没有菊花（ 相当于无声请求）
    loadingText: 请稍等...
    url: '' //可以传apiurl中的key, 也可以传整个url
    param: 作为post数据传过去，json对象或者字符串, 如果是字符串那么可能是body形式传过去，
    requestParam: 接口名称中可能会有参数 []从数组中传过来,
    method: //默认POST,
    type: '默认x-www-form-urlencoded', 'json': 'application/json',
    token: 测试用的token
  }
 返回 Promise
 */

export const post = (option) => {
  let url = setURL(option.url, option.requestParam)
  let hasLoading = option.isLoading
  if (hasLoading) {
    wx.showLoading({
      title: option.loadingText ? option.loadingText : '处理中...',
      mask: true
    })
  }
  let data = option.param || {}
  let header = {'content-type': 'application/x-www-form-urlencoded'}
  if (option.type === 'json') {
    header['content-type'] = 'application/json'
  }
  if (store.state.token) {
    //todo token 储存方式 和 userInfo 一起或者单独存放
    header.token = store.state.token
  }
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      data: data,
      method: option.method ? option.method : 'POST',
      header: header,
      success: (res) => {
        if (hasLoading) {
          wx.hideLoading()
        }
        if (res.statusCode === 200) {
          resolve(res.data)
        } else {
          reject(res)
        }
      }
    })
  })
}
