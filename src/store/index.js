import Vue from 'vue'
import Vuex from 'vuex'
import note from './modules/note'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    note // 新建的模块在这里引入l
  }
})