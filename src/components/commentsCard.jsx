import { useEffect, useState } from "react";
import * as api from "../utils/api";
import { userAvatarUrl } from "../utils/createRef";
export default function CommentsCard({ reviewId }) {
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    api
      .getData(`reviews/${reviewId}/comments`)
      .then((response) => {
        setComments(response.data.comments);
        return api.getData("users");
      })
      .then((response) => setUsers(response.data.users));
  }, [reviewId]);

  return (
    <div className="comments-container">
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
