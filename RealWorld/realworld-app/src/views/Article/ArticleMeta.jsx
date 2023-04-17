import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import ArticleActions from "./ArticleActions";
import { AuthContext } from "../../app/auth";

const ArticleMeta = ({ article }) => {
  const navigate = useNavigate();
  const { isAuth } = useContext(AuthContext);
  const followHandle = () => {
    if (isAuth !== true) {
      navigate("/login");
      return;
    }
  };

  const favoriteHandle = () => {
    if (isAuth !== true) {
      navigate("/login");
      return;
    }
  };
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
      <button
        className="btn btn-sm btn-outline-secondary"
        onClick={followHandle}
      >
        <i className="ion-plus-round"></i>
        &nbsp; Follow {article?.author.username}
      </button>
      &nbsp;
      <button
        className="btn btn-sm btn-outline-primary"
        onClick={favoriteHandle}
      >
        <i className="ion-heart"></i>
        &nbsp; Favorite Post{" "}
        <span className="counter">({article.favoritesCount})</span>
      </button>
    </div>
  );
};

export default ArticleMeta;
