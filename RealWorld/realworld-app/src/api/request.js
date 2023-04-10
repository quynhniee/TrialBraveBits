import axios from "axios";
axios.defaults.baseURL = "https://conduit.productionready.io/api";

const getParams = (object) => {
  const params = [];

  for (const param in object) {
    if (object.hasOwnProperty(param) && object[param] != null) {
      params.push(param + "=" + object[param]);
    }
  }

  return params.join("&");
};

const request = {
  get: async (url, query = {}) => {
    try {
      // Get page result
      if (query?.page) {
        query.limit = query.limit ? query.limit : 10;
        query.offset = query.page * query.limit;
      }

      delete query.page;
      const isEmptyQuery = query == null || Object.keys(query).length === 0;

      const response = await axios.get(
        isEmptyQuery ? url : url + "?" + getParams(query)
      );
      return response;
    } catch (error) {
      return error.response;
    }
  },

  post: async (url, body) => {
    try {
      const response = await axios.post(url, body);
      return response;
    } catch (error) {
      return error.response;
    }
  },

  put: async (url, body) => {
    try {
      const response = await axios.put(url, body);
      return response;
    } catch (error) {
      return error.response;
    }
  },

  delete: async (url) => {
    try {
      const response = await axios.delete(url);
      return response;
    } catch (error) {
      return error.response;
    }
  },
};

export default request;
