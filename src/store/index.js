import Vue from 'vue'
import Vuex from 'vuex'
import customerManageMoudule from "@/views/customerManage/store";
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    meunList: [
      {
        name: "基础数据管理",
        icon: '',
        path: ''
      },
      {
        name: "用户管理",
        icon: '',
        path: "/userManage",
        routeName:'userManage'
      },
      {
        name: "客户管理",
        icon: '',
        path: "/customerManage",
        routeName:'customerManage'
      },
      {
        name: "客户访问记录",
        icon: '',
        path: ''
      }
    ]
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    customerManageMoudule
  }
})
