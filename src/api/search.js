import http from "./http";

export default {
  search(page, query) {
    return http.post(`/search/${page}`, query);
  }
}