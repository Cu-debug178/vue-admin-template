<template>
  <!-- 顶部导航栏组件 -->
  <div class="navbar">
    <!-- 侧边栏切换按钮 -->
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <!-- 面包屑导航 -->
    <breadcrumb class="breadcrumb-container" />

    <!-- 右侧菜单区域 -->
    <div class="right-menu">
      <!-- 用户头像下拉菜单 -->
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>Home</el-dropdown-item>
          </router-link>
          <a target="_blank" href="https://github.com/PanJiaChen/vue-admin-template/">
            <el-dropdown-item>Github</el-dropdown-item>
          </a>
          <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">
            <el-dropdown-item>Docs</el-dropdown-item>
          </a>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">Log Out</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
/**
 * 顶部导航栏组件
 * 包含侧边栏切换按钮、面包屑导航、用户头像下拉菜单
 */
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb' // 面包屑组件
import Hamburger from '@/components/Hamburger'   // 侧边栏切换按钮组件

export default {
  name: 'Navbar',
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    // 从 Vuex 获取状态
    ...mapGetters([
      'sidebar',  // 侧边栏状态
      'avatar'    // 用户头像
    ])
  },
  methods: {
    // 切换侧边栏展开/收起
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    // 登出操作
    async logout() {
      await this.$store.dispatch('user/logout')
      // 登出后跳转到登录页，并携带重定向参数
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  // 侧边栏切换按钮容器
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  // 面包屑容器
  .breadcrumb-container {
    float: left;
  }

  // 右侧菜单区域
  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    // 用户头像容器
    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
