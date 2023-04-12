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
    tab: undefined,
    tag: undefined,
    author: undefined,
    favorited: undefined,
  });
  const [auth, setAuth] = useState();
  const [comments, setComments] = useState([]);
  const [profile, setProfile] = useState(undefined);
  const [tags, setTags] = useState([]);

  const changeTab = (tab) => {
    setArticleList({ ...articleList, tab });
    getAllArticles();
  };

  const getAllArticles = async ({ page, author, tag, favorited } = {}) => {
    const articles =
      articleList?.tab === "feed"
        ? await api.Articles.feed(page)
        : await api.Articles.getAll({
            page: page ?? articleList.currentPage,
            author: author ?? articleList.author,
            tag: tag ?? articleList.tag,
            favorited: favorited ?? articleList.favorited,
            limit: articleList.articlesPerPage ?? 10,
          });
    setArticleList((prev) => ({
      ...prev,
      ...articles,
      currentPage: page ?? prev.currentPage,
    }));
  };

  useEffect(() => {
    changeTab("all");
  }, []);

  return (
    <Context.Provider
      value={{
        changeTab,
        article,
        setArticle,
        articleList,
        setArticleList,
        getAllArticles,
        comments,
        setComments,
        profile,
        setProfile,
        tags,
        setTags,
        auth,
        setAuth,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Provider;
