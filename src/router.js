import Vue from "vue";
import Router from "vue-router";
import LoginComponent from "./views/Login.vue";
import Home from "./views/Home.vue";
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
      component: LoginComponent,
      meta: {
        title: "Login Page - LearnTheCall"
      },
      beforeEnter: (to, from, next) => {
        if (store.state.token != null) {
          next({ path: "/home" });
        } else {
          next();
        }
      }
    },
    {
      path: "/home",
      name: "home",
      component: Home,
      meta: {
        title: "Home Page - LearnTheCall"
      },
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

// router.beforeEach((to, from, next) => {
//   //Si quelqu'un veut mettre un middleware avant chaque route.
//   next();
// });

export default router;