import axios from 'axios'

import { LoadingBar, Spin } from 'view-design';

import { USERINFO_KEY_IN_STORAGE, PREFIX } from '@/common/constant';
import { getToken, getMsgByCode, toggleMsg } from '@/utils';



// 所有的 axios 请求 ，默认请求前加上 LoadingBar ／ Spin

// 请求的url 配置在 config

axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    LoadingBar.start();
    Spin.show()
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    if (response.data.code != 200 && response.data.code != 400) {
        toggleMsg(getMsgByCode([response.data.code]), 'error')
        console.error(response)
        console.log(response)
        return Promise.reject(response);
    }
    if(response.data.code === 400){
        toggleMsg(response.data.paramList.join(','),'warning');
        console.error(response)
        console.log(response)
        return Promise.reject(response);
    }
    return response;
}, function (error) {
    console.log(error);
    toggleMsg(getMsgByCode([error.response.status]), 'error')
    LoadingBar.error();
    Spin.hide();
    // 对响应错误做点什么
    return Promise.reject(error);
});

const axiosErr = (err) => {
    console.log('请求错误统一打印 -> ', err);
    LoadingBar.error();
    Spin.hide();
    return Promise.reject(err);
}

export const get = (url, data) => {
    return axios.get(PREFIX + url, {
        params: data,
        headers: {
            'Authorization': getToken(USERINFO_KEY_IN_STORAGE)
        }
    }).catch(axiosErr);
}
export const post = (url, data) => {
    return axios.post(PREFIX + url, data,
        {
            headers: {
                'Authorization': getToken(USERINFO_KEY_IN_STORAGE)
            }
        }
    ).catch(axiosErr);
}

export const ajax_get = (vm, url, param, callback, errorCallback) => {
    axios({
        method: 'get',
        url: url,
        params: param || {},
    })
        .then(response => {
            callback(response);
        })
        .catch(error => {
            if (errorCallback) errorCallback(error)
        });
};

export const postFormData = (url, data) => {
    return axios.post(PREFIX + url, data, {
        headers: {
            'Authorization': getToken(USERINFO_KEY_IN_STORAGE),
            'Content-Type': 'application/x-www-form-urlencoded'   //hearder 很重要，Content-Type 要写对
        }
    })
};
