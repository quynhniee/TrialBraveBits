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
      {/* <ArticleActions /> */}
      <button className="btn btn-sm btn-outline-secondary">
        <i className="ion-plus-round"></i>
        &nbsp; Follow {article?.author.username}
      </button>
      &nbsp;
      <button className="btn btn-sm btn-outline-primary">
        <i className="ion-heart"></i>
        &nbsp; Favorite Post{" "}
        <span className="counter">{article.favoritesCount}</span>
      </button>
    </div>
  );
};

export default ArticleMeta;
