import axios from "axios";
import { useState, useEffect } from "react"

import '../styles/homepage.css'
export default function HomePage(){
    const [reviewList, setReviewList] = useState([]);

    useEffect(()=>{
        axios.get(`https://nc-games-social.herokuapp.com/api/reviews`).then(response =>{
            setReviewList(response.data.reviews)
        })
    })
    
    return <main>
             <section>
                {reviewList.map(review =>{
                    return <div key={review.review_id}>
                            <span className="review-title">{review.title}</span>
                            <span className="review-category">{review.category}</span>
                            <span className="review-designer">{review.designer}</span>
                            <span className="review-owner">{review.owner}</span>
                            <p className="review-body">{review.review_body}</p>
                            <img className="review-img" src={review.review_img_url} alt={review.title}></img>
                            <span className="review-date">{review.created_at}</span>
                            <span className="review-votes">Votes {review.votes}</span>
                            <span className="review-comment-count">{review.comment_count} comments</span>
                            </div>
                })}
             </section>
           </main>
}