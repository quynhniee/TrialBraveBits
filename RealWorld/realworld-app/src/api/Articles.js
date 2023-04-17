import request from "./request";

const Articles = {
  // Get recent articles globally
  getAll: (query) => request.get("/articles", query),

  // Get article favorited by author
  // favoritedBy: (username, page) =>
  //   request.get("/articles", { favorited: username, limit: 5, page }),

  // Get recent articles from users you follow
  feed: (page) => request.get("/articles/feed", { page }),

  // Create an article
  create: (article) => request.post("/articles", { article }),

  // Get an article
  get: (slug) => request.get(`/articles/${slug}`),

  // Update an article
  update: (slug, article) => request.put(`/articles/${slug}`, { article }),

  // Delete an article
  delete: (slug) => request.delete(`/articles/${slug}`),

  // Favorite an article
  favorite: (slug) => request.post(`/articles/${slug}/favorite`),

  // Unfavorite an article
  unfavorite: (slug) => request.delete(`/articles/${slug}/favorite`),
};

export default Articles;
