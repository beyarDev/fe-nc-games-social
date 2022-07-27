import axios from 'axios'
import {BiUpvote} from 'react-icons/bi'

export default function IncVotesBtn({reviewID, setSingleReview, setReviewList, setDisableInc, disableInc, setDisableDec, setReviewByCategory}){
    function incVotes(){
        axios.patch(`https://nc-games-social.herokuapp.com/api/reviews/${reviewID}`,{"inc_votes": 1}).then((response)=>{
            setDisableInc(true)
            setDisableDec(false)
        })
        if(setSingleReview !== undefined){
            setSingleReview((prevReview)=>{
                const newReview = {...prevReview}
                newReview.votes +=1
                return newReview
            })
        }
        if(setReviewList){
            setReviewList(prevList =>{
                const newList = [...prevList]
                const updatedVotesReviewList = newList.map(review =>{
                    const newReview = {...review}
                    if(newReview.review_id === reviewID){
                        newReview.votes +=1
                    }
                    return newReview;
                })
                return updatedVotesReviewList
            })
        }
        if(setReviewByCategory){
            setReviewByCategory(prevList =>{
                const newList = [...prevList]
                const updatedVotesReviewList = newList.map(review =>{
                    const newReview = {...review}
                    if(newReview.review_id === reviewID){
                        newReview.votes +=1
                    }
                    return newReview;
                })
                return updatedVotesReviewList
            })
        }
    }
    const incBtnStyle = {width:"40px",height:"100%",border: 'none', backgroundColor:'#fff', cursor: "pointer"}

    return <button onClick={incVotes} style={incBtnStyle} disabled={disableInc}><BiUpvote style={{height:'100%', width:'100%'}}/></button>
}