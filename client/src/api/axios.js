import axios from "axios";
const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL + "/api",
});
export function setAuthToken(token) {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
}
export default api;
