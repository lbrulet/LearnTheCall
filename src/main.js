import '@babel/polyfill'
import Vue from 'vue'
import Vuex from "vuex";
import App from './App.vue'
import Login from './views/Authentification/Login.vue'
import Register from './views/Authentification/Register.vue'
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
  Register,
  Home,
  render: h => h(App)
}).$mount('#app')
