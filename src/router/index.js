import Router from 'vue-router';

import Signup from "@/components/Signup"
import Login from "@/components/Login";
import Home from "@/components/Home";
import HelloWorld from "@/components/HelloWorld";


const routes = [
  {path: '/signup', component: Signup, name: "signup"},
  {path: '/login', component: Login, name: "login"},
  {path: '/', component: Home, name: "home"},
  {path: '/hello/:name', component: HelloWorld, name: "hello"}
]

const router = new Router({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) =>{
  console.log(to.fullPath, from.fullPath)
  return next()
})

export default router