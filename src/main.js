import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './util/interceptor'
import VueAxios from 'vue-axios'
import echarts from 'echarts'
import ElementUI from 'element-ui';
import "./style/main.scss";
import 'element-ui/lib/theme-chalk/index.css';
import Valid from "./util/valid";
import oComponents from "./util/customComponents";
import imgBaseUrl from "./util/imgBaseUrl"
import './style/element-variables.scss'

Vue.config.productionTip = false

Vue.use(VueAxios, axios);
Vue.use(ElementUI);
Vue.use(Valid);
Vue.use(oComponents);
Vue.prototype.$echarts = echarts;
imgBaseUrl();

// /enterprise_service_center/
axios.defaults.baseURL = 'http://39.98.54.35:8081/enterprise_service_center';//原先URL
// axios.defaults.baseURL = 'http://192.168.1.112:8077/digital-certificate/'; //证书管理url

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
