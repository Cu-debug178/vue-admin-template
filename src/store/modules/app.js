/**
 * 应用状态管理模块
 * 负责管理侧边栏状态、设备类型等全局应用状态
 */
import Cookies from 'js-cookie'

// 初始化状态
const state = {
  sidebar: {
    // 侧边栏是否展开（从 cookie 读取，默认展开）
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    // 是否禁用动画
    withoutAnimation: false
  },
  device: 'desktop' // 设备类型：desktop 或 mobile
}

/**
 * Mutations - 状态变更函数
 */
const mutations = {
  // 切换侧边栏展开/收起
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    // 将状态保存到 cookie，刷新页面后保持状态
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  // 关闭侧边栏
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  // 切换设备类型
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  }
}

/**
 * Actions - 异步操作函数
 */
const actions = {
  // 切换侧边栏
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  // 关闭侧边栏
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  // 切换设备类型
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
