import { useEffect, useState } from "react";
import Context from "./context";
import api from "../api";

const Provider = ({ children }) => {
  const [article, setArticle] = useState();
  const [articleList, setArticleList] = useState({
    articles: [],
    articlesCount: 0,
    currentPage: 0,
    articlesPerPage: 10,
    favorited: undefined,
  });
  const [currentTag, setCurrentTag] = useState();
  const [currentTab, setCurrentTab] = useState();
  const [currentAuthor, setCurrentAuthor] = useState();
  const [currentUser, setCurrentUser] = useState();
  const [comments, setComments] = useState([]);
  const [profile, setProfile] = useState(undefined);
  const [tags, setTags] = useState([]);

  const changeTab = async (tab) => {
    setCurrentTab(tab);
    setCurrentTag(undefined);
    setCurrentAuthor(undefined);

    const articles =
      tab === "feed" ? await api.Articles.feed(0) : await api.Articles.getAll();
    setArticleList((prev) => ({
      ...prev,
      ...articles,
      currentPage: 0,
    }));
  };

  const getAllArticles = async ({ page, author, tag, favorited } = {}) => {
    const articles =
      currentTab === "feed"
        ? await api.Articles.feed(page)
        : await api.Articles.getAll({
            page: page ?? articleList.currentPage,
            author: author ?? currentAuthor,
            tag: tag ?? currentTag,
            favorited: favorited ?? articleList.favorited,
            limit: articleList.articlesPerPage ?? 10,
          });
    setArticleList((prev) => ({
      ...prev,
      ...articles,
      currentPage: page ?? prev.currentPage,
    }));
  };

  const getArticlesByTag = async ({ tag, page }) => {
    const articles = await api.Articles.getAll({ tag, page });
    setArticleList({ ...articleList, ...articles, currentPage: 0 });
  };

  const getFavoriteArticles = async ({ username, page }) => {
    const articles = await api.Articles.getAll({
      favorited: username,
      limit: 5,
      page,
    });
    setArticleList({ ...articleList, ...articles, currentPage: 0 });
  };

  const getArticlesByAuthor = async ({ author, page }) => {
    const articles = await api.Articles.getAll({ author, limit: 5, page });
    setArticleList({ ...articleList, ...articles, currentPage: 0 });
  };

  return (
    <Context.Provider
      value={{
        changeTab,
        article,
        setArticle,
        articleList,
        setArticleList,
        getAllArticles,
        getArticlesByTag,
        getFavoriteArticles,
        getArticlesByAuthor,
        currentAuthor,
        setCurrentAuthor,
        currentUser,
        setCurrentUser,
        comments,
        setComments,
        profile,
        setProfile,
        tags,
        setTags,
        currentTab,
        setCurrentTab,
        currentTag,
        setCurrentTag,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Provider;
