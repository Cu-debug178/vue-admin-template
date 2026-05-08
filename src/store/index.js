/**
 * Vuex 状态管理入口文件
 * 负责初始化 Vuex 实例并注册各个模块
 */
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'      // 应用状态（侧边栏、设备类型等）
import settings from './modules/settings' // 系统设置（固定头部、侧边栏 Logo 等）
import user from './modules/user'    // 用户状态（token、用户信息等）

Vue.use(Vuex)

// 创建 Vuex Store 实例
const store = new Vuex.Store({
  // 注册模块
  modules: {
    app,
    settings,
    user
  },
  // 全局 getters
  getters
})

export default store
