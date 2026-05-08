/**
 * 认证工具函数
 * 负责管理用户 token 的存储和读取（使用 Cookies）
 */
import Cookies from 'js-cookie'

// Token 在 cookie 中的存储键名
const TokenKey = 'vue_admin_template_token'

/**
 * 获取 token
 * @returns {string|null} token 值或 null
 */
export function getToken() {
  return Cookies.get(TokenKey)
}

/**
 * 设置 token
 * @param {string} token - 要保存的 token 值
 */
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

/**
 * 移除 token
 */
export function removeToken() {
  return Cookies.remove(TokenKey)
}
