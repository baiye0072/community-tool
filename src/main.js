import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import routers from './router';
import VueRouter from 'vue-router';
// main.js


Vue.use(ElementUI);
Vue.use(VueRouter);

const router= new VueRouter({
  mode: 'history',
  routes: routers
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});