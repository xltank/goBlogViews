import http from "./http"

export default {
  login(params) {
    return http.post("/user/login", params);
  },
  logout() {
    return http.get("/user/logout");
  },
}