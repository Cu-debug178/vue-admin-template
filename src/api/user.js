/**
 * 用户相关 API 请求
 * 封装登录、获取用户信息、登出等接口
 */
import request from '@/utils/request'

/**
 * 用户登录
 * @param {Object} data - 登录信息 { username, password }
 * @returns {Promise}
 */
export function login(data) {
  return request({
    url: '/vue-admin-template/user/login',
    method: 'post',
    data
  })
}

/**
 * 获取用户信息
 * @param {string} token - 用户 token
 * @returns {Promise}
 */
export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

/**
 * 用户登出
 * @returns {Promise}
 */
export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
