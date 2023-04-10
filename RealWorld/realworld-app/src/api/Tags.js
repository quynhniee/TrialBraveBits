import request from "./request";

const Tags = {
  // Get tags
  getAll: () => request.get("/tags"),
};

export default Tags;
