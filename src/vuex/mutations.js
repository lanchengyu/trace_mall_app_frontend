import state from './state'
import { MessageBox } from 'mint-ui'
import db from '../utils/localstorage'
import {
  getMyCart,
  getProductIdCollection,
  getCurrentUser,
  mallLogout
} from '@/api/mallApi'

const matutaions = {
  //Token
  ['SET_TOKEN'](state, data) {
    state.token = data
    db.save('USER_TOKEN', data)
  },
  //过期时间
  ['SET_EXPIRE_TIME'](state, data) {
    state.expireTime = data
    db.save('EXPIRE_TIME', data)
  },
  //用户信息
  ['SET_USER'](state, data) {
    state.user = data
    db.save('USER', data)
  },
  //权限
  ['SET_PERMISSIONS'](state, data) {
    state.permissions = data
    db.save('PERMISSIONS', data)
  },
  //角色
  ['SET_ROLES'](state, data) {
    state.roles = data
    db.save('ROLES', data)
  },
  //批次
  ['SET_BATCH'](state, data) {
    state.batch = data
    db.save('BATCH', data)
  },
  //设置商城用户
  ['SET_MALL_USER'](state, data) {
    state.mallUser = data
    db.save('MALL_USER', data)
  },
  //购物车
  ['SET_CARTS'](state, data) {
    state.carts = data
    localStorage.setItem('carts', JSON.stringify(data))
  },
  //文章
  ['SET_ARTICLE'](state, data) {
    state.article.push(data)
    localStorage.setItem('article', JSON.stringify(state.article))
  },
  //商品收藏
  ['SET_GOODS'](state, data) {
    state.collections = data
    localStorage.setItem('collections', JSON.stringify(data))
  },
  //订单
  ['SET_ORDERS'](state, data) {
    state.orders.push(data)
    localStorage.setItem('orders', JSON.stringify(state.orders))
  },
  //设置当前收获地址
  ['SET_CURRENT_ADDRESS'](state, data) {
    state.currentAddress = data
    localStorage.setItem('currentAddress', JSON.stringify(state.currentAddress))
  },
  //改变页面的ScrollY
  ['SET_SCROLLY'](state, data) { 
    state.recruitScrollY = data
    localStorage.setItem('recruitScrollY',JSON.stringify(data))
  },
  //设置当前提交的订单
  ['SET_ORDER'](state,data){
    state.order=data
    localStorage.setItem('order',JSON.stringify(data))
  },
  // 更新商城用户
  updateMallUser: state => {
    getCurrentUser().then(res => {
      state.mallUser = res.data
      db.save('MALL_USER', res.data)
    })
  },
  // 退出商城
  logoutMall: state => {
    mallLogout().then(res => {
      state.mallUser = {}
      db.save('MALL_USER', {})
      Toast({
        message: '退出成功',
        position: 'bottom',
        duration: 5000
      })
    })
  },
  //文章删除
  del: (state, index) => {
    MessageBox.confirm('确定取消收藏该文章么？').then(action => {
      state.article.splice(index, 1)
      localStorage.setItem('article', JSON.stringify(state.article))
    })
  },
  //删除收藏
  cancel: (state, index) => {
    MessageBox.confirm('确定取消收藏该商品么？').then(action => {
      state.collections.splice(index, 1)
      localStorage.setItem('collections', JSON.stringify(state.collections))
    })
  },
  // 更新购物车
  updateCart: state => {
    getMyCart().then(res => {
      state.carts = res.data
      localStorage.setItem('carts', JSON.stringify(res.data))
    })
  },
  //订单删除
  odefault: (state, index) => {
    MessageBox.confirm('确定删除该订单么？').then(action => {
      state.orders.splice(index, 1)
      localStorage.setItem('orders', JSON.stringify(state.orders))
    })
  }
}

export default matutaions
