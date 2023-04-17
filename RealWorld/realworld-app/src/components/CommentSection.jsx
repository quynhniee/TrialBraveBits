import React, { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CommentList from "./CommentList";
import Errors from "./Errors";
import { AuthContext } from "../app/auth";

function CommentForm() {
  const currentUser = undefined;
  const { slug } = useParams();
  const [body, setBody] = useState("");

  const changeBody = (event) => {
    setBody(event.target.value);
  };

  const saveComment = (event) => {
    event.preventDefault();
    setBody("");
  };

  return (
    <form className="card comment-form" onSubmit={saveComment}>
      <div className="card-block">
        <textarea
          className="form-control"
          placeholder="Write a comment..."
          rows={3}
          value={body}
          onChange={changeBody}
        />
      </div>

      <div className="card-footer">
        <img
          className="comment-author-img"
          alt={currentUser.username}
          src={
            currentUser.image ??
            "https://static.productionready.io/images/smiley-cyrus.jpg"
          }
        />
        <button className="btn btn-sm btn-primary" type="submit">
          Post Comment
        </button>
      </div>
    </form>
  );
}

const CommentSection = () => {
  const errors = [];
  const { isAuth } = useContext(AuthContext);

  return (
    <div className="row">
      {isAuth ? (
        <div className="col-xs-12 col-md-8 offset-md-2">
          <Errors errors={errors} />

          <CommentForm />

          <CommentList />
        </div>
      ) : (
        <div className="col-xs-12 col-md-8 offset-md-2">
          <p>
            <Link to="/login">Sign in</Link>
            &nbsp;or&nbsp;
            <Link to="/register">sign up</Link>
            &nbsp;to add comments on this article.
          </p>

          <CommentList />
        </div>
      )}
    </div>
  );
};

export default CommentSection;
