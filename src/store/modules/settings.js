/**
 * 系统设置状态管理模块
 * 负责管理系统配置项，如是否显示设置面板、是否固定头部、侧边栏 Logo 等
 */
import defaultSettings from '@/settings'

// 从默认设置中解构配置项
const { showSettings, fixedHeader, sidebarLogo } = defaultSettings

// 初始化状态
const state = {
  showSettings: showSettings, // 是否显示设置面板
  fixedHeader: fixedHeader,   // 是否固定头部导航栏
  sidebarLogo: sidebarLogo    // 是否在侧边栏显示 Logo
}

/**
 * Mutations - 状态变更函数
 */
const mutations = {
  // 修改设置项
  CHANGE_SETTING: (state, { key, value }) => {
    // 只修改已存在的配置项
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
}

/**
 * Actions - 异步操作函数
 */
const actions = {
  // 修改设置
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

