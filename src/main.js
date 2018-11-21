import Vue from 'vue'
import App from './App'
import MpvueRouterPatch from  'mpvue-router-patch'
import {post} from "./utils/request";

Vue.config.productionTip = false
Vue.prototype.$post = post
Vue.use(MpvueRouterPatch)

App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  name: 'main'
}
