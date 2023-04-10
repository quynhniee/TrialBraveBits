import React from "react";
import { Link } from "react-router-dom";
import TagList from "./TagList";

const ArticlePreview = ({ article }) => {
  const clickHandle = () => {};

  return (
    <div className="article-preview">
      <div className="article-meta">
        <Link to={`/@${article.author.username}`}>
          <img src={article.author.image} alt={article.author.username} />
        </Link>

        <div className="info">
          <Link className="author" to={`@${article.author.username}`}>
            {article.author.username}
          </Link>
          <span className="date">
            {new Date(article.createdAt).toDateString()}
          </span>
        </div>

        <button
          className="btn btn-outline-primary btn-sm pull-xs-right"
          onClick={clickHandle}
        >
          <i className="ion-heart"></i> {article.favoritesCount}
        </button>
      </div>

      <Link to={`/article/${article.slug}`} className="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
        <TagList tags={article.tagList} />
      </Link>
    </div>
  );
};

export default ArticlePreview;
