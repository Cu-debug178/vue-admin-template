<template>
  <!-- 侧边栏 Logo 容器组件 -->
  <div class="sidebar-logo-container" :class="{'collapse':collapse}">
    <transition name="sidebarLogoFade">
      <!-- 折叠状态：只显示 Logo 图片，不显示标题 -->
      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo">
        <h1 v-else class="sidebar-title">{{ title }} </h1>
      </router-link>
      
      <!-- 展开状态：显示 Logo 图片和标题 -->
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo">
        <h1 class="sidebar-title">{{ title }} </h1>
      </router-link>
    </transition>
  </div>
</template>

<script>
/**
 * 侧边栏 Logo 组件
 * 根据侧边栏的折叠/展开状态显示不同样式的 Logo
 * 点击 Logo 可跳转回首页
 */
export default {
  name: 'SidebarLogo',
  props: {
    /**
     * 是否处于折叠状态
     * true - 折叠状态，只显示图标
     * false - 展开状态，显示图标和标题
     */
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      title: 'Vue Admin Template', // 系统标题
      // Logo 图片地址（使用在线图片）
      logo: 'https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png'
    }
  }
}
</script>

<style lang="scss" scoped>
// Logo 切换时的淡入淡出动画
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s; // 动画持续1.5秒
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0; // 开始和结束时完全透明
}

// Logo 容器样式
.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #2b2f3a; // 深色背景
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    & .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  // 折叠状态下的 Logo 样式
  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
