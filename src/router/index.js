import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home";

Vue.use(VueRouter);

const VueRouterPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err);
};

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    children: [
      {
        path: "/firstAa", // 一级
        name: "firstAa",
        meta: {
          title: "firstAa",
          icon: "el-icon-monitor",
          isLeaf: false
        },
        component: {
          render(c) {
            return c("router-view");
          }
        },
        redirect: { name: "thirdAa" },
        children: [
          {
            path: "/firstAa/secondAa", // 二级
            name: "secondAa",
            meta: {
              title: "secondAa",
              icon: "el-icon-monitor",
              isLeaf: false
            },
            component: {
              render(c) {
                return c("router-view");
              }
            },
            redirect: { name: "thirdAa" },
            children: [
              {
                path: "/firstAa/secondAa/thirdAa", // 三级,
                name: "thirdAa",
                meta: {
                  title: "thirdAa",
                  icon: "el-icon-monitor"
                },
                component: () => import("@/views/thirdAa/index.vue")
              },
              {
                path: "/firstAa/secondAa/thirdBb", // 三级,
                name: "thirdBb",
                meta: {
                  title: "thirdBb",
                  icon: "el-icon-monitor"
                },
                component: () => import("@/views/thirdBb/index.vue")
              }
            ]
          },
          {
            path: "/firstAa/secondBb", // 二级
            name: "secondBb",
            meta: {
              title: "secondBb",
              icon: "el-icon-user",
              isLeaf: true
            },
            component: () => import("@/views/secondBb/index.vue")
          }
        ]
      },




      {
        path: "/firstBb", // 一级
        name: "firstBb",
        meta: {
          title: "firstBb",
          isLeaf: false
        },
        component: {
          render(c) {
            return c("router-view");
          }
        },
        redirect: { name: "secondBbc" },
        children: [
          {
            path: "/firstBb/secondBb", // 二级
            name: "secondBbc",
            meta: {
              title: "secondBbc",
              icon: "el-icon-monitor",
              isLeaf: true
            },
            component: () => import("@/views/secondBbc/index.vue")
          }
        ]
      },

      {
        path: "/firstCc", // 一级
        name: "firstCc",
        meta: {
          title: "firstCc",
          isLeaf: false
        },
        component: {
          render(c) {
            return c("router-view");
          }
        },
        redirect: { name: "secondCc" },
        children: [
          {
            path: "/firstCc/secondCc", // 二级
            name: "secondCc",
            meta: {
              title: "secondCc",
              icon: "el-icon-monitor",
              isLeaf: true
            },
            component: () => import("@/views/secondCc/index.vue")
          }
        ]
      }
    ]
    // redirect: {name:'firstAa'}
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
