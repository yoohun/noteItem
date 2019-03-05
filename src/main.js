// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'mavon-editor/dist/css/index.css'
import 'iview/dist/styles/iview.css' // 导入样式
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview' // 导入组件库
import mavonEditor from 'mavon-editor'
import store from './store'  // 这个是新加的


Vue.use(iView)
Vue.use(mavonEditor)


Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (!store.getters.isLogin && to.path !== '/login') {
    router.push('/login')
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
