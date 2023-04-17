import React, { useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../app/auth";

const ArticleActions = ({ article }) => {
  const { slug } = useParams();
  const { isAuthor, isAuth } = useContext(AuthContext);
  const navigate = useNavigate();

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

  const removeArticle = () => {};

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
      </>
    );
  return (
    <span>
      <Link to={`/editor/${slug}`} className="btn btn-outline-secondary btn-sm">
        <i className="ion-edit"></i> Edit Article
      </Link>

      <button className="btn btn-outline-danger btn-sm" onClick={removeArticle}>
        <i className="ion-trash-a"></i> Delete Article
      </button>
    </span>
  );
};

export default ArticleActions;
