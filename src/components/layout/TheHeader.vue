<style lang="less" scoped>
.layout-logo{
    width: 40px;
    height: 30px;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
    background-size: 100% 100%;
    background-image: url("../../assets/images/logo.png")
}
.layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
}
</style>


<template>
  <Menu mode="horizontal"  active-name="1">
    <div class="layout-logo"></div>
    <div class="layout-nav">
      <MenuItem name="1">
        <Icon type="ios-navigate"></Icon>Item 1
      </MenuItem>
      <MenuItem name="2">
        <Icon type="ios-keypad"></Icon>Item 2
      </MenuItem>
      <MenuItem name="3">
        <Icon type="ios-analytics"></Icon>Item 3
      </MenuItem>
      <MenuItem name="4">
        <Icon type="ios-paper"></Icon>Item 4
      </MenuItem>
    </div>
  </Menu>
</template>

<script>
export default {
  name: "TheHad"
};
</script>
