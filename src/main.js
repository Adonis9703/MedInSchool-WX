import Vue from 'vue'
import App from './App'
import MpvueRouterPatch from 'mpvue-router-patch'
import store from '@/store/index'
import {cache, post, api, widget, date} from "./utils"
import '@/assets/sass/sass_index.scss'
import '@/assets/iconfont/iconfont.css'
import SocketIo from 'weapp.socket.io'

Vue.config.productionTip = false

Vue.prototype.$socket = SocketIo
Vue.prototype.$post = post
Vue.prototype.$cache = cache
Vue.prototype.$store = store
Vue.prototype.$api = api
Vue.prototype.$widget = widget
Vue.prototype.$date = date
Vue.use(MpvueRouterPatch)

App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  name: 'main'
}
