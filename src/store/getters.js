/**
 * Vuex 全局 Getters
 * 提供对各个模块状态的统一访问接口
 */
const getters = {
  sidebar: state => state.app.sidebar, // 侧边栏状态
  device: state => state.app.device,   // 设备类型（desktop/mobile）
  token: state => state.user.token,    // 用户 token
  avatar: state => state.user.avatar,  // 用户头像
  name: state => state.user.name       // 用户名称
}
export default getters
