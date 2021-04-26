import mallRequest from '@/utils/mallRequest.js'
import Qs from 'qs'

// 注册
export function mallRegister(data) {
  return mallRequest({
    url: '/mallPortApi/sso/register',
    method: 'post',
    params: data
  })
}
// 登录商城
export function mallLogin(data) {
  return mallRequest({
    url: '/mallPortApi/sso/login',
    method: 'post',
    data: data,
    transformRequest: [
      function(data) {
        data = Qs.stringify(data)
        return data
      }
    ],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
//商城手机号登陆
export function mallTelLogin(data){
  return mallRequest({
    url:'/mallPortApi/sso/sms/login',
    method:'post',
    params:data
  })
}
// 获取验证码(后台生成的验证码)
export function getAuthCode(telephone) {
  return mallRequest({
    url: '/mallPortApi/sso/getAuthCode?telephone=' + telephone,
    method: 'get'
  })
}
//注册获取短信验证码
export function getSMS(data){
  return mallRequest({
    url:'/mallPortApi/sso/sendSms',
    method:'post',
    params:data
  })
}
// 获取当前用户
export function getCurrentUser() {
  return mallRequest({
    url: '/mallPortApi/member/currentUser',
    method: 'get'
  })
}
// 修改用户信息
export function updateInfo(data) {
  return mallRequest({
    url: '/mallPortApi/member/updateInfo',
    method: 'post',
    data: data
  })
}
// 退出登录
export function mallLogout() {
  return mallRequest({
    url: '/mallPortApi/sso/logout',
    method: 'get'
  })
}

// 获取首页信息
export function fetchHomeContent() {
  return mallRequest({
    url: '/mallPortApi/home/content',
    method: 'get'
  })
}

// 获取分类信息
export function getProductCateList(id) {
  return mallRequest({
    url: '/mallPortApi/home/productCateList/' + id,
    method: 'get'
  })
}

// 获取单个商品信息
export function getProductDetail(id) {
  return mallRequest({
    url: '/mallPortApi/product/detail/' + id,
    method: 'get'
  })
}

// 获取商品属性
export function getProductAttrList(cid, params) {
  return mallRequest({
    url: '/mallPortApi/product/attr/' + cid,
    method: 'get',
    params: params
  })
}

// 添加商品到购物车
export function addProductToCart(data) {
  return mallRequest({
    url: '/mallPortApi/cart/add',
    method: 'post',
    data: data
  })
}

// 删除购物车中的商品
export function deleteCartProduct(ids) {
  return mallRequest({
    url: '/mallPortApi/cart/delete?ids=' + ids,
    method: 'post'
  })
}

// 修改购物车商品数量
export function updateQuantity(id, quantity) {
  return mallRequest({
    url: '/mallPortApi/cart/update/quantity?id=' + id + '&quantity=' + quantity,
    method: 'get'
  })
}

// 获取购物车
export function getMyCart() {
  return mallRequest({
    url: '/mallPortApi/cart/list',
    method: 'get'
  })
}
//根据商品信息生成订单
export function generateOrderByProduct(params){
  return mallRequest({
    url:"/mallPortApi/order/listBuyNow",
    method:'post',
    data:params
  })
}
//立即购买提交订单
export function submitOrderFromDetail(data){
  return mallRequest({
    url:"/mallPortApi/order/generateProductOrder",
    method:"post",
    data:data
  })
}
//购物车提交订单
export function submitOrderFromCart(data){
  return mallRequest({
    url:"/mallPortApi/order/generatePromotionOrder",
    method:"post",
    data:data
  })
}


// 根据购物车信息生成确认订单信息
export function generateConfirmOrder() {
  return mallRequest({
    url: '/mallPortApi/order/generateConfirmOrder',
    method: 'post'
  })
}
// 根据购物车信息生成订单信息
export function generateOrder(data) {
  return mallRequest({
    url: '/mallPortApi/order/generateOrder',
    method: 'post',
    data: data
  })
}

// 支付订单 支付宝
export function payOrder(id) {
  return mallRequest({
    url: '/mallPortApi/order/payOrder/' + id,
    method: 'post'
  })
}
//微信支付
export function WeixinPay(id){
  return mallRequest({
    url:'/mallPortApi/order/WeixinPay/'+id,
    method:'post'
  })
}
//获取微信支付JSAPI所需要的参数
export function getJSAPIParam(params){
  return mallRequest({
    url:'/mallPortApi/order/dopay',
    method:'post',
    params:params
  })
}
// 取消订单
export function cancelOrder(id) {
  return mallRequest({
    url: '/mallPortApi/order/cancelOrder/' + id,
    method: 'post'
  })
}

// 删除订单
export function deleteOrder(params) {
  return mallRequest({
    url: '/mallPortApi/order/delete',
    method: 'post',
    params: params
  })
}

// 确认收货
export function confirmReceive(params) {
  return mallRequest({
    url: '/mallPortApi/order/confirmReceive',
    method: 'post',
    params: params
  })
}

// 获取订单列表
export function getOrderList(params) {
  return mallRequest({
    url: '/mallPortApi/order/list',
    method: 'get',
    params: params
  })
}
//获取订单状态数量
export function getOrderNum(){
  return mallRequest({
    url:'/mallPortApi/order/number',
    method:'get'
  })
}
// 获取订单详情
export function getOrderDetail(id) {
  return mallRequest({
    url: '/mallPortApi/order/detail/' + id,
    method: 'get'
  })
}

// 获取订单物流公司
export function getOrderCarrier(name) {
  return mallRequest({
    url: '/mallPortApi/order/carrier?name=' + name,
    method: 'get'
  })
}

// 获取订单物流
export function getOrderTracking(deliverySn) {
  return mallRequest({
    url: '/mallPortApi/order/tracking?deliverySn=' + deliverySn,
    method: 'get'
  })
}

// 获取收货地址列表
export function getReceiveAddress() {
  return mallRequest({
    url: '/mallPortApi/member/address/list',
    method: 'get'
  })
}

// 根据id获取收货地址
export function getReceiveAddressById(id) {
  return mallRequest({
    url: '/mallPortApi/member/address/' + id,
    method: 'get'
  })
}

// 添加收货地址
export function addReceiveAddress(data) {
  return mallRequest({
    url: '/mallPortApi/member/address/add',
    method: 'post',
    data: data
  })
}

// 删除收货地址
export function deleteReceiveAddress(id) {
  return mallRequest({
    url: '/mallPortApi/member/address/delete/' + id,
    method: 'post'
  })
}

// 修改收货地址
export function updateReceiveAddress(id, address) {
  return mallRequest({
    url: '/mallPortApi/member/address/update/' + id,
    method: 'post',
    data: address
  })
}

// 收藏商品
export function addProductCollection(data) {
  return mallRequest({
    url: '/mallPortApi/member/collection/addProduct',
    method: 'post',
    data: data
  })
}

// 获取收藏的商品
export function getProductCollection() {
  return mallRequest({
    url: '/mallPortApi/member/collection/listProduct',
    method: 'get'
  })
}

// 获取收藏的商品id列表
export function getProductIdCollection() {
  return mallRequest({
    url: '/mallPortApi/member/collection/listProductId',
    method: 'get'
  })
}

// 删除收藏的商品
export function deleteProductCollection(productId) {
  return mallRequest({
    url: '/mallPortApi/member/collection/deleteProduct',
    method: 'post',
    data: {
      productId: productId
    },
    transformRequest: [
      function(data) {
        data = Qs.stringify(data)
        return data
      }
    ],
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
}

// 简单搜索
export function getSimpleSearchList(params) {
  return mallRequest({
    url: '/mallSearchApi/esProduct/search/simple',
    method: 'get',
    params: params
  })
}

// 分类搜索
export function searchByCategory(params) {
  return mallRequest({
    url: '/mallSearchApi/esProduct/search/category',
    method: 'get',
    params: params
  })
}

// 品牌搜索
export function searchByBrand(params) {
  return mallRequest({
    url: '/mallSearchApi/esProduct/search/brand',
    method: 'get',
    params: params
  })
}

// 综合搜索、筛选、排序
export function getSearchList(params) {
  return mallRequest({
    url: '/mallSearchApi/esProduct/search/simple',
    method: 'get',
    params: params
  })
}

// 分页获取推荐商品
export function recommendProductList(params) {
  return mallRequest({
    url: '/mallPortApi/home/recommendProductList',
    method: 'get',
    params: params
  })
}

// 分页获取新品推荐
export function newProductList(params) {
  return mallRequest({
    url: '/mallPortApi/home/newProductList',
    method: 'get',
    params: params
  })
}

// 分页获取人气推荐
export function hotProductList(params) {
  return mallRequest({
    url: '/mallPortApi/home/hotProductList',
    method: 'get',
    params: params
  })
}

// 分页获取品牌推荐
export function brandList(params) {
  return mallRequest({
    url: '/mallPortApi/home/brandList',
    method: 'get',
    params: params
  })
}
//分页查询全部退货原因
export function returnReason() {
  return mallRequest({
    url: '/mallPortApi/shop/list',
    method: 'get'
  })
}
//申请退货/退款
export function returnApplyCreate(data){
  return mallRequest({
    url:'/mallPortApi/returnApply/create',
    method:'post',
    data:data
  })
}
//根据用户名获取退货列表
export function returnList(username,data){
  return mallRequest({
    url: '/mallPortApi/returnApply/good/list/'+username,
    method: 'get',
    params:data
  })
}
//通过id查询退货商品的属性
export function getproductAttr(id){
  return mallRequest({
    url:'/mallPortApi/Item/appyl/'+id,
    method:'get'
  })
}
//获取单个商品的用户评价
export function getProductEvaluation(params){
  return mallRequest({
    url:'/mallPortApi/order/list/center?productId='+params.id,
    method:'get',
    params:{pageNum:params.pageNum}
  })
}
//条件查询商品评价
export function getEvalByCondition(params){
  return mallRequest({
    url:'/mallPortApi/order/list/evaluation?evaluation='+params.status+'&productId='+params.id,
    method:'get',
    params:{pageNum:params.pageNum}
  })
}
export function SubmitEvaluation(data){
  return mallRequest({
    url:'/mallPortApi/order/center',
    method:'post',
    data:data
  })
}
//获取分享微信所需要的数据
export function getWxApi(data){
  return mallRequest({
    url:"/mallPortApi/order/share",
    method:'post',
    data:data
  })
}

//退货列表
// export function getReturnList(username,params){
//   return mallRequest({
//     url:'/mallPortApi/returnApply/good/list/'+username,
//     method:'get',
//     params:params
//   })
// }
