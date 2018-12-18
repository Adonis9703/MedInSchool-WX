const homeRoutes = [
  {
    // path: 'pages/my/user_setting',
    // path: 'pages/message',
    // path: 'pages/message/chat_room',
    path: 'pages/home',
    name: 'home',
    config: {
      navigationBarTitleText: '主页',
      // enablePullDownRefresh: true,
      usingComponents: {
        'van-toast': '/static/vant/toast/index',
        'van-button': '/static/vant/button/index',
        'van-popup': '/static/vant/popup/index',
      }
    }
  },
  {
    // path: 'pages/home',
    path: 'pages/message',
    name: 'message',
    config: {
      navigationBarTitleText: '消息',
      enablePullDownRefresh: true,
      usingComponents: {
        'van-toast': '/static/vant/toast/index',
        'van-button': '/static/vant/button/index',
      }
    }
  },
  {
    path: 'pages/my',
    name: 'my',
    config: {
      navigationBarTitleText: '我的',
      navigationBarBackgroundColor: '#32AE57',
      navigationBarTextStyle: 'white',
    }
  },
  {
    // path: 'pages/home',
    path: 'pages/my/user_setting',
    name: 'user_setting',
    config: {
      navigationBarTitleText: '设置',
    }
  },
  {
    // path: 'pages/home',
    path: 'pages/message/chat_room',
    name: 'chat_room',
    config: {
      navigationBarTitleText: '问诊中',
      usingComponents: {
        'van-toast': '/static/vant/toast/index',
        'van-popup': '/static/vant/popup/index',
      }
    }
  }
]

module.exports = [...homeRoutes]
