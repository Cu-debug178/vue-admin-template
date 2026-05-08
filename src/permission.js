/**
 * 路由权限守卫配置
 * 负责在路由跳转前进行权限验证和登录状态检查
 */
import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // 进度条插件
import 'nprogress/nprogress.css' // 进度条样式
import { getToken } from '@/utils/auth' // 从 cookie 获取 token
import getPageTitle from '@/utils/get-page-title'

// 配置 NProgress 进度条（隐藏旋转图标）
NProgress.configure({ showSpinner: false })

// 白名单：不需要登录即可访问的页面
const whiteList = ['/login']

/**
 * 路由前置守卫
 * 在路由跳转前执行权限验证
 * @param {Object} to - 目标路由对象
 * @param {Object} from - 来源路由对象
 * @param {Function} next - 导航控制函数
 */
router.beforeEach(async(to, from, next) => {
  // 启动进度条
  NProgress.start()

  // 设置页面标题
  document.title = getPageTitle(to.meta.title)

  // 判断用户是否已登录（通过 token 判断）
  const hasToken = getToken()

  if (hasToken) {
    // 已登录状态
    if (to.path === '/login') {
      // 如果已登录却访问登录页，重定向到首页
      next({ path: '/' })
      NProgress.done()
    } else {
      // 检查是否已获取用户信息
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {
        // 已获取用户信息，直接放行
        next()
      } else {
        // 未获取用户信息，尝试获取
        try {
          // 调用 Vuex action 获取用户信息
          await store.dispatch('user/getInfo')
          next()
        } catch (error) {
          // 获取用户信息失败，重置 token 并重定向到登录页
          await store.dispatch('user/resetToken')
          Message.error(error || '登录信息失效，请重新登录')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    // 未登录状态
    if (whiteList.indexOf(to.path) !== -1) {
      // 在白名单内，直接放行
      next()
    } else {
      // 不在白名单，重定向到登录页
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

/**
 * 路由后置守卫
 * 在路由跳转完成后执行
 */
router.afterEach(() => {
  // 结束进度条
  NProgress.done()
})
