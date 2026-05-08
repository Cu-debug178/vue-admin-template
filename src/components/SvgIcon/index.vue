<template>
  <!-- 外部链接图标：使用 mask 方式渲染 -->
  <div v-if="isExternal" :style="styleExternalIcon" class="svg-external-icon svg-icon" v-on="$listeners" />
  <!-- 本地 SVG 图标：使用 symbol 引用的方式 -->
  <svg v-else :class="svgClass" aria-hidden="true" v-on="$listeners">
    <!-- use 元素引用定义好的 symbol -->
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
/**
 * SVG 图标组件
 * 统一管理项目中的所有 SVG 图标
 * 
 * 使用方式：
 * <svg-icon icon-class="user" /> - 渲染本地图标
 * <svg-icon icon-class="https://xxx.com/icon.svg" /> - 渲染外部链接图标
 * 
 * 本地图标需要先在 icons/svg/ 目录下添加对应的 .svg 文件
 */
import { isExternal } from '@/utils/validate'

export default {
  name: 'SvgIcon',
  props: {
    /**
     * 图标名称（必需）
     * 本地图标：传入图标文件名（不含 .svg 后缀）
     * 外部图标：传入完整 URL
     */
    iconClass: {
      type: String,
      required: true
    },
    /**
     * 自定义 CSS 类名（可选）
     * 用于添加额外的样式
     */
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    /**
     * 判断是否为外部链接图标
     */
    isExternal() {
      return isExternal(this.iconClass)
    },
    /**
     * SVG symbol 的引用名称
     * 格式：#icon-{图标名称}
     */
    iconName() {
      return `#icon-${this.iconClass}`
    },
    /**
     * SVG 图标的类名
     */
    svgClass() {
      if (this.className) {
        return 'svg-icon ' + this.className
      } else {
        return 'svg-icon'
      }
    },
    /**
     * 外部链接图标的样式
     * 使用 CSS mask 实现背景遮罩效果
     */
    styleExternalIcon() {
      return {
        mask: `url(${this.iconClass}) no-repeat 50% 50%`,
        '-webkit-mask': `url(${this.iconClass}) no-repeat 50% 50%`
      }
    }
  }
}
</script>

<style scoped>
/* SVG 图标基础样式 */
.svg-icon {
  width: 1em;     // 图标宽度继承父元素字体大小
  height: 1em;    // 图标高度继承父元素字体大小
  vertical-align: -0.15em; // 垂直对齐微调
  fill: currentColor; // 图标颜色继承文字颜色
  overflow: hidden;
}

/* 外部图标样式 */
.svg-external-icon {
  background-color: currentColor; // 背景色继承文字颜色
  mask-size: cover!important;    // 遮罩尺寸覆盖整个元素
  display: inline-block;
}
</style>
