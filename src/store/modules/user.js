/**
 * 用户状态管理模块
 * 负责管理用户登录、登出、获取用户信息等功能
 */
import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

/**
 * 获取默认状态
 * 从 cookie 中读取 token，初始化用户信息为空
 */
const getDefaultState = () => {
  return {
    token: getToken(), // 用户认证 token
    name: '',          // 用户名称
    avatar: ''         // 用户头像
  }
}

// 初始化状态
const state = getDefaultState()

/**
 * Mutations - 状态变更函数
 * 只能通过 commit 调用，用于同步修改状态
 */
const mutations = {
  // 重置状态为默认值
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  // 设置 token
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  // 设置用户名称
  SET_NAME: (state, name) => {
    state.name = name
  },
  // 设置用户头像
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

/**
 * Actions - 异步操作函数
 * 用于处理异步逻辑，通过 dispatch 调用
 */
const actions = {
  // 用户登录
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      // 调用登录 API
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        // 保存 token 到状态和 cookie
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取用户信息
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      // 调用获取用户信息 API
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          return reject('验证失败，请重新登录')
        }

        const { name, avatar } = data

        // 更新用户信息到状态
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 用户登出
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      // 调用登出 API
      logout(state.token).then(() => {
        removeToken() // 先移除 token
        resetRouter() // 重置路由
        commit('RESET_STATE') // 重置状态
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 重置 token（不调用 API）
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // 移除 cookie 中的 token
      commit('RESET_STATE') // 重置状态
      resolve()
    })
  }
}

export default {
  namespaced: true, // 启用命名空间
  state,
  mutations,
  actions
}

