import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: () =>
        import(/* webpackChunkName: "setup" */ "./views/Setup.vue")
    },
    {
      path: "/game",
      name: "game",
      component: () => import(/* webpackChunkName: "game" */ "./views/Game.vue")
    }
  ]
});
