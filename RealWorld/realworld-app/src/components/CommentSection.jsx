import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CommentList from "./CommentList";
import Errors from "./Errors";
import { AuthContext } from "../app/auth";
import Context from "../app/context";
import api from "../api";
import { createComment } from "../features/comment";

function CommentForm({ createCommentHandle }) {
  const { setCurrentUser, currentUser } = useContext(AuthContext);
  const [body, setBody] = useState("");

  const changeBody = (event) => {
    setBody(event.target.value);
  };

  const saveComment = (event) => {
    event.preventDefault();
    createCommentHandle(body);
    setBody("");
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    setCurrentUser(user);
  }, []);

  if (!currentUser) return <p>Loading...</p>;
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
  const { comments, setComments } = useContext(Context);
  const { slug } = useParams();
  const { isAuth } = useContext(AuthContext);
  const errors = [];

  const addCommentPending = (response) => {
    setComments([response, ...comments]);
  };

  const createCommentHandle = (body) => {
    createComment({ slug, body: body.trim() }, addCommentPending);
  };

  useEffect(() => {
    api.Comments.get(slug).then((response) => {
      setComments(response.comments);
    });
  }, []);
  return (
    <div className="row">
      {isAuth ? (
        <div className="col-xs-12 col-md-8 offset-md-2">
          <Errors errors={errors} />

          <CommentForm createCommentHandle={createCommentHandle} />

          <CommentList comments={comments} />
        </div>
      ) : (
        <div className="col-xs-12 col-md-8 offset-md-2">
          <p>
            <Link to="/login">Sign in</Link>
            &nbsp;or&nbsp;
            <Link to="/register">sign up</Link>
            &nbsp;to add comments on this article.
          </p>

          <CommentList comments={comments} />
        </div>
      )}
    </div>
  );
};

export default CommentSection;
