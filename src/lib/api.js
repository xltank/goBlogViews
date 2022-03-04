import http from "./baseApi";

export default{
  apiPrefix: http.apiPrefix,

  signup(params) {
    return http.post("/api/signup", params);
  },
	login(params) {
		return http.post("/api/login", params);
	},
	logout(params) {
		return http.post("/api/logout", params);
	},
  getRecordStats(q) {
    return http.get("/admin/record/stats", q);
  },
  deleteGroup(data) {
    return http.delete(`/admin/groups`, data);
  },

};
