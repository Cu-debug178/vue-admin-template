<template>
  <!-- 根组件容器 -->
  <div id="app">
    <!-- 路由视图，根据当前路由渲染对应的页面组件 -->
    <router-view />
  </div>
</template>

<script>
/**
 * App 根组件
 * 作为整个应用的入口组件，负责渲染路由视图
 */
export default {
  name: 'App'
}
</script>
