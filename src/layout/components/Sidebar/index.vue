<template>
  <!-- 侧边栏容器 -->
  <div :class="{'has-logo':showLogo}">
    <!-- Logo 组件（根据配置显示） -->
    <logo v-if="showLogo" :collapse="isCollapse" />
    <!-- 滚动容器 -->
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <!-- 侧边栏菜单 -->
      <el-menu
        :default-active="activeMenu"      // 当前激活的菜单项
        :collapse="isCollapse"           // 是否折叠
        :background-color="variables.menuBg"       // 背景颜色
        :text-color="variables.menuText"           // 文字颜色
        :unique-opened="false"           // 是否只展开一个子菜单
        :active-text-color="variables.menuActiveText" // 激活状态文字颜色
        :collapse-transition="false"     // 禁用折叠动画
        mode="vertical"                  // 垂直模式
      >
        <!-- 遍历路由生成菜单项 -->
        <sidebar-item
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
/**
 * 侧边栏组件
 * 负责渲染导航菜单，支持折叠展开功能
 */
import { mapGetters } from 'vuex'
import Logo from './Logo'         // Logo 组件
import SidebarItem from './SidebarItem' // 菜单项组件
import variables from '@/styles/variables.scss' // 样式变量

export default {
  name: 'Sidebar',
  components: { SidebarItem, Logo },
  computed: {
    // 从 Vuex 获取侧边栏状态
    ...mapGetters([
      'sidebar'
    ]),
    // 获取所有路由配置
    routes() {
      return this.$router.options.routes
    },
    // 当前激活的菜单路径
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // 如果配置了 activeMenu，则使用配置的路径高亮
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    // 是否显示 Logo
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    // 样式变量
    variables() {
      return variables
    },
    // 是否处于折叠状态
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
