import { Link } from "react-router-dom"
import { sliceDate } from "../utils/sliceDate"
import IncVotesBtn from "./incvotesbtn"
import DecVotesBtn from "./decvotesbtn"
export default function ReviewCard({review, setReviewList}){
    return <div className='review-card'>
                <div className="flex-center review-owner-date-container">
                    <span className="review-owner">{review.owner}</span>
                     <span className="review-date">{sliceDate(review.created_at)}</span>
                </div>
                <Link to = {`/reviews/${review.title}/${review.review_id}`} className="review-title" ><span >{review.title}</span></Link>
                <img className="review-img" src={review.review_img_url} alt={review.title}></img>
                <span className="review-category"><span className="low-contrast">Category :</span> {review.category}</span>
                <span className="review-designer"><span className="low-contrast">Designer :</span> {review.designer}</span>
                <p className="review-body">{review.review_body}</p>
                <div className="review-votes-container">
                    <IncVotesBtn reviewID={review.review_id} setReviewList={setReviewList}/>
                    <DecVotesBtn reviewID={review.review_id} setReviewList={setReviewList}/>
                    <span className="review-votes">{review.votes}</span>
                </div>
                <span className="review-comment-count">{review.comment_count} comments</span>
            </div>
}