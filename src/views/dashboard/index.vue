<template>
  <!-- 仪表盘页面容器 -->
  <div class="dashboard-container">
    <!-- 显示用户名 -->
    <div class="dashboard-text">name: {{ name }}</div>
  </div>
</template>

<script>
/**
 * 仪表盘页面组件
 * 作为系统首页，展示用户信息和数据概览
 */
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    // 从 Vuex 获取用户名
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
