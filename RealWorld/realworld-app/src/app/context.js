import { createContext } from "react";

const Context = createContext({
  changeTab: () => {},
  article: undefined,
  articleList: {},
  currentAuthor: undefined,
  currentTab: undefined,
  currentTag: undefined,
  currentUser: undefined,
  comments: [],
  profile: undefined,
  tags: [],
  setArticle: () => {},
  setCurrentTab: () => {},
  setCurrentTag: () => {},
  setArticleList: () => {},
  setCurrentAuthor: () => {},
  setCurrentUser: () => {},
  setComments: () => {},
  setProfile: () => {},
  setTags: () => {},
  getAllArticles: () => {},
  getArticlesByTag: () => {},
  getFavoriteArticles: () => {},
  getArticlesByAuthor: () => {},
  loading: Boolean,
  setLoading: () => {},
});

export default Context;
