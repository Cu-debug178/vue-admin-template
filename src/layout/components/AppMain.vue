<template>
  <!-- 主内容区域 -->
  <section class="app-main">
    <!-- 路由视图，带有切换动画 -->
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
/**
 * 主内容区域组件
 * 作为路由视图的容器，负责渲染当前路由对应的页面组件
 */
export default {
  name: 'AppMain',
  computed: {
    // 路由路径作为 key，确保路由切换时组件重新渲染
    key() {
      return this.$route.path
    }
  }
}
</script>

<style scoped>
.app-main {
  /* 减去顶部导航栏高度 50px */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}

/* 当头部固定时，添加顶部内边距 */
.fixed-header+.app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
/* 修复 el-dialog 打开时的样式问题 */
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
