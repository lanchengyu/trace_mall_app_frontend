// import axios from 'axios'
import { MessageBox, Toast } from 'mint-ui'
import moment from 'moment'
import store from '../vuex'
import db from './localstorage'
import router from '../router'
moment.locale('zh-cn')

// 统一配置
let LB_REQUEST = axios.create({
  // baseURL: 'http://192.168.43.14:9527/',
  baseURL: '/traceApi/',
  responseType: 'json',
  validateStatus(status) {
    // 200 外的状态码都认定为失败
    return status === 200
  }
})

// 拦截请求
LB_REQUEST.interceptors.request.use(
  config => {
    let expireTime = store.state.expireTime
    let now = moment().format('YYYYMMDDHHmmss')
    // 让token早10秒种过期，提升“请重新登录”弹窗体验
    if (now - expireTime >= -10) {
      db.clear()
      MessageBox.confirm('重新登录?', '登录已过期').then(action => {
        if (action == 'confirm') {
          //确认的回调
          return new Promise((resolve, reject) => {
            db.clear()
            router.push('/login')
          })
        }
      })
    }
    // 有 token就带上
    if (store.state.token) {
      config.headers.Authentication = store.state.token
    }
    console.log("config",config)
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 拦截响应
LB_REQUEST.interceptors.response.use(
  config => {
    return config
  },
  error => {
    if (error.response) {
      let errorMessage =
        error.response.data === null
          ? '系统内部异常，请联系网站管理员'
          : error.response.data.message
      switch (error.response.status) {
        case 404:
          Toast('很抱歉，资源未找到')
          break
        case 403:
        case 401:
          // Toast('很抱歉，您没有相应权限或者登录已失效')
          MessageBox.confirm('重新登录?', '提示')
          .then(action => {
            if (action == 'confirm') {
              //确认的回调
              return new Promise((resolve, reject) => {
                router.push('/login')
              })
            }
          })
          .catch(action => {})
          break
        case 500:
          Toast(errorMessage)
          break
        default:
          Toast('很抱歉，服务异常')
          break
      }
    }
    return Promise.reject(error)
  }
)

const request = {
  post(url, params) {
    return LB_REQUEST.post(url, params, {
      transformRequest: [
        params => {
          let result = ''
          Object.keys(params).forEach(key => {
            if (
              !Object.is(params[key], undefined) &&
              !Object.is(params[key], null)
            ) {
              result +=
                encodeURIComponent(key) +
                '=' +
                encodeURIComponent(params[key]) +
                '&'
            }
          })
          return result
        }
      ],
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  },
  put(url, params) {
    return LB_REQUEST.put(url, params, {
      transformRequest: [
        params => {
          let result = ''
          Object.keys(params).forEach(key => {
            if (
              !Object.is(params[key], undefined) &&
              !Object.is(params[key], null)
            ) {
              result +=
                encodeURIComponent(key) +
                '=' +
                encodeURIComponent(params[key]) +
                '&'
            }
          })
          return result
        }
      ],
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  },
  get(url, params) {
    let _params
    if (Object.is(params, undefined)) {
      _params = ''
    } else {
      _params = '?'
      for (let key in params) {
        if (params.hasOwnProperty(key) && params[key] !== null) {
          _params += `${key}=${params[key]}&`
        }
      }
    }
    return LB_REQUEST.get(`${url}${_params}`)
  },
  delete(url, params) {
    let _params
    if (Object.is(params, undefined)) {
      _params = ''
    } else {
      _params = '?'
      for (let key in params) {
        if (params.hasOwnProperty(key) && params[key] !== null) {
          _params += `${key}=${params[key]}&`
        }
      }
    }
    return LB_REQUEST.delete(`${url}${_params}`)
  },
  export(url, params = {}) {
    Toast('导出数据中')
    return LB_REQUEST.post(url, params, {
      transformRequest: [
        params => {
          let result = ''
          Object.keys(params).forEach(key => {
            if (
              !Object.is(params[key], undefined) &&
              !Object.is(params[key], null)
            ) {
              result +=
                encodeURIComponent(key) +
                '=' +
                encodeURIComponent(params[key]) +
                '&'
            }
          })
          return result
        }
      ],
      responseType: 'blob'
    })
      .then(r => {
        const content = r.data
        const blob = new Blob([content])
        const fileName = `${new Date().getTime()}_导出结果.xlsx`
        if ('download' in document.createElement('a')) {
          const elink = document.createElement('a')
          elink.download = fileName
          elink.style.display = 'none'
          elink.href = URL.createObjectURL(blob)
          document.body.appendChild(elink)
          elink.click()
          URL.revokeObjectURL(elink.href)
          document.body.removeChild(elink)
        } else {
          navigator.msSaveBlob(blob, fileName)
        }
      })
      .catch(r => {
        console.error(r)
        Toast('导出失败')
      })
  },
  download(url, params, filename) {
    Toast('文件传输中')
    return LB_REQUEST.post(url, params, {
      transformRequest: [
        params => {
          let result = ''
          Object.keys(params).forEach(key => {
            if (
              !Object.is(params[key], undefined) &&
              !Object.is(params[key], null)
            ) {
              result +=
                encodeURIComponent(key) +
                '=' +
                encodeURIComponent(params[key]) +
                '&'
            }
          })
          return result
        }
      ],
      responseType: 'blob'
    })
      .then(r => {
        const content = r.data
        const blob = new Blob([content])
        if ('download' in document.createElement('a')) {
          const elink = document.createElement('a')
          elink.download = filename
          elink.style.display = 'none'
          elink.href = URL.createObjectURL(blob)
          document.body.appendChild(elink)
          elink.click()
          URL.revokeObjectURL(elink.href)
          document.body.removeChild(elink)
        } else {
          navigator.msSaveBlob(blob, filename)
        }
      })
      .catch(r => {
        console.error(r)
        Toast('下载失败')
      })
  },
  upload(url, params) {
    return LB_REQUEST.post(url, params, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}

export default request
