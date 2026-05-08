/**
 * 工具函数集合
 * 包含时间格式化、URL 参数解析等常用工具函数
 */

/**
 * 将时间解析为字符串
 * @param {(Object|string|number)} time - 时间值（Date对象、时间戳字符串/数字）
 * @param {string} cFormat - 格式化模板，默认 '{y}-{m}-{d} {h}:{i}:{s}'
 * @returns {string | null} 格式化后的时间字符串
 */
export function parseTime(time, cFormat) {
  // 参数为空时返回 null
  if (arguments.length === 0 || !time) {
    return null
  }
  // 默认格式化模板
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  // 如果是 Date 对象直接使用
  if (typeof time === 'object') {
    date = time
  } else {
    // 如果是字符串
    if ((typeof time === 'string')) {
      // 如果是纯数字字符串（支持毫秒时间戳）
      if ((/^[0-9]+$/.test(time))) {
        time = parseInt(time)
      } else {
        // 处理 Safari 浏览器日期格式兼容问题
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    // 如果是10位时间戳（秒），转换为13位（毫秒）
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  // 构建格式化对象
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  // 替换模板中的占位符
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // 星期几特殊处理
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    // 数字补零处理
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * 将时间格式化为相对时间或指定格式
 * @param {number} time - 时间戳
 * @param {string} option - 格式化模板（可选）
 * @returns {string} 格式化后的时间字符串
 */
export function formatTime(time, option) {
  // 处理10位时间戳
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  // 计算时间差（秒）
  const diff = (now - d) / 1000

  // 根据时间差返回相对时间描述
  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // 小于1小时
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  // 如果指定了格式化模板，使用 parseTime
  if (option) {
    return parseTime(time, option)
  } else {
    // 默认格式：月日时分
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * 将 URL 查询参数解析为对象
 * @param {string} url - URL 字符串
 * @returns {Object} 解析后的参数对象
 */
export function param2Obj(url) {
  // 获取查询字符串部分
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  // 遍历参数键值对
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
