// util 提供的方法
// 在  readme 文件中 也写一份
// 每次 util 添加方法，请备注好
// clone 数据的复制
// toggleMsg 全局提示一个msg
// checkSelectedLines 检查列表的数据的个数，是否符合要求
// getStorage 获取缓存
// setStorage 设置缓存
// navigateToLogin 去登录页面

import { apiBaseUrl } from "@/common/constant";
import { Message, Modal } from "view-design";


export const toggleMsg = (msg, toggleType) => {
  if (!msg) {
    console.error("toggleMsg 请传递参数...");
    return;
  }

  if (Message[toggleType]) {
    Message[toggleType](msg);

    return;
  }

  // 默认成功的提示
  Message.success(msg);
};
// 检查选中行 是否符合 要求
export const checkSelectedLines = (lines, needCheck, maxNum) => {
  return new Promise(function(res, rej) {
    if (needCheck) {
      if (!lines || !lines.length) {
        toggleMsg("请选择一行", "warning");

        rej("请选择一行");

        return;
      }

      if (maxNum == 1 && lines.length != 1) {
        toggleMsg("只能选择一行", "warning");

        rej("只能选择一行");

        return;
      }
    }
    res(true);
  }).catch(err => {
    console.log(err);

    return false;
  });
};

if (!localStorage) {
  window.localStorage = {
    setItem: function(key, data) {
      this[key] = data;
    },
    removeItem: function(key) {
      this[key] = undefined;
      delete this[key];
    },
    getItem: function(key) {
      return this[key];
    }
  };
}
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

const codeMap = {
  "502": "网络出错",
  "400": "网络出错",
  "-1": "系统级异常",
  "10001": "用户未登录",
  "10002": "无效访问(不在系统允许的访问路径内)",
  "10003": "登录失败: 账号密码错误",
  "10004": "用户无权限",
  "10007": "没有数据",
  "11000": "重复添加",
  "12000": "文件类型错误"
};

export const getCodeMap = () => {
  return codeMap;
};

export const getMsgByCode = code => {
  if (code == "10001") {
    Modal.error({
      title: "温情提示",
      content: "您的会话已经超时，请重新登录",
      onOk: () => {
        navigateToLogin();
      }
    });
    return;
  }
  if (!code) {
    console.error("method named getMsgByCode need arg , bug get null");
    return false;
  }
  if (!codeMap[code]) {
    console.error("没有对应的 code");
    return false;
  }
  return codeMap[code];
};

/**
 * @param vm Vue实例
 * @param menu 菜单选项
 */
export const openTag = (vm, name) => { 
  let _openedTagList = vm.$store.state.menuList;
  let _menu;
  _openedTagList.map(item => { 
    if (item.routeName == name) { 
      _menu = item;
    }
  })
  if (_openedTagList.length >= 0) {
    vm.$store.commit('addTag', _menu);
  } 
}