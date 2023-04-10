import React from "react";
import ArticlePreview from "./ArticlePreview";
import { useSelector } from "react-redux";

const ArticleList = () => {
  const articles = useSelector((state) => state.articleList.articles);

  if (articles === undefined || articles.length === 0)
    return <div className="article-preview"></div>;

  return (
    <>
      {articles.map((article) => (
        <ArticlePreview key={article.slug} article={article} />
      ))}
    </>
  );
};

export default ArticleList;
