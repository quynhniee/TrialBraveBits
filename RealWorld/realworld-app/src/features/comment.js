import api from "../api";

export const createComment = async ({ slug, body }, pending) => {
  try {
    const response = await api.Comments.create(slug, { body });
    pending(response.comment);
  } catch (error) {
    throw error;
  }
};

export const deleteComment = async ({ slug, id }) => {
  try {
    await api.Comments.delete(slug, id);
  } catch (error) {
    throw error;
  }
};
