import { createContext } from "react";

const Context = createContext({
  changeTab: () => {},
  article: undefined,
  articleList: {},
  currentAuthor: undefined,
  currentTab: undefined,
  currentTag: undefined,
  comments: [],
  profile: undefined,
  tags: [],
  setArticle: () => {},
  setCurrentTab: () => {},
  setCurrentTag: () => {},
  setArticleList: () => {},
  setCurrentAuthor: () => {},
  setComments: () => {},
  setProfile: () => {},
  setTags: () => {},
  getAllArticles: () => {},
  getArticlesByTag: () => {},
  getFavoriteArticles: () => {},
  getArticlesByAuthor: () => {},
});

export default Context;
