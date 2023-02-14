import axios from "axios";
import {message} from "ant-design-vue";

const instance = axios.create({
  baseURL: "/api"
});

instance.interceptors.response.use(resp => {
  //格式化输出
  let {data: {rtn, data, err}} = resp;
  if (rtn !== 0) {
    message.error(err);
    return Promise.reject(err);
  }
  return {data};
}, err => {
  //检查错误代码是否为403
  let code = err.response?.status;
  if (code === 403) {
    //没有权限，回到登录页面
    window.location.href = "/";
  }
  return Promise.reject(err);
})

export default instance;
