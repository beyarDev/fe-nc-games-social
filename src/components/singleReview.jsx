import { sliceDate } from "../utils/sliceDate";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as api from "../utils/api";
import Loading from "./loading";
import VotesBtn from "./votesbtn";
import ShowHideComments from "./showhidecomments";
import CommentsCard from "./commentsCard";

export default function SingleReview() {
  const { reviewId } = useParams();
  const [singleReview, setSingleReview] = useState({});
  const [user, setUsers] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [votes, setVotes] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [error, setError] = useState(null);
  useEffect(() => {
    setError(null);
    setIsLoading(true);
    api
      .getData(`reviews/${reviewId}`)
      .then((response) => {
        const review = response.data.review;
        setSingleReview(review);
        setVotes(review.votes);
        setCommentCount(review.comment_count);
        setIsLoading(false);
        return review;
      })
      .then((review) => {
        return api.getData(`users/${review.owner}`);
      })
      .then((response) => {
        setUsers(response.data.user);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
      });
  }, [reviewId]);
  if (error) {
    return <h3 className="error">Sorry could not load review</h3>;
  }
  return isLoading ? (
    <Loading />
  ) : (
    <div className="review-card">
      <div className="flex-center review-owner-date-container">
        <img
          src={user.avatar_url}
          alt={user.username}
          className="user-avatar"
        ></img>
        <span className="review-owner">{singleReview.owner}</span>
        <span className="review-date">
          {sliceDate(singleReview.created_at)}
        </span>
      </div>
      <span className="review-title">{singleReview.title}</span>
      <img
        className="review-img"
        src={singleReview.review_img_url}
        alt={singleReview.title}
      ></img>
      <span className="review-category">
        <span className="low-contrast">Category :</span> {singleReview.category}
      </span>
      <span className="review-designer">
        <span className="low-contrast">Designer :</span> {singleReview.designer}
      </span>
      <p className="review-body">{singleReview.review_body}</p>
      <div className="review-votes-container">
        <VotesBtn setVotes={setVotes} reviewID={singleReview.review_id} />
        <span className="review-votes">{votes}</span>
      </div>
      <ShowHideComments commentsCount={commentCount}>
        <CommentsCard
          reviewId={singleReview.review_id}
          setCommentCount={setCommentCount}
        />
      </ShowHideComments>
    </div>
  );
}
