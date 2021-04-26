const actions = {
  //Token
  setToken({ commit }, data) {
    commit('SET_TOKEN', data)
  },
  //过期时间
  setExpireTime({ commit }, data) {
    commit('SET_EXPIRE_TIME', data)
  },
  //用户信息
  setUser({ commit }, data) {
    commit('SET_USER', data)
  },
  //权限
  setPermissions({ commit }, data) {
    commit('SET_PERMISSIONS', data)
  },
  //角色
  setRoles({ commit }, data) {
    commit('SET_ROLES', data)
  },
  //批次
  setBatch({ commit }, data) {
    commit('SET_BATCH', data)
  },
  //购物车
  setCart({ commit }, data) {
    commit('SET_CARTS', data)
  },
  //文章收藏
  setArticle({ commit }, data) {
    commit('SET_ARTICLE', data)
  },
  //商品收藏
  setGoods({ commit }, data) {
    commit('SET_GOODS', data)
  },
  //设置当前收获地址
  setCurrentAddress({ commit }, data) {
    commit('SET_CURRENT_ADDRESS', data)
  },
  //订单
  setOrders({ commit }, data) {
    commit('SET_ORDERS', data)
  },
  //商城用户
  setMallUser({ commit }, data) {
    commit('SET_MALL_USER', data)
  },
  //设置scrollY
  setScrollY({commit},data){
    commit('SET_SCROLLY',data)
  },
  //设置order
  setOrder({commit},data){
    commit('SET_ORDER',data)
  }
}

export default actions
