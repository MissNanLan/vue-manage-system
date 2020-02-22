import Vue from "vue";
import Vuex from "vuex";
import secondAaMoudle from "@/views/firstAa/store";
import { uniqBy } from "lodash";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    menuList: [],
    subMenuList: [],
    tagList: []
  },
  getters: {},
  mutations: {
    getMenuList(state, menuList) {
      state.menuList = menuList;
    },
    
    // 渲染子菜单
    renderSubMenu(state, index) {
      state.menuList.map((menu, i) => {
        if (!menu.meta.isLeaf) {
          if (index == i) {
            state.subMenuList = menu.children;
          }
        }
      });
    },

   // 添加tag
    addTag(state, menu) {
      let _tagList = [];
      state.tagList.push(menu);
      // lodash 的 uniBy 去重
      _tagList = uniqBy(state.tagList, "path");
      state.tagList = _tagList;
    },

    // 移除tag
    removeTag(state, menu) {
      state.tagList.map((item, index) => {
        if (item.path == menu.path) {
          state.tagList.splice(index, 1);
        }
      });
    }
  },
  actions: {},
  modules: {
    secondAaMoudle
  }
});
