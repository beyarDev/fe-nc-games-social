import axios from 'axios'
import {BiUpvote} from 'react-icons/bi'

export default function IncVotesBtn({reviewID}){
    function incVotes(){
        axios.patch(`https://nc-games-social.herokuapp.com/api/reviews/${reviewID}`,{"inc_votes": 1})
    }
    const incBtnStyle = {width:"fit-content",height:"30px",border: 'none', backgroundColor: 'none', cursor: "pointer"}

    return <button onClick={incVotes} style={incBtnStyle}><BiUpvote/></button>
}