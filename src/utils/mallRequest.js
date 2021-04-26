import axios from 'axios'
import { Message } from 'element-ui'
import { MessageBox } from 'mint-ui'
import router from '../router'

// 创建axios实例
const service = axios.create({
  // baseURL: 'mallApi/', // api的base_url
  timeout: 15000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    // if (store.getters.token) {
    //   config.headers['Authorization'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    // }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// respone拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非200是抛错 可结合自己业务进行修改
     */
    const res = response.data
    if (res.code !== 200) {
      // 401:未登录;
      if (res.code === 401 || res.code === 403) {
        MessageBox.confirm('重新登录?', '提示')
          .then(action => {
            if (action == 'confirm') {
              //确认的回调
              return new Promise((resolve, reject) => {
                router.push('/mall/login')
              })
            }
          })
          .catch(action => {
            // console.log("11111111")
          })
      } else {
        // Message({
        //   message: res.message,
        //   type: 'error',
        //   duration: 3 * 1000
        // })
      }
      return Promise.reject(res)
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
