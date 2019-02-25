// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './style/reset.css'
import iView from 'iview' // 导入组件库
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import 'iview/dist/styles/iview.css' // 导入样式


Vue.use(iView)
Vue.use(mavonEditor)


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
