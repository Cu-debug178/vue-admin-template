/**
 * 获取页面标题工具函数
 * 根据页面标题和系统名称拼接完整的浏览器标签页标题
 */
import defaultSettings from '@/settings'

// 系统默认标题
const title = defaultSettings.title || 'Vue Admin Template'

/**
 * 获取完整的页面标题
 * @param {string} pageTitle - 页面标题
 * @returns {string} 完整的页面标题，格式为 "页面标题 - 系统标题"
 */
export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    // 如果有页面标题，拼接为 "页面标题 - 系统标题"
    return `${pageTitle} - ${title}`
  }
  // 如果没有页面标题，只显示系统标题
  return `${title}`
}
