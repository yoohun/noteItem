<<<<<<< HEAD
# test

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
=======
# noteItem
印象笔记.
>>>>>>> a03482042215eac2331fd7d097a871d2941c0140

####bug：
1.标题输入之后无法实时的在左侧的笔记列表栏里同步
2.并且输入新的标题和内容并没有办法自动更新，且刷新之后内容无法更新！
3.在notebooks列表页点击笔记本进入notes页面的时候sider组件的高亮无法改变！


###tips:  
1. 封装axios的接口的时候发送请求数据的类型切记不要用空格，否则返回网络失败： 'POST'(OK) 'POST '(NO)
2. 在引入vuex里面的页面的时候切记：【import { mapGetters, mapState, mapActions } from 'vuex';】注意！！！！！vuex全小写不要任何一个大写！
