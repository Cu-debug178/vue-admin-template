<template>
  <!-- 应用布局容器 -->
  <div :class="classObj" class="app-wrapper">
    <!-- 移动端侧边栏遮罩层 -->
    <div
      v-if="device==='mobile'&&sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <!-- 侧边栏组件 -->
    <sidebar class="sidebar-container" />
    <!-- 主内容区域 -->
    <div class="main-container">
      <!-- 顶部导航栏（支持固定） -->
      <div :class="{'fixed-header':fixedHeader}">
        <navbar />
      </div>
      <!-- 页面内容区域 -->
      <app-main />
    </div>
  </div>
</template>

<script>
/**
 * 布局组件
 * 作为后台管理系统的整体布局框架，包含侧边栏、顶部导航和主内容区
 */
import { Navbar, Sidebar, AppMain } from './components'
import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'Layout',
  components: {
    Navbar,    // 顶部导航栏
    Sidebar,   // 侧边栏菜单
    AppMain    // 主内容区域
  },
  mixins: [ResizeMixin], // 混入窗口大小变化处理

  computed: {
    // 获取侧边栏状态
    sidebar() {
      return this.$store.state.app.sidebar
    },
    // 获取设备类型（desktop/mobile）
    device() {
      return this.$store.state.app.device
    },
    // 是否固定头部
    fixedHeader() {
      return this.$store.state.settings.fixedHeader
    },
    // 动态计算 CSS 类名
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,       // 侧边栏收起
        openSidebar: this.sidebar.opened,         // 侧边栏展开
        withoutAnimation: this.sidebar.withoutAnimation, // 是否禁用动画
        mobile: this.device === 'mobile'          // 移动端
      }
    }
  },

  methods: {
    // 点击遮罩层时关闭侧边栏（移动端）
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    // 移动端侧边栏展开时固定定位
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }

  // 移动端侧边栏遮罩层
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  // 固定头部样式
  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  // 侧边栏收起时调整头部宽度
  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  // 移动端头部宽度占满屏幕
  .mobile .fixed-header {
    width: 100%;
  }
</style>
