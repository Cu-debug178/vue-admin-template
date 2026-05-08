<template>
  <!-- 如果不是隐藏菜单，则渲染菜单项 -->
  <div v-if="!item.hidden">
    <!-- 只有一个显示的子菜单时，直接显示子菜单（不显示父级） -->
    <template v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow">
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
          <!-- 渲染菜单项图标和标题 -->
          <item :icon="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)" :title="onlyOneChild.meta.title" />
        </el-menu-item>
      </app-link>
    </template>

    <!-- 有多个子菜单时，显示带子菜单的父级 -->
    <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template slot="title">
        <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title" />
      </template>
      <!-- 递归渲染子菜单 -->
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script>
/**
 * 侧边栏菜单项组件
 * 负责递归渲染侧边栏菜单
 */
import path from 'path'
import { isExternal } from '@/utils/validate'
import Item from './Item'
import AppLink from './Link'
import FixiOSBug from './FixiOSBug'

export default {
  name: 'SidebarItem',
  components: { Item, AppLink },
  mixins: [FixiOSBug], // 混入 iOS 兼容处理
  props: {
    // 路由对象
    item: {
      type: Object,
      required: true
    },
    // 是否是嵌套菜单
    isNest: {
      type: Boolean,
      default: false
    },
    // 基础路径
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    // 解决某些情况下的 Bug
    this.onlyOneChild = null
    return {}
  },
  methods: {
    /**
     * 判断是否只有一个显示的子菜单
     */
    hasOneShowingChild(children = [], parent) {
      // 过滤出需要显示的子菜单
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // 临时保存（如果只有一个显示的子菜单时会用到）
          this.onlyOneChild = item
          return true
        }
      })

      // 如果只有一个子菜单，显示子菜单
      if (showingChildren.length === 1) {
        return true
      }

      // 如果没有子菜单显示，显示父级（将父级作为唯一菜单项）
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ... parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    },
    /**
     * 解析路径，处理相对路径和外部链接
     */
    resolvePath(routePath) {
      // 如果是外部链接，直接返回
      if (isExternal(routePath)) {
        return routePath
      }
      // 如果基础路径是外部链接，返回基础路径
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      // 解析相对路径
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>
