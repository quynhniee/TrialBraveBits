import axios from "axios";

export const getAllList = async () => {
  try {
    const response = await axios.get("/list");
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getList = async (listId) => {
  try {
    const response = await axios.get(`/list/${listId}`);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const updateList = async (value, listId) => {
  try {
    const response = await axios.put(`/list/${listId}`, value);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const createList = async (value) => {
  try {
    const response = await axios.post("/list", value);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const deleteList = async (id) => {
  try {
    const response = await axios.delete(`/list/${id}`);
    return response;
  } catch (error) {
    return error.response;
  }
};
