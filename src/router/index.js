import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    children: [
      {
        path: "/customerManage",
        name: "customerManage",
        component: () => import("@/views/customerManage/index.vue")
      },
      {
        path: "/basicDataManage",
        name: "basicDataManage",
        component: () => import("@/views/basicDataManage")
      },
      {
        path: "/userManage",
        name: "userManage",
        component: () => import("@/views/userManage")
      },
      {
        path: "/viewRecord",
        name: "viewRecord",
        component: () => import("@/views/viewRecord")
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
