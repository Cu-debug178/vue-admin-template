<template>
  <!-- 汉堡菜单按钮组件 -->
  <!-- 点击触发侧边栏展开/收起切换 -->
  <div style="padding: 0 15px;" @click="toggleClick">
    <svg
      :class="{'is-active':isActive}"
      class="hamburger"
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="64"
    >
      <!-- 三条横线的汉堡图标 -->
      <path d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1L298.7 519a8.84 8.84 0 0 0 0-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0 0 14.4 7z" />
    </svg>
  </div>
</template>

<script>
/**
 * 汉堡菜单按钮组件
 * 用于触发侧边栏的展开/收起切换
 * 接收 isActive prop 控制图标旋转状态
 */
export default {
  name: 'Hamburger',
  props: {
    /**
     * 是否处于激活状态
     * true - 侧边栏展开状态，图标旋转180度
     * false - 侧边栏收起状态
     */
    isActive: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    /**
     * 点击事件处理
     * 向父组件触发 toggleClick 事件
     */
    toggleClick() {
      this.$emit('toggleClick')
    }
  }
}
</script>

<style scoped>
.hamburger {
  display: inline-block;
  vertical-align: middle; // 垂直居中对齐
  width: 20px;
  height: 20px;
}

/* 激活状态时图标旋转180度 */
.hamburger.is-active {
  transform: rotate(180deg);
}
</style>
