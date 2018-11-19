import Vue from "vue";
import Router from "vue-router";
import LoginComponent from "./views/Authentification/Login.vue";
import RegisterComponent from "./views/Authentification/Register.vue";
import Home from "./views/Home.vue";
import store from "./store/store.js";
import game from "./views/Game.vue";

Vue.use(Router);

let router = new Router({
  mode: 'history',
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
      meta: {title: 'LearnTheCall - Login'},
      component: LoginComponent,
      beforeEnter: (to, from, next) => {
        if (store.state.token != null) {
          next({ path: "/home" });
        } else {
          next();
        }
      }
    },
    {
      path: "/register",
      name: "register",
      component: RegisterComponent,
      meta: {title: 'LearnTheCall - Register'},
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
      meta: {title: 'LearnTheCall - Home'},
      beforeEnter: (to, from, next) => {
        if (store.state.token == null) {
          next({ path: "/login" });
        } else {
          next();
        }
      }
    },
    {
      path: "/game",
      name: "game",
      component: game,
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
