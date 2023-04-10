import request from "./request";

const Comments = {
  // Get comments for an article
  get: (slug) => request.get(`/articles/${slug}/comments`),

  // Create a comment for an article
  create: (slug, comment) =>
    request.post(`/articles/${slug}/comments`, { comment }),

  // Delete a comment for an article
  delete: (slug, id) => request.delete(`/articles/${slug}/comments/${id}`),
};

export default Comments;
