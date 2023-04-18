import React, { useContext, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../app/auth";
import api from "../../api";

const ArticleActions = ({ article }) => {
  const { slug } = useParams();
  const { isAuthor, isAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [favorited, setFavorited] = useState(article.favorited);
  const [favoritesCount, setFavoritesCount] = useState(article.favoritesCount);

  const favoriteHandle = () => {
    setFavorited(true);
    setFavoritesCount((prev) => prev + 1);
    api.Articles.favorite(slug);
  };

  const unfavoriteHandle = () => {
    setFavorited(false);
    setFavoritesCount((prev) => prev - 1);
    api.Articles.unfavorite(slug);
  };

  const followHandle = () => {
    if (isAuth !== true) {
      navigate("/login");
      return;
    }
  };

  const favoriteArticleHandle = () => {
    if (isAuth !== true) {
      navigate("/login");
      return;
    }
    favorited === true ? unfavoriteHandle() : favoriteHandle();
  };

  const removeArticle = () => {
    api.Articles.delete(slug).then(() => {
      navigate("/");
    });
  };

  if (!article) return null;

  const isAuthorCheck = isAuthor(article.author);

  if (isAuthorCheck !== true)
    return (
      <>
        <button
          className="btn btn-sm btn-outline-secondary"
          onClick={followHandle}
        >
          <i className="ion-plus-round"></i>
          &nbsp; Follow {article.author.username}
        </button>
        &nbsp;
        <button
          className={`btn btn-outline-primary btn-sm ${
            favorited === true ? "active" : ""
          }`}
          onClick={favoriteArticleHandle}
        >
          <i className="ion-heart"></i>
          &nbsp;{" "}
          {favorited === true ? "Unfavorite Article " : "Favorite Article "}
          <span className="counter">({favoritesCount})</span>
        </button>
      </>
    );
  return (
    <span>
      <Link to={`/editor/${slug}`} className="btn btn-outline-secondary btn-sm">
        &nbsp;<i className="ion-edit"></i> Edit Article
      </Link>
      &nbsp;
      <button className="btn btn-outline-danger btn-sm" onClick={removeArticle}>
        &nbsp;<i className="ion-trash-a"></i> Delete Article
      </button>
    </span>
  );
};

export default ArticleActions;
