import axios from "axios";
import { useState, useEffect } from "react"
import { sliceDate } from "../utils/sliceDate";
//components
import IncVotesBtn from "./incvotesbtn";
//style
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
                    return <div key={review.review_id} className='review-card'>
                            <div className="flex-center review-img-owner-container">
                            <img className="review-img" src={review.review_img_url} alt={review.title}></img>
                            <span className="review-owner">{review.owner}</span>
                            </div>
                            <span className="review-title">{review.title}</span>
                            <span className="review-category">{review.category}</span>
                            <span className="review-designer">{review.designer}</span>
                            
                            <p className="review-body">{review.review_body}</p>

                            <span className="review-date">{sliceDate(review.created_at)}</span>
                            <div>
                                <IncVotesBtn/>
                                <span className="review-votes">{review.votes}</span>
                            </div>
                            
                            <span className="review-comment-count">{review.comment_count} comments</span>
                            </div>
                })}
             </section>
           </main>
}