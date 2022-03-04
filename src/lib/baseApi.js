import axios from "axios";
import moment from "moment";

axios.defaults.withCredentials = true
import {Message, MessageBox, Loading} from "element-ui";
import helper from "./header";
import consts from "./consts";
// let qs = require("querystring");

console.log(process.env.NODE_ENV)

// let apiPrefix = process.env.NODE_ENV === 'local' ? "http://localhost:8080" : `${location.protocol}//${location.hostname}`
let apiPrefix = "http://my.com:8080";
console.log(apiPrefix, 'apiPrefix')

let loadingInstance = null //这里是loading

// 添加请求拦截器
axios.interceptors.request.use(
  (config) => {
    // console.log(config,'====>config')
    if (!config.data || !config.data.hideLoadAnimation) {
      loadingInstance = Loading.service({
        lock: true,
        text: 'loading...',
        fullscreen: true
      })
    }

    // config.headers['Content-Type'] = 'application/json, text/plain';

    let user = JSON.parse(window.localStorage.getItem('admin'));

    if (user && !helper.checkUserExpireTime(user)) {
      //将token放到请求头发送给服务器,将tokenkey放在请求头中
      config.headers.userid = user._id;
      return config;
    }
    return config;
  },
  (error) => {
    //request err
    return error;
  }
);
// 添加响应拦截器
axios.interceptors.response.use(
  (response) => {
    if (loadingInstance)
      loadingInstance.close()
    if (response.data.status == 403) {
      window.location.href = "/login";
      return;
    } else if (response.data.rtn === 10001) {
      MessageBox(response.data.message || response.data.errMsg, '提示', {
        confirmButtonText: '确定',
        type: 'warning'
      }).then(() => {
        window.location.href = "/login";
        return;
      })
    } else if (response.data.rtn) {
      if (response.data.errorCode && consts.errorCode[response.data.errorCode]) {
        response.data.message = null;
      }
      if (response.data.message || response.data.errMsg) {
        Message({
          message: response.data.message || response.data.errMsg,
          type: "error",
          duration: 5 * 1000,
        });
      }
    }
    if (localStorage.getItem('timeStr')) {
      localStorage.setItem('timeStr', moment().valueOf());
    }
    return response.data;

  },
  (error) => {
    console.log("axios error: ", error.response);
    loadingInstance.close()
    const msg = error.Message && error.Message || error.response && error.response.data.errMsg || "";
    if (msg) {
      Message({
        message: msg,
        type: "error",
        duration: 5 * 1000,
      });
    }

    return Promise.reject(error);
  }
);

// let handlerErrResponse = async function (error, status) {
//   let res = error.data;
//   if (status === 502) {
//       // 502  单独处理
//       return;
//   }
//   if (status === 404) {
//       // 404  单独处理
//       return;
//   } else if (status === 403) {
//       sessionStorage.token = (await createRpcTokenFun('/getToken')).result;
//       window.location.href = '/m/login';
//       return;
//   }
//   if (res) {
//       if (isCommonHandler) {
//           console.log(res);
//           if (res.message) {
//               showMessage(res.message, 2000);
//           } else {
//               showMessage('抱歉暂时无法处理您的请求”');
//           }
//       }
//   } else {
//       showMessage('抱歉暂时无法处理您的请求');
//   }
// };

let headers = localStorage.token ? {token: localStorage.token} : {};

let apiAxios = (method, url, params) => {
  let options = {
    method: method,
    url:
      method === "GET"
        ? helper.queryString(url, params)
        : url,
    //data: method === "POST" || method === "PUT" ? qs.stringify(params) : null,
    data: params,
    baseURL: apiPrefix,
    timeout: 300000,
    headers: headers,
  }
  return axios(options)
};

// axios.defaults.headers.post["Content-Type"] =
//   "Content-Type:application/x-www-form-urlencoded; charset=UTF-8";

export default {
  get: function (url, params) {
    return apiAxios("GET", url, params);
  },
  post: function (url, params) {
    // console.log(params);
    return apiAxios("POST", url, params);
  },
  put: function (url, params) {
    return apiAxios("PUT", url, params);
  },
  delete: function (url, params) {
    return apiAxios("DELETE", url, params);
  },
  apiPrefix: apiPrefix
};
