/**
 * Vue 应用入口文件
 * 负责初始化 Vue 实例、配置插件、加载全局资源
 */
import Vue from 'vue'

// 引入 normalize.css 统一不同浏览器的基础样式
import 'normalize.css/normalize.css'

// 引入 ElementUI 组件库及样式
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // 语言国际化配置

// 引入全局样式文件
import '@/styles/index.scss'

// 引入根组件、状态管理、路由配置
import App from './App'
import store from './store'
import router from './router'

// 引入图标组件和路由权限控制
import '@/icons'
import '@/permission'

// 生产环境下启用 Mock 数据模拟
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// 配置 ElementUI 使用英文语言环境
Vue.use(ElementUI, { locale })
// 如果需要中文版，取消注释下行并注释上行
// Vue.use(ElementUI)

// 关闭生产环境下的 Vue 提示信息
Vue.config.productionTip = false

// 创建 Vue 实例并挂载到页面
new Vue({
  el: '#app',
  router,    // 注入路由
  store,     // 注入状态管理
  render: h => h(App)  // 渲染根组件
})
