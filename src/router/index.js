import Router from 'vue-router';

import Login from "@/components/Login";
import Home from "@/components/Home";
import HelloWorld from "@/components/HelloWorld";


const routes = [
  {path: '/login', component: Login},
  {path: '/', component: Home},
  {path: '/hello/:name', component: HelloWorld}
]

const router = new Router({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) =>{
  console.log(to, from)
  return next()
})

export default router