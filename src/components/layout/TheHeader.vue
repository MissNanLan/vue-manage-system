<style lang="less" scoped>
.layout-header {
  width: 95%;
  margin: 0 auto;
  &__logo {
    width: 40px;
    height: 30px;
    border-radius: 3px;
    float: left;
    margin-top: 15px;
    background-size: 100% 100%;
    background-image: url("../../assets/images/logo.png");
  }
  &__user {
    float: right;
  }
}
</style>
<template>
  <Menu mode="horizontal">
    <div class="layout-header">
      <router-link to="/">
        <div class="layout-header__logo"></div>
      </router-link>
      <div class="layout-header__user">
        <Dropdown trigger="click" style="margin-left: 20px">
          <a href="javascript:void(0)">
            admin
            <Icon type="md-arrow-dropdown" />
          </a>
          <DropdownMenu slot="list">
            <DropdownItem>退出</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  </Menu>
</template>

<script>
import { navigateToLogin } from "@/utils";
export default {
  name: "TheHeader",
  methods: {
    // 退出
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
    }
  }
};
</script>
