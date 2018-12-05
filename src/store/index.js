import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import state from './state'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  getters,
  plugins: [
    createPersistedState({
      storage: {  //数据持久化到本地
        getItem: key => wx.getStorageSync(key),
        setItem: (key, value) => wx.setStorageSync(key, value),
        removeItem: key => wx.removeStorageSync(key)
      },
      reducer: val => {   //储存部分数据
        return {
          userInfo: val.userInfo,
          token: val.token,
        }
      }
    })
  ]
})
