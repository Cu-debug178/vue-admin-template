/**
 * 路由配置文件
 * 定义应用的所有路由规则和导航菜单结构
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 引入布局组件
import Layout from '@/layout'

/**
 * 路由配置说明：
 * hidden: true              - 设置为 true 时，该路由不在侧边栏显示（默认 false）
 * alwaysShow: true          - 设置为 true 时，始终显示根菜单
 *                             不设置时，当子路由多于一个时显示嵌套模式，否则不显示根菜单
 * redirect: noRedirect      - 设置为 noRedirect 时，面包屑不会重定向
 * name: 'router-name'       - 路由名称，用于 <keep-alive> 缓存，必须设置！
 * meta: {
 *   roles: ['admin','editor'] - 控制页面角色权限（可设置多个角色）
 *   title: 'title'            - 在侧边栏和面包屑中显示的名称（建议设置）
 *   icon: 'svg-name'/'el-icon-x' - 侧边栏显示的图标
 *   breadcrumb: false         - 设置为 false 时，在面包屑中隐藏（默认 true）
 *   activeMenu: '/example/list' - 设置后，侧边栏会高亮该路径
 * }
 */

/**
 * 常量路由
 * 不需要权限验证的基础页面，所有角色都可访问
 */
export const constantRoutes = [
  // 登录页
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true // 不在侧边栏显示
  },

  // 404 页面
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  // 首页 Dashboard
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard', // 默认重定向到 dashboard
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

  // 示例模块（Table 和 Tree）
  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },

  // 表单模块
  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  // 嵌套菜单示例
  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: { title: 'Nested', icon: 'nested' },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'),
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        name: 'Menu2',
        meta: { title: 'menu2' }
      }
    ]
  },

  // 外部链接示例
  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  // 404 路由必须放在最后！
  { path: '*', redirect: '/404', hidden: true }
]

/**
 * 创建路由实例
 */
const createRouter = () => new Router({
  // mode: 'history', // 需要服务器支持，启用后 URL 不带 #
  scrollBehavior: () => ({ y: 0 }), // 路由切换时滚动到顶部
  routes: constantRoutes
})

const router = createRouter()

/**
 * 重置路由
 * 用于用户退出登录后清除动态路由
 */
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // 替换路由匹配器
}

export default router
