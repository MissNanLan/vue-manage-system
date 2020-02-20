import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ViewUI from 'view-design';
import lodash from 'lodash';
import axios from '@/service';

import '@/assets/fonts/iconfont.css';
import '@/assets/less/index.less'
import Auth from '@/directives/auth';
import DemoComponent from '@/components/DemoComponent';

Vue.config.productionTip = false
Vue.prototype.$http = axios;
Vue.prototype._ = lodash

Vue.use(ViewUI);
Vue.component('DemoComponent',DemoComponent)
//注册按钮权限指令
Vue.use(Auth);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
