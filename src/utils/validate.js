/**
 * 验证工具函数
 * 包含外部链接判断、用户名验证等功能
 */

/**
 * 判断是否为外部链接
 * @param {string} path - 路径字符串
 * @returns {Boolean} 是否为外部链接
 */
export function isExternal(path) {
  // 匹配 http://、https://、mailto:、tel: 开头的链接
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * 验证用户名是否合法
 * @param {string} str - 用户名字符串
 * @returns {Boolean} 是否为合法用户名
 */
export function validUsername(str) {
  // 合法用户名列表
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}
