import {defineStore} from "pinia"
import {useCookies} from "vue3-cookies"
import userApi from "/src/api/userApi"
import configApi from "/src/api/pubApi"
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
  _form: {
    // name: "xuli",
    // password: "88888888",
    email: "test@my.com",
    password: "test@123",
  },
  _user: null
});

const getters = {
  user(state) {
    this.loadUserFromLocal();
    return state._user
  },
  form(state) {
    return state._form
  }
}

const actions = {
  async signUp() {
    const encrypted = this.encrypt(this.form.password)
    let r = await userApi.signUp({email: this.form.email, password: encrypted})
    console.log('signup', r)
    return r;
  },

  async login() {
    const encrypted = this.encrypt(this.form.password)
    let r = await userApi.login({email: this.form.email, password: encrypted})
    console.log('login', r)
    return r;
  },

  async logout() {
    await userApi.logout();
    localStorage.removeItem("user");
    await router.push({name: "login"})
  },

  loadUserFromLocal() {
    this._user = JSON.parse(localStorage.getItem("user")) || {};
  },

  encrypt(password) {
    const pk = forge.pki.publicKeyFromPem(publicKey);
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