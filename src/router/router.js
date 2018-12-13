const homeRoutes = [
  {
    path: 'pages/my',
    // path: 'pages/home',
    name: 'home',
    config: {
      navigationBarTitleText: '主页',
      enablePullDownRefresh: true,
      usingComponents: {
        'van-toast': '/static/vant/toast/index',
        'van-button': '/static/vant/button/index'
      }
    }
  },
  {
    path: 'pages/message',
    name: 'message',
    config: {
      navigationBarTitleText: '消息'
    }
  },
  {
    // path: 'pages/my',
    path: 'pages/home',
    name: 'my',
    config: {
      navigationBarTitleText: '我的',
      navigationBarBackgroundColor: '#32AE57',
      navigationBarTextStyle: 'white',
    }
  },
  {
    path: 'pages/home/test',
    name: 'test',
    config: {
      navigationBarTitleText: 'test'
    }
  }
]

module.exports = [...homeRoutes]
