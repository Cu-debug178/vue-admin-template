/**
 * 窗口大小变化处理混入
 * 用于检测设备类型（桌面端/移动端）并自动切换侧边栏状态
 */
import store from '@/store'

const { body } = document
const WIDTH = 992 // Bootstrap 响应式设计的断点

export default {
  watch: {
    // 监听路由变化，当在移动端且侧边栏打开时，自动关闭侧边栏
    $route(route) {
      if (this.device === 'mobile' && this.sidebar.opened) {
        store.dispatch('app/closeSideBar', { withoutAnimation: false })
      }
    }
  },
  beforeMount() {
    // 组件挂载前注册窗口大小变化监听
    window.addEventListener('resize', this.$_resizeHandler)
  },
  beforeDestroy() {
    // 组件销毁前移除监听，避免内存泄漏
    window.removeEventListener('resize', this.$_resizeHandler)
  },
  mounted() {
    // 初始检测设备类型
    const isMobile = this.$_isMobile()
    if (isMobile) {
      // 如果是移动端，切换设备类型并关闭侧边栏
      store.dispatch('app/toggleDevice', 'mobile')
      store.dispatch('app/closeSideBar', { withoutAnimation: true })
    }
  },
  methods: {
    // 判断是否为移动设备（根据窗口宽度）
    $_isMobile() {
      const rect = body.getBoundingClientRect()
      // 窗口宽度小于 992px 视为移动设备
      return rect.width - 1 < WIDTH
    },
    // 窗口大小变化处理函数
    $_resizeHandler() {
      if (!document.hidden) {
        const isMobile = this.$_isMobile()
        // 更新设备类型
        store.dispatch('app/toggleDevice', isMobile ? 'mobile' : 'desktop')

        // 如果切换到移动端，关闭侧边栏
        if (isMobile) {
          store.dispatch('app/closeSideBar', { withoutAnimation: true })
        }
      }
    }
  }
}
