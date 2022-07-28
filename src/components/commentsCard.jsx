import { useEffect, useState, useContext } from "react";
import * as api from "../utils/api";
import { userAvatarUrl, addNewComment } from "../utils/createRef";
import { UserContext } from "../contexts/userContext";

export default function CommentsCard({ reviewId }) {
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState([]);
  const { username } = useContext(UserContext);
  const [commentText, setCommentText] = useState("");
  const [disable, setDisable] = useState(false);
  const [error, setEror] = useState(null);
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    api
      .getData(`reviews/${reviewId}/comments`)
      .then((response) => {
        setComments(response.data.comments);
        return api.getData("users");
      })
      .then((response) => setUsers(response.data.users));
  }, [reviewId]);

  function handelSubmit(e) {
    e.preventDefault();
    setDisable(true);
    setComments((prevComments) => {
      return addNewComment(prevComments, username, commentText);
    });
    api
      .postData(`reviews/${reviewId}/comments`, {
        username: username,
        body: commentText,
      })
      .then((response) => {
        setCommentText("");
        setDisable(false);
        setSuccess(true);
      })
      .catch((err) => {
        setEror(err);
      });
  }

  return (
    <div className="comments-container">
      {success ? (
        <strong>your comment has been added successfuly</strong>
      ) : null}
      {error ? (
        <p>could not post the comment</p>
      ) : (
        <form onSubmit={handelSubmit} className="comment-form">
          <textarea
            type="textarea"
            value={commentText}
            onChange={(e) => {
              setCommentText(e.target.value);
              setSuccess(false);
            }}
            className="comment-textarea"
            placeholder="write a comment"
          ></textarea>
          <button
            disabled={disable}
            className={disable ? "disabled-btn" : null}
          >
            post
          </button>
        </form>
      )}
      {comments.map((comment) => {
        return (
          <div key={comment.comment_id} className="comment-card">
            <div className="avatar-author-container">
              <img
                src={userAvatarUrl(comment, users)}
                alt="commenter"
                className="comment-author-avatar"
              />
              <strong className="comment-author">{comment.author}</strong>
            </div>
            <p className="comment-body">{comment.body}</p>
            <span className="comment-votes">
              <span className="comment-votes-count">{comment.votes}</span> Votes
            </span>
          </div>
        );
      })}
    </div>
  );
}
