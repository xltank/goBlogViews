import {defineStore} from "pinia"
import router from "../router"
import _ from "lodash"

import {message} from "ant-design-vue";
import blogApi from "../api/blogApi.js";


const state = () => ({
  _blog: {},
  _list: [],
  _total: 0,
});

const getters = {
  blog(state) {
    return state._blog
  },
  list(state) {
    return state._list
  },
  total(state) {
    return state._total
  }
}

const actions = {
  async save() {
    let r = await blogApi.save(this.blog)
    return r;
  },

  async getList(offset, limit) {
    let r = await blogApi.list(offset, limit)
    this._list = r.data.list
    this._total = r.data.total
    return r;
  },

  newBlog(){
    return {
      title: "",
      content: "",
      authorId: 0,
      tags: [],
    }
  }
};


export const useBlogStore = defineStore({
  id: "blog", state, getters, actions
})