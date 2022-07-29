import { useState } from "react";
import * as api from "../utils/api";

export default function DeleteBtn({ commentId, setComments }) {
  const [error, setError] = useState(null);
  function handelDelete(e) {
    setComments((prevComment) => {
      setError(null);
      const updatedComments = prevComment.filter((comment) => {
        return comment.comment_id !== commentId;
      });
      return updatedComments;
    });
    api.deleteComment(commentId).catch((err) => {
      setError(err);
    });
  }
  if (error) {
    return <strong>Sorry could not delete the comment</strong>;
  }
  return <button onClick={handelDelete}>Delete</button>;
}
