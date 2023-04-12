import React from "react";
import { Link, useParams } from "react-router-dom";

const ArticleActions = () => {
  const { slug } = useParams();
  const removeArticle = () => {};
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
