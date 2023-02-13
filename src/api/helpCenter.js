import http from "./http";

export default {
  getAll() {
    return http.get(`/helpCenter`);
  },
  getByTitle(title) {
    return http.get(`/helpCenter/${title}`);
  },
  create(item) {
    return http.post(`/helpCenter`, item);
  },
  update(item) {
    return http.put(`/helpCenter`, item);
  },
  uploadImage(formData) {
    return http.post(`/helpCenter/image`, formData);
  }
}