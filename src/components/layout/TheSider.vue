

<template>
  <div class="sider">
    <!-- <div class="menu-item userInfo">
            <p>{{this.companyName}}</p>
            <p>
                <span style="font-size:20px">
                    <Icon type="ios-contact"/>
                </span>
                {{this.userName}}
                <span
                    @click="signOut"
                    style="margin-left: 10px;cursor: pointer"
                >退出</span>
            </p>
    </div>-->

    <!-- <div v-for="(menu,index) in navs" :key="index" class="menu-item">
            <router-link
                :to="menu.name"
                class="menu-link"
                @click="navClick(menu)"
                :class="{'menu-selected' :menu.selected}"
            >
                <Icon :type="menu.icon" class="menu-icon"/>
                {{menu.title}}
            </router-link>
    </div>-->

    <Menu active-name="0" theme="dark" width="auto">
      <MenuItem
        :name="index"
        v-for="(menu,index) in navs"
        :key="menu.id"
        class="menu-item"
        :class="isCollapsed? 'collapsed-menu' : ''"
        :to="menu.path"
      >
        <Icon type="ios-navigate"></Icon>
        <span>{{menu.name}}</span>
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
// import { getStorage, variableTypeMatched } from "@/utils";
import { USERINFO_KEY_IN_STORAGE } from "@/common/constant";
import { removeStorage, needLogin } from "@/utils";
import { post } from "@/common/axios";
// import authority from "@/common/authority";
// import menus from "@/common/menu";
import store from "@/store";
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
  mounted() {
    // post("/user/get")
    //     .then(res => {
    //         this.companyName = res.data.result.companyName;
    //         this.userName = res.data.result.userName;
    //     })
    //     .catch(res => {
    //         console.error(res);
    //     });
  },
  watch: {},
  computed: {
    navs: function() {
      let navs = store.state.meunList;
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
    nagivateTo(path) {
      console.log(111)
      if (path) {
        this.$router.push({ path: path });
        console(11)
      }
    },

    navClick() {
      // menu.selected = true;
    },
    // 退出
    signOut() {
      this.$Spin.show();
      post("/logout")
        .then(res => {
          this.$Spin.hide();
          if (res.data && res.data.success) {
            removeStorage(USERINFO_KEY_IN_STORAGE);
            store.commit("clearUserInfo");
            needLogin();
          }
        })
        .catch(error => {
          console.log(error);
        });
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
