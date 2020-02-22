import axios from "./axios";
import { USERINFO_KEY_IN_STORAGE, PREFIX } from "@/common/constant";
// import { Loading } from 'element-ui';
import { getToken } from "@/utils";

// const loadingInstance = Loading.service({fullscreen:true});
const axiosErr = err => {
  console.log("请求错误统一打印 -> ", err);
  // Loading.error();
  // Spin.hide();
  return Promise.reject(err);
};

export const get = (url, data) => {
  return axios
    .get(PREFIX + url, {
      params: data,
      headers: {
        Authorization: getToken(USERINFO_KEY_IN_STORAGE)
      }
    })
    .catch(axiosErr);
};
export const post = (url, data) => {
  return axios
    .post(PREFIX + url, data, {
      headers: {
        Authorization: getToken(USERINFO_KEY_IN_STORAGE)
      }
    })
    .catch(axiosErr);
};

export const ajax_get = (vm, url, param, callback, errorCallback) => {
  axios({
    method: "get",
    url: url,
    params: param || {}
  })
    .then(response => {
      callback(response);
    })
    .catch(error => {
      if (errorCallback) errorCallback(error);
    });
};

export const postFormData = (url, data) => {
  return axios.post(PREFIX + url, data, {
    headers: {
      Authorization: getToken(USERINFO_KEY_IN_STORAGE),
      "Content-Type": "application/x-www-form-urlencoded" //hearder 很重要，Content-Type 要写对
    }
  });
};

export default { get, post, postFormData };
