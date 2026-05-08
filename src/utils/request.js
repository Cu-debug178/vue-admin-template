/**
 * Axios 请求封装
 * 统一处理请求拦截、响应拦截、错误处理等
 */
import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

/**
 * 创建 axios 实例
 */
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 基础 URL，从环境变量读取
  // withCredentials: true, // 跨域请求时是否发送 cookies
  timeout: 5000 // 请求超时时间（5秒）
})

/**
 * 请求拦截器
 * 在发送请求前进行处理
 */
service.interceptors.request.use(
  config => {
    // 如果存在 token，在请求头中携带
    if (store.getters.token) {
      // X-Token 是自定义的请求头字段，用于传递 token
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // 请求错误处理
    console.log(error) // 调试用
    return Promise.reject(error)
  }
)

/**
 * 响应拦截器
 * 在接收到响应后进行处理
 */
service.interceptors.response.use(
  /**
   * 响应成功处理
   * 根据自定义状态码判断请求是否成功
   */
  response => {
    const res = response.data

    // 自定义状态码不为 20000 时视为错误
    if (res.code !== 20000) {
      Message({
        message: res.message || '请求失败',
        type: 'error',
        duration: 5 * 1000
      })

      // 特殊错误码处理：
      // 50008: 非法 token；50012: 其他客户端登录；50014: token 过期
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // 提示用户重新登录
        MessageBox.confirm(
          '您已被登出，可以取消继续留在该页面，或重新登录',
          '确认登出',
          {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          // 重置 token 并刷新页面
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || '请求失败'))
    } else {
      // 请求成功，返回响应数据
      return res
    }
  },
  /**
   * 响应错误处理
   */
  error => {
    console.log('err' + error) // 调试用
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
