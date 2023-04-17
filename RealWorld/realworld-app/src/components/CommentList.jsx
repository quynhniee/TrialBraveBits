import React from "react";
import { Link, useParams } from "react-router-dom";

const DeleteCommentButton = ({ commentId }) => {
  const { slug } = useParams();

  const deleteComment = () => {};

  return (
    <button className="btn btn-sm btn-link mod-options" onClick={deleteComment}>
      <i className="ion-trash-a" />
      <span className="sr-only">Delete comment</span>
    </button>
  );
};

const Comment = ({ comment }) => {
  const isAuthor = false;

  return (
    <div className="card" data-testid="comment">
      <div className="card-block">
        <p className="card-text">{comment.body}</p>
      </div>

      <div className="card-footer">
        <Link to={`/@${comment.author.username}`} className="comment-author">
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
        <Link to={`/@${comment.author.username}`} className="comment-author">
          {comment.author.username}
        </Link>
        <time className="date-posted" dateTime={comment.createdAt}>
          {new Date(comment.createdAt).toDateString()}
        </time>
        {isAuthor ? <DeleteCommentButton commentId={comment.id} /> : null}
      </div>
    </div>
  );
};

const CommentList = () => {
  const comments = [];
  const { slug } = useParams();

  return (
    <>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </>
  );
};

export default CommentList;
