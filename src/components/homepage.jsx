import axios from "axios";
import { useState, useEffect } from "react"
//components
import ReviewCard from "./reviewCard";
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
                    return <ReviewCard review={review} key={review.review_id}/>
                })}
             </section>
           </main>
}