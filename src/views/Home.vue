<style scoped lang="less">
@import "~@/assets/less/index.less";
.layout {
  .el-header {
    padding: 0;
  }
}
</style>
<template>
  <div class="layout">
    <el-container>
      <el-header>
        <TheHeader :isCollapsed="isCollapsed" />
      </el-header>

      <el-container>
        <el-main>
          <el-aside :width="isCollapsed ? '64px' : '200px'">
            <TheSider :isCollapsed="isCollapsed" />
            <div class="collapsed-btn" @click="handleCollapse">
              <i
                :class="isCollapsed ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
              ></i>
            </div>
          </el-aside>

          <div
            class="layout__tag"
            :class="isCollapsed ? 'layout__tag--collapse' : ''"
          >
            <TheTag />
          </div>
          <div
            class="layout__container"
            :class="isCollapsed ? 'layout__container--collapse' : ''"
          >
            <router-view />
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import TheHeader from "@/components/layout/TheHeader.vue";
import TheSider from "@/components/layout/TheSider.vue";
import TheTag from "@/components/layout/TheTag.vue";
export default {
  name: "Home",
  components: {
    TheHeader,
    TheTag,
    TheSider
  },
  created() {
    this.$store.commit("getMenuList", this.$router.options.routes[0].children);
  },
  mounted() {},
  data() {
    return {
      isCollapsed: false
    };
  },
  computed: {},
  methods: {
    handleCollapse() {
      // 放在store里面会更好
      this.isCollapsed = !this.isCollapsed;
    }
  }
};
</script>
<style lang="less" scoped>
@import "~@/assets/less/index.less";
.layout {
  .el-aside {
    position: fixed;
    height: 100%;
    background-color: @bg-color-dark;
  }

  .el-main {
    background-color: @bg-color-light;
    padding: 0;
  }

  &__tag {
    margin: 10px 0 10px 200px;
    &--collapse {
      margin-left: 65px;
    }
  }

  &__container {
    background-color: @white;
    padding: 14px 16px;
    margin-left: 200px;
    &--collapse {
      margin-left: 65px;
    }
  }

  .collapsed-btn {
    position: absolute;
    bottom: 100px;
    font-size: 18px;
    left: 50%;
    transform: translateX(-50%);
    color: @white;
  }
}
</style>
