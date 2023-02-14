import http from "./http"

export default {
  signUp(params) {
    return http.post("/user/signUp", params);
  },
  login(params) {
    return http.post("/user/login", params);
  },
  logout() {
    return http.get("/user/logout");
  },
  list() {
    return http.get("/user");
  },
  getById(id) {
    return http.get(`/user/${id}`);
  },
}