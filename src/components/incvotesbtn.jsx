import axios from 'axios'
import {BiUpvote} from 'react-icons/bi'

export default function IncVotesBtn({reviewID}){
    function incVotes(){
        axios.patch(`https://nc-games-social.herokuapp.com/api/reviews/${reviewID}`,{"inc_votes": 1})
    }
    const incBtnStyle = {width:"40px",height:"100%",border: 'none', backgroundColor:'#fff', cursor: "pointer"}

    return <button onClick={incVotes} style={incBtnStyle}><BiUpvote style={{height:'100%', width:'100%'}}/></button>
}