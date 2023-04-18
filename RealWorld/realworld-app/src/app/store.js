import { useState } from "react";
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
  const [comments, setComments] = useState([]);
  const [profile, setProfile] = useState(undefined);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);

  const changeTab = async (tab) => {
    setCurrentTab(tab);
    setCurrentTag(undefined);
    setCurrentAuthor(undefined);
    setArticle(undefined);
    setProfile(undefined);
    setComments([]);
    setLoading(true);

    const articles =
      tab === "feed" ? await api.Articles.feed(0) : await api.Articles.getAll();
    setArticleList((prev) => ({
      ...prev,
      ...articles,
      currentPage: 0,
    }));
    setLoading(false);
  };

  const getAllArticles = async ({ page, author, tag, favorited } = {}) => {
    setLoading(true);
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
    setLoading(false);
  };

  const getArticlesByTag = async ({ tag, page }) => {
    setLoading(true);
    const articles = await api.Articles.getAll({ tag, page });
    setArticleList({ ...articleList, ...articles, currentPage: 0 });
    setLoading(false);
  };

  const getFavoriteArticles = async ({ username, page }) => {
    setLoading(true);
    const articles = await api.Articles.getAll({
      favorited: username,
      limit: 5,
      page,
    });
    setArticleList({ ...articleList, ...articles, currentPage: 0 });
    setLoading(false);
  };

  const getArticlesByAuthor = async ({ author, page }) => {
    setLoading(true);
    const articles = await api.Articles.getAll({ author, limit: 5, page });
    setArticleList({ ...articleList, ...articles, currentPage: 0 });
    setLoading(false);
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
        loading,
        setLoading,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Provider;
