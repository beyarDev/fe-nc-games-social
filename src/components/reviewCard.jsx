import { Link } from "react-router-dom";
import { useState } from "react";
import { sliceDate } from "../utils/sliceDate";

import VotesBtn from "./votesbtn";
import CommentsCard from "./commentsCard";
import ShowHideComments from "./showhidecomments";

export default function ReviewCard({ review }) {
  const [votes, setVotes] = useState(review.votes);
  return (
    <div className="review-card">
      <div className="flex-center review-owner-date-container">
        <span className="review-owner">{review.owner}</span>
        <span className="review-date">{sliceDate(review.created_at)}</span>
      </div>
      <Link
        to={`/reviews/${review.title}/${review.review_id}`}
        className="review-title"
      >
        <span>{review.title}</span>
      </Link>
      <img
        className="review-img"
        src={review.review_img_url}
        alt={review.title}
      ></img>
      <span className="review-category">
        <span className="low-contrast">Category :</span> {review.category}
      </span>
      <span className="review-designer">
        <span className="low-contrast">Designer :</span> {review.designer}
      </span>
      <p className="review-body">{review.review_body}</p>
      <div className="review-votes-container">
        <VotesBtn reviewID={review.review_id} setVotes={setVotes} />
        <span className="review-votes">{votes}</span>
      </div>
      <ShowHideComments commentsCount={review.comment_count}>
        <CommentsCard reviewId={review.review_id} />
      </ShowHideComments>
    </div>
  );
}
