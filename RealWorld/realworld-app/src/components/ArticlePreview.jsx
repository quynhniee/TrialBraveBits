import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import TagList from "./TagList";
import { AuthContext } from "../app/auth";

const ArticlePreview = ({ article }) => {
  const { isAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const clickHandle = () => {
    if (isAuth !== true) {
      navigate("/login");
      return;
    }
  };

  return (
    <div className="article-preview">
      <div className="article-meta">
        <Link to={`/user/${article.author.username}`}>
          <img src={article.author.image} alt={article.author.username} />
        </Link>

        <div className="info">
          <Link className="author" to={`/user/${article.author.username}`}>
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
