import React, { useContext } from "react";
import ArticlePreview from "./ArticlePreview";
import Context from "../app/context";
import Pagination from "./Pagination";

const ArticleList = () => {
  const { articleList, loading } = useContext(Context);
  if (loading === true)
    return <div className="article-preview">Loading...</div>;
  const articles = articleList.articles;

  if (articles === undefined || articles.length === 0)
    return <div className="article-preview">No articles are here... yet.</div>;

  return (
    <>
      {articles.map((article) => (
        <ArticlePreview key={article.slug} article={article} />
      ))}
      <Pagination />
    </>
  );
};

export default ArticleList;
