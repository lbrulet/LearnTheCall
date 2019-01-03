import Vue from "vue";
import Router from "vue-router";
import LoginComponent from "./views/Authentification/Login.vue";
import RegisterComponent from "./views/Authentification/Register.vue";
import store from "./store/store.js";
import Game from "./views/Game.vue";
import Menu from './views/menu.vue'
import Historic from "./views/History.vue"

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
          next({ path: "/menu" });
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
          next({ path: "/menu" });
        } else {
          next();
        }
      }
    },
    {
      path: "/game",
      name: "game",
      component: Game,
      meta: {title: 'LearnTheCall - Game'},
      beforeEnter: (to, from, next) => {
        if (store.state.token == null) {
          next({ path: "/login" });
        } else {
          next();
        }
      }
    },
    {
      path: "/menu",
      name: "menu",
      component: Menu,
      meta: {title: 'LearnTheCall - Menu'},
      beforeEnter: (to, from, next) => {
        if (store.state.token == null) {
          next({ path: "/login" });
        } else {
          next();
        }
      }
    },
    {
      path: "/historic",
      name: "historic",
      component: Historic,
      meta: {title: 'LearnTheCall - Historic'},
      beforeEnter: (to, from, next) => {
        if (store.state.token == null) {
          next({path: "/login"});
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
