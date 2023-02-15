import {defineStore} from "pinia"
import router from "../router"
import _ from "lodash"

import {message} from "ant-design-vue";
import blogApi from "../api/blogApi.js";


const state = () => ({
  _blog: {
  },
});

const getters = {
  blog(state) {
    return state._blog
  },
}

const actions = {
  async save() {
    let r = await blogApi.save(this.blog)
    return r;
  },

  async getList(offset, limit) {
    let r = await blogApi.list(offset, limit)
    return r;
  },
};


export const useBlogStore = defineStore({
  id: "blog", state, getters, actions
})