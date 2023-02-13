import http from "./http";

export default {
  get() {
    return http.get("/config");
  },
  update(data) {
    return http.post("/config", data);
  }
}