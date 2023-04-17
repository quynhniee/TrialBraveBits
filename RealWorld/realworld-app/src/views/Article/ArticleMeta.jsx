import React from "react";
import { Link } from "react-router-dom";
import ArticleActions from "./ArticleActions";

const ArticleMeta = ({ article }) => {
  return (
    <div className="article-meta">
      <Link to={`/user/${article?.author.username}`}>
        <img
          src={
            article.author.image ??
            "https://static.productionready.io/images/smiley-cyrus.jpg"
          }
          alt={article?.author.username}
        />
      </Link>
      <div className="info">
        <Link to={`/user/${article?.author.username}`} className="author">
          {article?.author.username}
        </Link>

        <time className="date" dateTime={article?.createdAt}>
          {new Date(article?.createdAt).toDateString()}
        </time>
      </div>
      <ArticleActions article={article} />
    </div>
  );
};

export default ArticleMeta;
