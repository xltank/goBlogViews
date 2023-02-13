import {createRouter, createWebHistory} from "vue-router";


const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("../components/Login.vue"),
  },
  {
    path: "/",
    name: "home",
    component: () => import("../components/Home.vue"),
    children: [
      {
        path: "overview",
        name: "overview",
        component: () => import("../components/OverView.vue")
      },
    ]
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})