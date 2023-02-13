import {defineStore} from "pinia";
import {useCookies} from "vue3-cookies"
import md5 from "js-md5";
import userApi from "@/api/user";
import router from "../router"
import _ from "lodash"


const state = () => ({
    form: {
      // name: "xuli",
      // password: "88888888",
      name: "",
      password: "",
    },
    userInfo: null
  }
);

const getters = {
  user(state) {
    this.loadUserFromCookie();
    return state.userInfo
  }
}

const actions = {
  async login() {
    let password = hash(this.form.password)
    let r = await userApi.login(_.assign({}, this.form, {password}))
    this.loadUserFromCookie();
    return r;
  },
  async logout() {
    await userApi.logout();
    await router.push({name: "login"})
  },
  //从 cookie 加载用户
  loadUserFromCookie() {
    const {cookies} = useCookies();
    let cookie = cookies.get("user");
    this.userInfo = this.cookieToJson(cookie);
  },
  cookieToJson(cookie) {
    if (!cookie) {
      return null;
    }
    let match = /^s:(?<json>.+)\.\S+$/ig.exec(cookie);
    if (!match) {
      return null;
    }
    let {groups: {json = null}} = match;
    return JSON.parse(json);
  }
};

const hash = (password) =>{
  let hash = md5.create();
  hash.update(password);
  return hash.hex();
}

export const useStore = defineStore({
  id: "users",
  state,
  getters,
  actions
})