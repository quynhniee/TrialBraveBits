import { createContext } from "react";

const Context = createContext({
  changeTab: () => {},
  article: undefined,
  articleList: {},
  auth: undefined,
  comments: [],
  profile: undefined,
  tags: [],
  setArticle: () => {},
  setAuth: () => {},
  setArticleList: () => {},
  setComments: () => {},
  setProfile: () => {},
  setTags: () => {},
  getAllArticles: () => {},
});

export default Context;
