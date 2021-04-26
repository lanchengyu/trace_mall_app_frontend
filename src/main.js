// import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/index'
import Navigation from 'vue-navigation'
import VueLazyLoad from 'vue-lazyload'
import request from './utils/request'
import db from './utils/localstorage'
// 引入时间格式化组件
import moment from 'moment'
import './utils/install'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'lib-flexible'
import 'jquery'
import Meta from 'vue-wechat-title'
Vue.use(Meta)
Vue.use(ElementUI)

// import BScroll from 'better-scroll'icon
Vue.use(Navigation, { router, store })
// Vue.use(BScroll)
Vue.use(VueLazyLoad, {
  loading: require('../static/img/loading.gif')
})

Vue.use({
  install(Vue) {
    Vue.prototype.$db = db
  }
})

Vue.filter('dateformat', function(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  if (dataStr) return moment(dataStr).format(pattern)
  else return ''
})

Vue.filter('dateformat2', function(dataStr, pattern = 'YYYY-MM-DD') {
  if (dataStr) return moment(dataStr).format(pattern)
  else return ''
})

//引入UI组件
// import MintUI from 'mint-ui'
// import 'mint-ui/lib/style.css'
// Vue.use(MintUI)

//引入axios文件
// import axios from 'axios'

//引入vue-resource
// import VueResource from 'vue-resource'
// Vue.use(VueResource)

//引入视频插件
import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
Vue.use(VideoPlayer)

Vue.config.productionTip = false

Vue.prototype.$post = request.post
Vue.prototype.$get = request.get
Vue.prototype.$put = request.put
Vue.prototype.$delete = request.delete
Vue.prototype.$export = request.export
Vue.prototype.$download = request.download
Vue.prototype.$upload = request.upload

Vue.http.options.credentials = true
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
