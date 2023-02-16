import {createRouter, createWebHistory} from "vue-router";


const routes = [
  {
    path: "/signUp",
    name: "signUp",
    component: () => import("../components/SignUp.vue"),
  },
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
        path: "main",
        name: "main",
        component: () => import("../components/Main.vue")
      },
      {
        path: "blogEdit",
        name: "blogEdit",
        component: () => import("../components/BlogEdit.vue")
      },
      {
        path: "blog",
        name: "blog",
        component: () => import("../components/Blog.vue")
      },
    ]
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})