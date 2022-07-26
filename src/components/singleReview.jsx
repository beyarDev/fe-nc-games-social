import { sliceDate } from "../utils/sliceDate";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function SingleReview(){
    const {reviewId} = useParams()
    const [singleReview,setSingleReview] = useState({})
    const [user, setUsers] = useState({})
    useEffect(()=>{
        axios.get(`https://nc-games-social.herokuapp.com/api/reviews/${reviewId}`).then(response=>{
            const review = response.data.review
            setSingleReview(review)
            return review
              }).then((review)=>{
                axios.get(`https://nc-games-social.herokuapp.com/api/users/${review.owner}`).then(response =>{
                   setUsers(response.data.user)
                })
              })
    },[reviewId])
    
return <div className='review-card'>
    <div className="flex-center review-owner-date-container">
        <img src={user.avatar_url} alt={user.username} className='user-avatar'></img>
        <span className="review-owner">{singleReview.owner}</span>
         <span className="review-date">{sliceDate(singleReview.created_at)}</span>
    </div>
    <span className="review-title">{singleReview.title}</span>
    <img className="review-img" src={singleReview.review_img_url} alt={singleReview.title}></img>
    <span className="review-category"><span className="low-contrast">Category :</span> {singleReview.category}</span>
    <span className="review-designer"><span className="low-contrast">Designer :</span> {singleReview.designer}</span>
    <p className="review-body">{singleReview.review_body}</p>
    <div className="review-votes-container">
        <span className="review-votes">{singleReview.votes}</span>
    </div>
    <span className="review-comment-count">{singleReview.comment_count} comments</span>
</div>
}