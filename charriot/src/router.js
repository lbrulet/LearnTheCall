import Vue from "vue";
import Router from "vue-router";
import LoginComponent from "./views/Login.vue";
import SecureComponent from "./views/Secure.vue";
import store from "./store/store.js";

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: "/",
      redirect: {
        name: "login"
      }
    },
    {
      path: "/login",
      name: "login",
      component: LoginComponent
    },
    {
      path: "/secure",
      name: "secure",
      component: SecureComponent,
      beforeEnter: (to, from, next) => {
        if (store.state.token == null) {
          next({ path: "/login" });
        } else {
          next();
        }
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  //Si quelqu'un veut mettre un middleware avant chaque route.
  next();
});

export default router;
