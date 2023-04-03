import axios from "axios";

// Create item with list id
export const createItem = async (value, listId) => {
  try {
    const response = await axios.post(`/item/${listId}`, value);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const updateItem = async (value, itemId) => {
  try {
    const response = await axios.put(`/item/${itemId}`, value);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const removeItem = async (listId, itemId) => {
  try {
    const response = await axios.delete(`/item/${listId}/${itemId}`);
    return response;
  } catch (error) {
    return error.response;
  }
};
