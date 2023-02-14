import {defineStore} from "pinia"
import {useCookies} from "vue3-cookies"
import userApi from "/src/api/user"
import configApi from "/src/api/config"
import router from "../router"
import _ from "lodash"

import forge from 'node-forge'
import {message} from "ant-design-vue";

const publicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAs+dvjIjxd5b5ZeDFXBJ+
Qs/YMKt6HGTF9DjNnNgyhTaSNGhZOwl22rpQwU/uXecniisi6LME8FBqTN4nBGqF
n7jm5sqkF5Uq5xmfbKbJ7enZvrEiSIs3fdlENZ4SapGUYPeN8r0cSLJDm+F5f2pJ
M4VjKSRCesG5vTJiiJ/PlQO9Us+tQNqm9OLNzK3BYFLXnoYxCJcmTod3Hbsz3ent
iZkszwrv78pE5g/wRZ8cNPZUOQ9lIs9izyOds1OGKVfbV45F98NXQ7oXzhJw/syW
UnvSZRXZmgDeW9SmQINMM9iHipizmLe2wDUx71Id1fNh0NlwXMoPq4Y9O3Oa6JTZ
gwIDAQAB
-----END PUBLIC KEY-----`;


const state = () => ({
  form: {
    // name: "xuli",
    // password: "88888888",
    email: "test@my.com",
    password: "",
  },
  userInfo: null
});

const getters = {
  user(state) {
    this.loadUserFromCookie();
    return state.userInfo
  }
}

const actions = {
  async signUp() {
    const encrypted = this.encrypt(this.form.password)
    let r = await userApi.signUp({email: this.form.email, password: encrypted})
    // let r = await userApi.signUp(2)
    // this.loadUserFromCookie();
    console.log('signup', r)
    return r;
  },

  async logout() {
    await userApi.logout();
    await router.push({name: "login"})
  }, //从 cookie 加载用户

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
  },

  encrypt(password) {
    const pki = forge.pki;
    const pk = pki.publicKeyFromPem(publicKey);
    let encrypted = pk.encrypt(password, 'RSA-OAEP', {
      md: forge.md.sha256.create()
    });
    encrypted = forge.util.encode64(encrypted);
    return encrypted
  }
};

const hash = (password) => {
  let hash = md5.create();
  hash.update(password);
  return hash.hex();
}

export const useUserStore = defineStore({
  id: "users", state, getters, actions
})