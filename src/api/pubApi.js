import http from "./http";

export default {
  get() {
    return http.get("/pub");
  },
  update(data) {
    return http.post("/pub", data);
  }
}