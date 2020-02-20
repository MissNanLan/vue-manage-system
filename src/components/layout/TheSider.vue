<template>
  <div class="sider">
    <Menu theme="dark" width="auto" :active-name="$route.name"   @on-select="selectMenuItem">
      <MenuItem
        :name="menu.routeName"
        v-for="menu in navs"
        :key="menu.id"
        class="menu-item"
        :class="isCollapsed?'menu-item--colsed':''"
        :to="menu.path" >
        <i class="ias" :class="menu.icon"></i>
        <span>{{ menu.menuName }}</span>
      </MenuItem>

      <!-- <Submenu name="1" v-for="menu in navs" :key="menu.id">
          <template slot="title">
            <Icon type="ios-navigate"></Icon>{{menu.name}}
          </template>
        </Submenu>
        
        <Submenu name="2">
          <template slot="title">
            <Icon type="ios-keypad"></Icon>Item 2
          </template>
          <MenuItem name="2-1">Option 1</MenuItem>
          <MenuItem name="2-2">Option 2</MenuItem>
      </Submenu>-->
    </Menu>
  </div>
</template>

<script>
// import authority from "@/common/authority";
// import menus from "@/common/menu";
import store from "@/store";
import { openTag } from '@/utils'
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
      userName: "",
      companyName: ""
    };
  },
  mounted() {},
  watch: {},

  computed: {
    navs: function() {
      let navs = store.state.menuList;
      // var navs = menus.getMenuByAuthority();
      // navs.sort(function(a, b) {
      //   return a.index - b.index;
      // });

      // var subs = store.getters.getSubMenus; //获取二级菜单
      // var subMenu = [];
      // subs.forEach((sub, index) => {
      //     subMenu.push({
      //         index: index,
      //         icon: "ios-arrow-forward",
      //         title: sub.locationName,
      //         name: "control-center?locId=" + sub.id
      //     });
      // });
      // menus.setSubMenu(subMenu, "control-center");
      return navs;
    }
  },

  methods: {
    selectMenuItem(menu){
     openTag(this,menu)
    }
  }
};
</script>

<style lang="less" scoped>
.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 100px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}
.menu-item--colsed span{
  width: 0;
}

.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}
.collapsed-menu span {
  width: 0px;
  transition: width 0.2s ease;
}
.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
}
</style>
