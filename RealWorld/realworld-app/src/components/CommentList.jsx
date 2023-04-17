import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import Context from "../app/context";
import { AuthContext } from "../app/auth";
import { deleteComment } from "../features/comment.js";

const DeleteCommentButton = ({ commentId }) => {
  const { slug } = useParams();
  const { comments, setComments } = useContext(Context);

  const deleteCommentHandle = () => {
    setComments(comments.filter((comment) => comment.id !== commentId));
    deleteComment({ slug, id: commentId });
  };

  return (
    <button
      className="btn btn-sm btn-link mod-options"
      onClick={deleteCommentHandle}
    >
      <i className="ion-trash-a" />
      <span className="sr-only">Delete comment</span>
    </button>
  );
};

const Comment = ({ comment }) => {
  const { isAuthor } = useContext(AuthContext);
  const isAuthorCheck = isAuthor(comment.author);

  return (
    <div className="card" data-testid="comment">
      <div className="card-block">
        <p className="card-text">{comment.body}</p>
      </div>

      <div className="card-footer">
        <Link
          to={`/user/${comment.author.username}`}
          className="comment-author"
        >
          <img
            className="comment-author-img"
            alt={comment.author.username}
            src={
              comment.author.image ??
              "https://static.productionready.io/images/smiley-cyrus.jpg"
            }
          />
        </Link>
        &nbsp;
        <Link
          to={`/user/${comment.author.username}`}
          className="comment-author"
        >
          {comment.author.username}
        </Link>
        <time className="date-posted" dateTime={comment.createdAt}>
          {new Date(comment.createdAt).toDateString()}
        </time>
        {isAuthorCheck ? <DeleteCommentButton commentId={comment.id} /> : null}
      </div>
    </div>
  );
};

const CommentList = ({ comments }) => {
  if (!comments) return null;
  return (
    <>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </>
  );
};

export default CommentList;
