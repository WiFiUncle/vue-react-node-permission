import axios from 'axios'
import { Message } from 'element-ui'
import { BASE_CONFIG } from './base-config'

const SUCCESS_CODE = 0
const BAD_REQUEST = 400
const UNAUTHORIZED = 401
const FORBIDDEN = 403
// const NOT_FOUND = 404
const TIME_OUT = 100 * 1000 // 请求超时 100s

// 创建axios实例
const request = axios.create({
  baseURL: BASE_CONFIG.SERVER_URL, // api的base_url
  timeout: TIME_OUT // 请求超时时间
})

// 添加一个请求拦截器
request.interceptors.request.use(
  config => {
    if (sessionStorage.token) {
      config.headers.common['Authorization'] = sessionStorage.token
    }
    return config
  }, error => {
    Promise.reject(error)
  })

/**
 * 响应拦截器
 */
request.interceptors.response.use(response => {
  if (response && response.data && (response.data.status === SUCCESS_CODE)) {
    return response.data
  } else {
    let errorMsg = (response && response.data && response.data.message) ? response.data.message : '网络异常'// response.data.result;
    let option = {
      type: 'error',
      message: '操作失败!  错误原因：' + errorMsg,
      duration: 3000, // 3000ms   设置0 则不自动关闭
      showClose: true
    }
    Message(option)
    return Promise.reject(response.data)
  }
}, error => {
  let errorCode = null
  let data = null // Unauthorized
  if (error.response && error.response.status) {
    errorCode = error.response.status// Unauthorized
    data = error.response.data
  }
  if (errorCode === BAD_REQUEST) {
    // Message.error(data.error_description);
  }
  if (errorCode === UNAUTHORIZED) { // 未登录或鉴权失败token过期等
    Message.error(data.error_description)
    window.location.href = window.location.origin + '/#/login'
  } else if (errorCode === FORBIDDEN) { // 无权限
    Message.error(data.error_description)
  }
  return Promise.reject(error.response)
})
export default request
