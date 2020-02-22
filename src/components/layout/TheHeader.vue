<style lang="less" scoped>
@import "~@/assets/less/index.less";

.header {
  display: flex;
  background-color: rgb(84, 92, 100);
  color: @white;

  &__logo {
    display: flex;
    justify-content: center;
    width: 198px;
    height: 58px;
    line-height: 58px;
    border-bottom: 1px solid #000;
    border-right: 1px solid #000;
    margin-bottom: 1px;
    margin-right: 1px;

    &--collapse {
      width: 65px;
    }

    .logo__img {
      margin-top: 10px;
      width: 50px;
      height: 40px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .logo__text {
      color: @white;
      padding: 0 10px;
      &--collapse {
        display: none;
      }
    }
  }

  &__nav {
    flex-basis: 80%;
    .el-menu.el-menu--horizontal {
      border-bottom: none;
    }
  }

  &__sign {
    line-height: 60px;
    .el-dropdown {
      color: @white;
    }
  }
}
</style>
<template>
  <div class="header">
    <router-link to="/">
      <div
        class="header__logo"
        :class="isCollapsed ? 'header__logo--collapse' : ''"
      >
        <div class="logo__img">
          <img src="../../assets/images/logo.png" />
        </div>
        <div
          class="logo__text"
          :class="isCollapsed ? 'logo__text--collapse' : ''"
        >
          <span>车车综合管理</span>
        </div>
      </div>
    </router-link>
    <div class="header__nav">
      <el-menu
        :default-active="currentPath"
        class="el-menu-header"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item
          v-for="(menu, index) in headMenuList"
          :key="menu.id"
          :index="menu.path"
          @click="handleSelect(menu.path, index)"
        >
          {{ menu.meta.title }}
        </el-menu-item>
      </el-menu>
    </div>
    <div class="header__sign">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link ">
          <i class="iconfont icon-user"></i> {{ nickname || "admin" }}
          <i class="el-icon-caret-bottom"></i
        ></span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <div @click="jumpTo('/user/profile')">
              <span style="color: #555;font-size: 14px;">个人信息</span>
            </div>
          </el-dropdown-item>
          <el-dropdown-item>
            <div @click="jumpTo('/user/changepwd')">
              <span style="color: #555;font-size: 14px;">修改密码</span>
            </div>
          </el-dropdown-item>
          <el-dropdown-item divided @click.native="logout"
            >退出登录</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { navigateToLogin } from "@/utils";
export default {
  name: "TheHeader",
  props: {
    isCollapsed: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentPath: "",
      nickname: ""
    };
  },
  watch: {},

  computed: {
    headMenuList() {
      return this.$store.state.menuList;
    }
  },

  mounted() {
    this.$store.commit("renderSubMenu", 0);
    this.$router.push(this.currentPath);
  },
  methods: {
    signOut() {
      this.$Spin.show();
      this.$http
        .post("/logout")
        .then(res => {
          this.$Spin.hide();
          if (res.data && res.data.success) {
            navigateToLogin();
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleSelect(path, index) {
      this.$store.commit("renderSubMenu", index);
      this.currentPath = path;
      this.$router.push(path);
    }
  }
};
</script>
