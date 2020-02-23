import { apiBaseUrl } from "@/common/constant";

export const getStorage = key => {
  if (localStorage && localStorage.getItem(key)) {
    return JSON.parse(localStorage.getItem(key));
  }
  return null;
};

export const setStorage = (key, data) => {
  if (localStorage) {
    localStorage.setItem(key, JSON.stringify(data));
  }
};

export const removeStorage = key => {
  if (localStorage) {
    localStorage.removeItem(key);
  }
};

export const getToken = key => {
  if (localStorage && localStorage.getItem(key)) {
    const userInfo = JSON.parse(localStorage.getItem(key));
    if (userInfo.token) {
      return "Bearer " + userInfo.token;
    }
  }
  return "";
};

export const navigateToLogin = () => {
  localStorage.clear();
  location.href = location.origin || apiBaseUrl;
};

/**
 * @param vm Vue实例
 * @param menu 菜单选项
 */
export const openTag = (vm, path) => {
  let _openedTagList = vm.$store.state.menuList;
  let _menu;
  _openedTagList.map(menu => {
    if (!menu.meta.isLeaf) {
      menu.children.map(subMenu => {
        // 二级菜单没有三级菜单的时候
        if (subMenu.meta.isLeaf) {
          if (path == subMenu.path) {
            _menu = subMenu;
            vm.$store.commit("addTag", _menu);
          }
        } else {
          subMenu.children.map(item => {
            if (path == item.path) {
              _menu = item;
              vm.$store.commit("addTag", _menu);
            }
          });
        }
      });
    }
  });
};
