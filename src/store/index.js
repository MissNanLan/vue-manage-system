import Vue from "vue";
import Vuex from "vuex";
import customerManageMoudule from "@/views/customerManage/store";
import { uniqBy } from "lodash";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    menuList: [
      {
        menuName: "基础数据管理",
        icon: "ias-icon-shuju",
        path: "/basicDataManage",
        routeName: "basicDataManage"
      },
      {
        menuName: "用户管理",
        icon: "ias-icon-yonghu",
        path: "/userManage",
        routeName: "userManage"
      },
      {
        menuName: "客户管理",
        icon: "ias-icon-kehu",
        path: "/customerManage",
        routeName: "customerManage"
      },
      {
        menuName: "客户访问记录",
        icon: "ias-icon-lishi",
        path: "/viewRecord",
        routeName: "viewRecord"
      }
    ],
    tagList: []
  },
  getters: {},
  mutations: {
    addTag(state, menu) {
      let _tagList = [];
      state.tagList.push(menu);
      // lodash 的 uniBy 去重
      _tagList = uniqBy(state.tagList,'routeName');
      state.tagList = _tagList;
    },
    removeTag(state, menu) { 
      state.tagList.map((item,index) => { 
        if (item.routeName == menu.routeName) { 
          state.tagList.splice(index,1) 
        }
      })
    }
  },
  actions: {},
  modules: {
    customerManageMoudule
  }
});
