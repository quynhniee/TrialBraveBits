import axios from "axios";
import request from "./request";

const Auth = {
  // Set header authorization
  setHeader: (token) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  },

  // Existing user login
  login: (email, password) =>
    request.post("/users", { user: { email, password } }),

  // Register a new user
  register: (username, email, password) =>
    request.post("/users", { user: { username, email, password } }),

  // Get current user
  getCurrent: () => request.get("/user"),

  // Update current user
  update: (user) => request.put("/user", { user }),
};

export default Auth;
