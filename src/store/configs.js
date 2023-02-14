import {defineStore} from "pinia";
import configApi from "@/api/config";
import {cloneDeep} from "lodash";
import dayjs from "dayjs";

const DEFAULT_CONFIG = {
  risk_level: "",
  risk_property_paths: "",
  risk_content: ""
}

const state = () => {
  return {
    _data: cloneDeep(DEFAULT_CONFIG)
  }
}

const getters = {
  id(state) {
    return state._data?._id || "";
  },
  data(state) {
    return state._data;
  },
  riskLevel(state) {
    return string2Array(state._data.risk_level);
  },
  riskPropertyPaths(state) {
    return string2Array(state._data.risk_property_paths, "/");
  },
  riskContent(state) {
    return string2Array(state._data.risk_content);
  },
  updateInfo(state) {
    if (!state._data) {
      return "";
    }
    let {user = {}, timestamp} = state._data;
    let {nickname} = user;
    return `${nickname} 更新于 ${dayjs(timestamp).format("YY/MM/DD HH:mm")}`;
  }
}

/**
 * 将字符串按照换行格式化为数组
 * @param str
 * @param searchString 以指定字符串开始
 * @return {any[]}
 */
function string2Array(str, searchString = "") {
  let set = new Set();
  (str || "").split("\n")
    .map(item => {
      item = item.trim();
      return (searchString && !item.startsWith(searchString)) ? `${searchString}${item}` : item;
    })
    .filter(item => !!item)
    .forEach(item => set.add(item));
  return [...set];
}

const actions = {
  get() {
    return configApi.get()
      .then(({data = {}}) => {
        this._data = data;
      })
  },
  update(options) {
    return configApi.update(options);
  }
}

export const useStore = defineStore({
  id: "configs",
  state,
  getters,
  actions
})