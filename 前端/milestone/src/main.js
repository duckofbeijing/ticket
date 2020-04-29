/* eslint-disable */
import Vue from "vue";

import router from "./router";
import store from "./store";

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import echarts from 'echarts'
import App from "./App.vue";
// import less from 'less'
// Vue.use(less)
Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.prototype.$echart = echarts
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
