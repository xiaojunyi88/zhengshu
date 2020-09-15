import axios from 'axios'
import { Message } from 'element-ui';


axios.interceptors.request.use(req => {
    req.headers.authToken = '';
    let localAuth = localStorage.getItem('Auth');
    // 登陆后有auth 各种请求取enterpriseId 加入请求体。没登陆不管
    if(localAuth){
        let service_enprise_id = JSON.parse(localAuth).enterpriseId||JSON.parse(localAuth).enterpriseId;
        let area_code = JSON.parse(localAuth).districtCode;
        // 哪个请求体里有值就放哪个里面
        if(req.params||req.method === 'get'){
            req.params = {service_enprise_id: service_enprise_id, area_code:area_code, ...req.params}
        } else if(req.data) {
            req.data = {service_enprise_id: service_enprise_id, area_code:area_code, ...req.data}
        }
    }

    return req;
}, error => {
    return Promise.reject(error)
})

axios.interceptors.response.use(res => {
    return res.data;
}, error => {
    if(error.toString().indexOf("Network Error") != -1){
        Message({
            type: "error",
            message: "网络错误或超时"
        })
    }
    return Promise.reject(error)
});

axios.defaults.baseURL=process.env.VUE_APP_BASEURL;

export default axios;
