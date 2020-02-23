<template>
  <div class="sider">
    <el-menu
      :default-active="currentPath"
      class="el-menu-vertical-demo"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse="isCollapsed"
    >
      <template v-for="menu in sideMenuList">
        <template v-if="!menu.meta.isLeaf">
          <el-submenu :index="menu.path" :key="menu.id">
            <template slot="title"
              ><i class="el-icon-menu"></i>
              <span slot="title">{{ menu.meta.title }}</span></template
            >
            <el-menu-item
              v-for="subMenu in menu.children"
              :key="subMenu.id"
              :index="subMenu.path"
            >
              <i class="el-icon-menu"></i>
              {{ subMenu.meta.title }}
            </el-menu-item>
          </el-submenu>
        </template>

        <template v-else>
          <el-menu-item :index="menu.path" :key="menu.id">
            <i class="el-icon-menu"></i>
            <span>{{ menu.meta.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { openTag } from "@/utils";
export default {
  name: "TheSider",
  props: {
    isCollapsed: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      
    };
  },

  mounted() {

  },

  computed: {
    sideMenuList() {
      return this.$store.state.subMenuList;
    },
    currentPath(){
      console.log(this.$store.state.currentPath);
      return this.$store.state.currentPath;
    }
  },

  methods: {
    handleSelect(path) {
      console.log(path);
      this.$router.push(path);
      openTag(this, path);
    },
  }
};
</script>

<style lang="less" scoped>
@import "~@/assets/less/index.less";
.sider {
  .el-menu {
    border-right: none;
  }
}
</style>
