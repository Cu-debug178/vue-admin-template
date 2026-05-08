/**
 * Mock 工具函数
 * 提供 URL 参数解析等功能
 */

/**
 * 将 URL 查询参数解析为对象
 * @param {string} url - URL 字符串
 * @returns {Object} 解析后的参数对象
 */
function param2Obj(url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}

module.exports = {
  param2Obj
}
