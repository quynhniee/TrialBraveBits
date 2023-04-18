import api from "../api";

export const createArticle = async ({ article }, rejected, pending) => {
  try {
    const data = await api.Articles.create(article);
    if (data?.errors) {
      rejected(data.errors);
      return;
    }

    pending(data.article);
  } catch (error) {
    throw error;
  }
};

export const updateArticle = async ({ slug, article }, rejected, pending) => {
  try {
    const data = await api.Articles.update(slug, article);
    if (data?.errors) {
      rejected(data.errors);
      return;
    }

    pending(data.article);
  } catch (error) {
    throw error;
  }
};
