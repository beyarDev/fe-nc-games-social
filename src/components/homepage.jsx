import axios from "axios";
import { useState, useEffect } from "react"
//components
import ReviewCard from "./reviewCard";
import Loading from './loading'
//style
import '../styles/homepage.css'
export default function HomePage(){
    const [reviewList, setReviewList] = useState([]);
    const [isloading, setIsLoading] = useState(true)
    useEffect(()=>{
        axios.get(`https://nc-games-social.herokuapp.com/api/reviews`).then(response =>{
            setReviewList(response.data.reviews)
            setIsLoading(false)
        })
    })
    
    return isloading? <Loading/> : <main>
             <section>
                {reviewList.map((review) =>{
                    return <ReviewCard review={review} key={review.review_id} setReviewList={setReviewList} />
                })}
             </section>
           </main>
}