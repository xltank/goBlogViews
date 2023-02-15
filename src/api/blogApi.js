import http from "./http"

export default {
  save(params) {
    return http.post("/blog", params);
  },
  list(offset = 0, limit = 10) {
    return http.get(`/blog`, {params: {offset, limit}})
  },
  getById(id) {
    return http.get(`/blog/${id}`);
  }
}