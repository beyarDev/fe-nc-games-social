import { useState } from "react";
import * as api from "../utils/api";

export default function DeleteBtn({ commentId, setComments, setCommentCount }) {
  const [error, setError] = useState(null);
  const [disable, setDisable] = useState(false);
  function handelDelete(e) {
    setError(null);
    setDisable(true);
    api
      .deleteComment(commentId)
      .then(() => {
        setComments((prevComment) => {
          const updatedComments = prevComment.filter((comment) => {
            return comment.comment_id !== commentId;
          });
          return updatedComments;
        });
        setCommentCount((prevCount) => {
          return prevCount - 1;
        });
        setDisable(false);
      })
      .catch((err) => {
        setError(err);
      });
  }
  if (error) {
    return <strong className="error">Sorry could not delete the comment</strong>;
  }
  return (
    <button
      onClick={handelDelete}
      disabled={disable}
      className="delete-comment-btn"
    >
      Delete
    </button>
  );
}
