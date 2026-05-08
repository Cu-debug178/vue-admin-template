<script>
/**
 * 菜单项组件
 * 负责渲染菜单项的图标和标题
 * 使用函数式组件提高渲染性能
 */
export default {
  name: 'MenuItem',
  functional: true, // 函数式组件，无状态
  props: {
    // 图标名称
    icon: {
      type: String,
      default: ''
    },
    // 菜单标题
    title: {
      type: String,
      default: ''
    }
  },
  render(h, context) {
    const { icon, title } = context.props
    const vnodes = []

    // 渲染图标
    if (icon) {
      // Element UI 内置图标（如 el-icon-xxx）
      if (icon.includes('el-icon')) {
        vnodes.push(<i class={[icon, 'sub-el-icon']} />)
      } else {
        // SVG 图标
        vnodes.push(<svg-icon icon-class={icon}/>)
      }
    }

    // 渲染标题
    if (title) {
      vnodes.push(<span slot='title'>{(title)}</span>)
    }

    return vnodes
  }
}
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
</style>
