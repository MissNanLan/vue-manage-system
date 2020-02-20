<style scoped lang="less">
@import "../assets/less/index.less";

.layout {
  background: @bg-color;
  position: relative;
  border-radius: 4px;
  overflow: hidden;

  .ivu-layout-header {
    padding: 0;
    background: @white;
  }
  .ivu-layout-sider {
    height: calc(100vh - 64px);
  }
}

.layout-logo {
  width: 100px;
  height: 30px;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}

.layout-tag {
  display: flex;
  position: fixed;
}
</style>
<template>
  <div class="layout">
    <Layout>
      <Header :style="{ position: 'fixed', width: '100%' }">
        <TheHeader></TheHeader>
      </Header>
      <Layout :style="{ 'margin-top': '64px' }">
        <Sider collapsible :collapsed-width="78" v-model="isCollapsed">
          <TheSider :isCollapsed="isCollapsed"></TheSider>
        </Sider>

        <Layout :style="{ padding: '0 0 0 10px' }">
            <TheTag></TheTag>
          <Content :style="{ background: '#fff',}">
            <router-view></router-view>
          </Content>
        </Layout>
      </Layout>
    </Layout>
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
  data() {
    return {
      isCollapsed: false
    };
  },
  computed: {}
};
</script>
