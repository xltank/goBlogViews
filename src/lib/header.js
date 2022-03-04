import _ from "lodash";
import moment from "moment";

const helper = {
  // 是否为IE浏览器
  isIE() {
    if (!!window.ActiveXObject || "ActiveXObject" in window) {
      return true;
    } else {
      return false;
    }
  },
  // 根据name获取地址栏的参数值
  getQueryString(name) {
    let reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`)
    let hash = window.location.hash
    let search = hash.split('?')
    let r = search[1] && search[1].match(reg)
    if (r != null) return r[2];
    return ''
  },
  // 拼接参数至url
  queryString(url, query) {
    let str = []
    for (let key in query) {
      str.push(key + '=' + query[key])
    }
    let paramStr = str.join('&')
    return paramStr ? `${url}?${paramStr}` : url
  },
  formatStats(users, list, type) {
    _.each(users, u => {
      let info = _.find(list, {userId: u._id.toString()});
      u[type + 'Count'] = info && info.count > 0 ? info.count : 0;
      if (["readChief", "editChief", "deletedChief", "editEvent"].indexOf(type) >= 0) {
        u[type + 'UniqCount'] = info && info.uniqCount ? info.uniqCount : 0
      }
    })
    return users;
  },
  checkUserExpireTime: function (user) {
    if (user.nickname === 'admin')
      return false;

    let expireTime = moment(user.updated).add(7, 'day').toDate();
    return moment().isAfter(expireTime);
  }
}
export default helper
