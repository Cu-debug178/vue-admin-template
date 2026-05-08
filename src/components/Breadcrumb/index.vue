<template>
  <!-- 面包屑导航组件 -->
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
        <!-- 最后一个面包屑项显示为纯文本，不可点击 -->
        <span v-if="item.redirect==='noRedirect'||index==levelList.length-1" class="no-redirect">{{ item.meta.title }}</span>
        <!-- 其他面包屑项可以点击跳转 -->
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
/**
 * 面包屑导航组件
 * 根据当前路由自动生成面包屑路径
 * 用于帮助用户了解当前所在位置并支持快速导航
 */
import pathToRegexp from 'path-to-regexp'

export default {
  name: 'Breadcrumb',
  data() {
    return {
      levelList: null // 面包屑列表数据
    }
  },
  watch: {
    // 监听路由变化，路由变化时重新生成面包屑
    $route() {
      this.getBreadcrumb()
    }
  },
  created() {
    // 组件创建时初始化面包屑
    this.getBreadcrumb()
  },
  methods: {
    /**
     * 获取面包屑列表
     * 从路由匹配记录中筛选出有 meta.title 的路由作为面包屑
     */
    getBreadcrumb() {
      // 过滤出有标题的路由
      let matched = this.$route.matched.filter(item => item.meta && item.meta.title)
      const first = matched[0]

      // 如果第一个不是首页，手动添加首页作为面包屑起始
      if (!this.isDashboard(first)) {
        matched = [{ path: '/dashboard', meta: { title: 'Dashboard' }}].concat(matched)
      }

      // 过滤掉 breadcrumb: false 的路由
      this.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
    },
    /**
     * 判断路由是否为首页
     */
    isDashboard(route) {
      const name = route && route.name
      if (!name) {
        return false
      }
      // 忽略大小写比较
      return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
    },
    /**
     * 编译路径，处理动态路由参数
     * @param {string} path - 路由路径
     */
    pathCompile(path) {
      const { params } = this.$route
      // 使用 path-to-regexp 编译路径，替换动态参数
      var toPath = pathToRegexp.compile(path)
      return toPath(params)
    },
    /**
     * 处理面包屑点击事件
     * @param {Object} item - 面包屑项
     */
    handleLink(item) {
      const { redirect, path } = item
      // 如果有 redirect 配置，优先跳转 redirect
      if (redirect) {
        this.$router.push(redirect)
        return
      }
      // 否则跳转到当前路径
      this.$router.push(this.pathCompile(path))
    }
  }
}
</script>

<style lang="scss" scoped>
// 面包屑容器样式
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  // 不可点击的面包屑文本样式（当前页）
  .no-redirect {
    color: #97a8be;
    cursor: text; // 鼠标样式为文本
  }
}
</style>
