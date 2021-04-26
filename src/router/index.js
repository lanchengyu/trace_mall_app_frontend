// import Vue from 'vue'
// import Router from 'vue-router'
import Home from '@/pages/home/home'
// import cart from '@/pages/Cart/cart'
// import my from '@/pages/My/my'
// import goodDetail from '@/pages/Detail/goodDetail'
// import BatchDetail from '@/pages/Detail/BatchDetail'
// import order from '@/pages/order'
// import author from '@/pages/author'
// import choose from '@/pages/choose'
// import news from '@/pages/News/news'
// import newsDetail from '@/pages/News/newsDetail'
// import parts from '@/pages/parts'
// import change from '@/pages/Detail/Change'
// import success from '@/common/success'
// import MyCollection from '@/pages/My/MyCollection'
// import classify from '@/pages/Classify/classify'
// import OrderDetails from '@/pages/OrderDetails'
// import pay from '@/pages/pay/pay'
// import address from '@/pages/address'
// import add_address from '@/pages/add_address'
// Vue.use(Router)
import db from '@/utils/localstorage'

let router = new VueRouter({
  // mode: 'history', //把Router的mode修改为history模式,VueRouter默认的模式为HASH模式
  base: '/shop/',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['@/pages/login/Login'], resolve),
    },
    {
      path: '/mall/login',
      name: 'mallLogin',
      component: resolve => require(['@/pages/login/MallLogin'], resolve),
    },
    {
      path: '/mall/telLogin',
      name: 'MallTelLogin',
      component: resolve => require(['@/pages/login/MallTelLogin'], resolve),
    },
    {
      path: '/mall/regist',
      name: 'mallRegist',
      component: resolve => require(['@/pages/login/MallRegist'], resolve)
    },
    {
      path: '/regist',
      name: 'regist',
      component: resolve => require(['@/pages/login/regist'], resolve)
    },
    { path: '/', name: 'Home1', component: Home },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: { index: 1, keepAlive: true,title:'九农仓溯源商城' }
    },
    {
      path: '/goodMore',
      name: 'goodMore',
      component: resolve => require(['@/pages/home/GoodMore'], resolve)
    },
    {
      path: '/brandMore',
      name: 'brandMore',
      component: resolve => require(['@/pages/home/BrandMore'], resolve)
    },
    {
      path: '/category',
      name: 'category',
      component: resolve => require(['@/pages/category/Category'], resolve),
      meta: { keepAlive: true }
    },
    {
      path: '/cart',
      name: 'cart',
      component: resolve => require(['@/pages/Cart/cart'], resolve)
    },
    {
      path: '/my',
      name: 'my',
      component: resolve => require(['@/pages/My/my'], resolve)
    },
    {
      path: '/goodDetail',
      name: 'goodDetail',
      component: resolve => require(['@/pages/detail/GoodDetail'], resolve),
      meta: { index: 0,title:'九农仓溯源商城'}
    },
    {
      path: '/goodList',
      name: 'goodList',
      component: resolve => require(['@/pages/detail/GoodList'], resolve)
    },
    {
      path: '/batch/batchIndex',
      name: 'batchIndex',
      component: resolve => require(['@/pages/batch/BatchIndex'], resolve),
      meta:{
        title:'道业溯源'
      }
    },
    {
      path: '/batch/batchDetail',
      name: 'batchDetail',
      component: resolve => require(['@/pages/batch/BatchDetail'], resolve),
      meta: {
        isBack: false,
        keepAlive: true, // 需要被缓存
        title:'道业溯源'
      } 
    },
    {
      path: '/batch/record',
      name: 'record',
      component: resolve => require(['@/pages/batch/Record'], resolve),
    },
    {
      path: '/batch/report',
      name: 'report',
      component: resolve => require(['@/pages/batch/Report'], resolve),
    },
    {
      path: '/company',
      name: 'company',
      component: resolve => require(['@/pages/company/Company'], resolve),
      meta: {
        isBack: false,
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/monitor',
      name: 'monitor',
      component: resolve => require(['@/pages/company/Monitor'], resolve)
    },
    {
      path: '/quality',
      name: 'quality',
      component: resolve => require(['@/pages/quality/Quality'], resolve)
    },
    {
      path: '/position',
      name: 'position',
      component: resolve => require(['@/pages/statistics/Position'], resolve)
    },
    {
      path: '/blockchain',
      name: 'blockchain',
      component: resolve => require(['@/pages/blockchain/Blockchain'], resolve)
    },
    {
      path: '/product',
      name: 'product',
      component: resolve => require(['@/pages/product/Product'], resolve),
      meta: {
        isBack: false,
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/batchList',
      name: 'batchList',
      component: resolve => require(['@/pages/batch/BatchList'], resolve)
    },
    {
      path: '/order',
      name: 'order',
      component: resolve => require(['@/pages/order/Order'], resolve)
    },
    {
      path:'/exchangeList',
      name:'ExchangeList',
      component: resolve => require(['@/pages/order/ExchangeList'], resolve)
    },
    {
      path: '/order/orderDetails',
      name: 'OrderDetails',
      component: resolve => require(['@/pages/order/OrderDetails'], resolve)
    },
    {
      path:'/order/exchangeMoney',
      name:'ExchangeMoney',
      component: resolve => require(['@/pages/order/ExchangeMoney'], resolve)
    },
    {
      path:'/order/ExchangeProduct',
      name:'ExchangeProduct',
      component: resolve => require(['@/pages/order/ExchangeProduct'], resolve)
    },
    {
      path:'/order/ServiceType',
      name:'ServiceType',
      component: resolve => require(['@/pages/order/ServiceType'], resolve)
    },
    {
      path:'/order/ReturnDetail',
      name:'ReturnDetail',
      component: resolve => require(['@/pages/order/ReturnDetail'], resolve)
    },
    {
      path: '/order/payOrder',
      name: 'PayOrder',
      component: resolve => require(['@/pages/order/PayOrder'], resolve)
    },
    {
      path: '/order/orderTrace',
      name: 'OrderTrace',
      component: resolve => require(['@/pages/order/OrderTrace'], resolve)
    },
    {
      path: '/order/submitOrder',
      name: 'SubmitOrder',
      component: resolve => require(['@/pages/order/SubmitOrder'], resolve)
    },

    {
      path: '/order/Evaluate',
      name: 'Evaluate',
      component: resolve => require(['@/pages/order/Evaluate'], resolve)
    },
    {
      path: '/my/about',
      name: 'About',
      component: resolve => require(['@/pages/About'], resolve)
    },
    {
      path: '/my/setting',
      name: 'Setting',
      component: resolve => require(['@/pages/my/Setting'], resolve)
    },
    {
      path: '/my/info',
      name: 'MyInfo',
      component: resolve => require(['@/pages/my/MyInfo'], resolve)
    },
    {
      path:'/my/integration',
      name:'Integration',
      component: resolve => require(['@/pages/my/Integration'], resolve)
    },
    {
      path:'/my/footMark',
      name:'FootMark',
      component: resolve => require(['@/pages/my/FootMark'], resolve)
    },
    {
      path:'/my/ModifyNickName',
      name:'ModifyNickName',
      component: resolve => require(['@/pages/my/ModifyNickName'], resolve)
    },
    {
      path:'/integration/integrationlist',
      name:'Integrationlist',
      component: resolve => require(['@/pages/my/integrationlist'], resolve)
    },
    // // { path: '/choose', name: 'choose', component: choose },
    // {
    //   path: '/newsDetail',
    //   name: 'newsDetail',
    //   component: resolve => require(['@/pages/News/newsDetail'], resolve)
    // },
    // {
    //   path: '/news',
    //   name: 'news',
    //   component: resolve => require(['@/pages/News/news'], resolve)
    // }
    // { path: '/parts', name: 'parts', component: parts },
    // { path: '/change', name: 'change', component: change },
    {
      path: '/success',
      name: 'success',
      component: resolve => require(['@/common/success'], resolve)
    },
    {
      path: '/myCollection',
      name: 'MyCollection',
      component: resolve => require(['@/pages/My/MyCollection'], resolve)
    },
    {
      path:'/ModifyPwd',
      name:'ModifyPwd',
      component:resolve=>require(['@/pages/My/ModifyPwd'],resolve)
    },
    {
      path:'/ModifyTel',
      name:'ModifyTel',
      component:resolve=>require(['@/pages/My/ModifyTel'],resolve)
    },
    {
      path:'/Coupon',
      name:'Coupon',
      component:resolve=>require(['@/pages/coupon/Coupon'],resolve)
    },
    {
      path:'/ServiceList',
      name:'ServiceList',
      component:resolve=>require(['@/pages/order/ServiceList'],resolve)
    },
    {
      path: '/address',
      name: 'address',
      component: resolve => require(['@/pages/address/address'], resolve)
    },
    {
      path: '/add_address',
      name: 'add_address',
      component: resolve => require(['@/pages/address/add_address'], resolve)
    },{
      path: '/my/test',
      name: 'test',
      component: resolve => require(['@/pages/test/test'], resolve)
    },{
      path: '/order',
      name: 'order',
      component: resolve => require(['@/pages/order/Order'], resolve)
    },{
      path: '/evaluate-more',
      name: 'MoreEvaluation',
      component: resolve => require(['@/pages/evaluate/MoreEvaluation'], resolve)
    },{
      path:'/test',
      name:'test',
      component:resolve=>require(['@/pages/test/test'],resolve)
    }
    
  ]
  //路由切换页面始终回到最顶部
  // scrollBehavior(to, from, savedPosition) {
  //   return { x: 0, y: 0 }
  // }
})

const mallLoginList = [
  '/cart',
  '/order',
  '/OrderDetails',
  '/my',
  '/collection',
  '/address',
  '/add_address'
]
const traceLoginList = ['/company']

// 导航守卫，渲染动态路由
router.beforeEach((to, from, next) => {
  if (mallLoginList.indexOf(to.path) !== -1) {
    let mallUser = db.get('MALL_USER')
    if (mallUser.username) next()
    else next('/mall/login')
  } else if (traceLoginList.indexOf(to.path) !== -1) {
    let token = db.get('USER_TOKEN')
    let user = db.get('USER')
    if (token.length && user) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
  if(to.meta.title){
    document.title=to.meta.title
  }
})
export default router
