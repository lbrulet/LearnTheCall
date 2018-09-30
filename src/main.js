import '@babel/polyfill'
import Vue from 'vue'
import Vuex from "vuex";
import App from './App.vue'
import Login from './views/Login.vue'
import Home from './views/Home.vue'
import router from './router'
import store from './store/store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader

Vue.use(Vuex);
Vue.use(Vuetify);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  Login,
  Home,
  render: h => h(App)
}).$mount('#app')
