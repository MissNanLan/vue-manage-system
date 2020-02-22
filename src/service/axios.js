import axios from 'axios'


axios.interceptors.request.use(function (config) {

    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    if (response.data.code != 200 && response.data.code != 400) {
        console.error(response)
        console.log(response)
        return Promise.reject(response);
    }
    if(response.data.code === 400){
        console.error(response)
        console.log(response)
        return Promise.reject(response);
    }
    return response;
}, function (error) {
    console.log(error);
    return Promise.reject(error);
});



export default axios;