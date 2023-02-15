import {createApp} from 'vue'
import App from './App.vue'
import router from "./router";
import {createPinia} from "pinia";

import "ant-design-vue/dist/antd.less"
import "@/assets/style/common.less";

import svgIcon from './components/SvgIcon.vue'


const SIGNUP = "signup";
const LOGIN = "login";
const HOME = "home";
const app = createApp(App);

app.use(router);
app.use(createPinia());
app.component('svg-icon', svgIcon);


import {useUserStore} from "/src/store/userStore";
const userStore = useUserStore();

router.beforeEach((to, from, next) => {
  console.log(to.name, from.name, userStore.user)
  if (!userStore.user || Object.keys(userStore.user).length === 0) {
    to.name === LOGIN || to.name === SIGNUP ? next() : next({name: LOGIN});
  } else {
    if(to.name === HOME)
      return next({name: 'main'});
    next();
  }
})

app.mount('#app');
