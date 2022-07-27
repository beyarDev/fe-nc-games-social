import { sliceDate } from "../utils/sliceDate";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import IncVotesBtn from "./incvotesbtn";
import DecVotesBtn from "./decvotesbtn";
import Loading from "./loading";
export default function SingleReview() {
  const { reviewId } = useParams();
  const [singleReview, setSingleReview] = useState({});
  const [user, setUsers] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [disableInc, setDisableInc] = useState(false);
  const [disableDec, setDisableDec] = useState(false);
  useEffect(() => {
    axios
      .get(`https://nc-games-social.herokuapp.com/api/reviews/${reviewId}`)
      .then((response) => {
        const review = response.data.review;
        setSingleReview(review);
        setIsLoading(false);
        return review;
      })
      .then((review) => {
        axios
          .get(
            `https://nc-games-social.herokuapp.com/api/users/${review.owner}`
          )
          .then((response) => {
            setUsers(response.data.user);
          });
      });
  }, [reviewId]);

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
        <IncVotesBtn
          reviewID={singleReview.review_id}
          setSingleReview={setSingleReview}
          setDisableInc={setDisableInc}
          disableInc={disableInc}
          setDisableDec={setDisableDec}
        />
        <DecVotesBtn
          reviewID={singleReview.review_id}
          setSingleReview={setSingleReview}
          setDisableDec={setDisableDec}
          disableDec={disableDec}
          setDisableInc={setDisableInc}
        />
        <span className="review-votes">{singleReview.votes}</span>
      </div>
      <span className="review-comment-count">
        {singleReview.comment_count} comments
      </span>
    </div>
  );
}
