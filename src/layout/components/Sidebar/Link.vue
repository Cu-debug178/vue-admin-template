<template>
  <!-- 根据链接类型渲染不同的元素 -->
  <component :is="type" v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script>
/**
 * 路由链接组件
 * 自动判断是渲染为 <router-link> 还是 <a> 标签
 */
import { isExternal } from '@/utils/validate'

export default {
  name: 'AppLink',
  props: {
    // 目标路径或链接
    to: {
      type: String,
      required: true
    }
  },
  computed: {
    // 判断是否为外部链接
    isExternal() {
      return isExternal(this.to)
    },
    // 决定渲染为什么组件
    type() {
      if (this.isExternal) {
        return 'a' // 外部链接渲染为 <a> 标签
      }
      return 'router-link' // 内部路由渲染为 <router-link>
    }
  },
  methods: {
    // 生成链接属性
    linkProps(to) {
      if (this.isExternal) {
        // 外部链接：打开新窗口
        return {
          href: to,
          target: '_blank',
          rel: 'noopener'
        }
      }
      // 内部路由：Vue Router 处理
      return {
        to: to
      }
    }
  }
}
</script>
