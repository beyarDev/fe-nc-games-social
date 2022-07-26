import { useState,useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { sliceDate } from "../utils/sliceDate";

export default function Category(){
    const {slug} = useParams()
    const [reviewByCategory, setReviewByCategory] = useState([])
    useEffect(()=>{
        axios.get(`https://nc-games-social.herokuapp.com/api/reviews?category=${slug}`).then(response =>{
            setReviewByCategory(response.data.reviews)
        })
    },[slug])
    return <main>
            {reviewByCategory.map(review =>{
                    return <div key={review.review_id} className='review-card'>
                            <div className="flex-center review-owner-date-container">
                            <span className="review-owner">{review.owner}</span>
                            <span className="review-date">{sliceDate(review.created_at)}</span>
                            </div>
                            <span className="review-title">{review.title}</span>
                            <img className="review-img" src={review.review_img_url} alt={review.title}></img>
                            <span className="review-category"><span className="low-contrast">Category :</span> {review.category}</span>
                            <span className="review-designer"><span className="low-contrast">Designer :</span> {review.designer}</span>
                            <p className="review-body">{review.review_body}</p>
                            <div className="review-votes-container">
                               
                                <span className="review-votes">{review.votes}</span>
                            </div>
                            <span className="review-comment-count">{review.comment_count} comments</span>
                           </div>
                })}
           </main>
}