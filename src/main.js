import Vue from 'vue'
import VueRouter from "vue-router";
import App from './App.vue'
import router from './router'
import VueI18n from 'vue-i18n'

Vue.use(VueRouter)


import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'

Vue.use(VueI18n)

let langSet = localStorage.getItem('langSet') || 'zh-cn';
const i18n = new VueI18n({
  locale: langSet,
  messages: {
    zh: Object.assign(require("./assets/lang/zh"), zhLocale),
    en: Object.assign(require("./assets/lang/en"), enLocale),
  }
})
Vue.use(Element, {i18n: (key, value) => i18n.t(key, value)})

Vue.config.productionTip = false

new Vue({
  router,
  i18n,
  render: h => h(App),
}).$mount('#app');
