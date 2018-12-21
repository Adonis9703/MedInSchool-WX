const homeRoutes = [
  {
    path: 'pages/login',
    name: 'login',
    config: {
      navigationBarTitleText: '浙科医务室',
      navigationBarBackgroundColor: '#32AE57',
      navigationBarTextStyle: 'white',
      disableScroll: true
    }
  },
  {
    // path: 'pages/home/select_doctor',
    // path: 'pages/home/fill_info',
    // path: 'pages/my/history',
    path: 'pages/home',
    name: 'home',
    config: {
      navigationBarTitleText: '主页',
      enablePullDownRefresh: true,
      usingComponents: {
        'van-toast': '/static/vant/toast/index',
        'van-popup': '/static/vant/popup/index',
      }
    }
  },
  {
    path: 'pages/home/select_doctor',
    name: 'select_doctor',
    config: {
      navigationBarTitleText: '选择医生',
      enablePullDownRefresh: true,
    }
  },
  {
    // path: 'pages/home',
    path: 'pages/home/fill_info',
    name: 'fill_info',
    config: {
      navigationBarTitleText: '病情描述'
    }
  },
  {
    path: 'pages/message',
    name: 'message',
    config: {
      navigationBarTitleText: '消息',
      enablePullDownRefresh: true,
      usingComponents: {
        'van-toast': '/static/vant/toast/index',
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
      disableScroll: true
    }
  },
  {
    path: 'pages/my/user_setting',
    name: 'user_setting',
    config: {
      navigationBarTitleText: '设置',
    }
  },
  {
    path: 'pages/message/chat_room',
    name: 'chat_room',
    config: {
      navigationBarTitleText: '问诊中',
      usingComponents: {
        'van-toast': '/static/vant/toast/index',
        'van-popup': '/static/vant/popup/index',
      }
    }
  },
  {
    path: 'pages/my/rp',
    name: 'rp',
    config: {
      navigationBarTitleText: '处方详情'
    }
  },
  {
    // path: 'pages/home',
    path: 'pages/my/history',
    name: 'history',
    config: {
      enablePullDownRefresh: true,
      navigationBarTitleText: '就诊历史'
    }
  }
]

module.exports = [...homeRoutes]
