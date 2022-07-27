import { BiUpvote } from "react-icons/bi";
import { BiDownvote } from "react-icons/bi";
import { useState } from "react";
import * as api from "../utils/api";
import "../styles/votesbtn.css";

export default function VotesBtn({ reviewID, setVotes }) {
  const [incrementActive, setIncrementActive] = useState(false);
  const [decrementActive, setDecrementActive] = useState(false);

  function incVotes() {
    if (incrementActive) {
      setVotes((prevVote) => {
        return prevVote - 1;
      });
      api
        .patchData(`reviews/${reviewID}`, {
          inc_votes: -1,
        })
        .then(() => {
          setIncrementActive(false);
        });
    } else {
      setVotes((prevVote) => {
        return prevVote + 1;
      });
      api
        .patchData(`reviews/${reviewID}`, {
          inc_votes: +1,
        })
        .then(() => {
          setIncrementActive(true);
        });
    }
  }
  function decVotes() {
    if (decrementActive) {
      setVotes((prevVote) => {
        return prevVote + 1;
      });
      api
        .patchData(`reviews/${reviewID}`, {
          inc_votes: +1,
        })
        .then(() => {
          setDecrementActive(false);
        });
    } else {
      setVotes((prevVote) => {
        return prevVote - 1;
      });
      api
        .patchData(`reviews/${reviewID}`, {
          inc_votes: -1,
        })
        .then(() => {
          setDecrementActive(true);
        });
    }
  }
  return (
    <>
      <button
        onClick={incVotes}
        className="votes-btn"
        disabled={decrementActive}
      >
        <BiUpvote
          className={
            incrementActive ? "votes-icon active-votes-btn" : "votes-icon"
          }
        />
      </button>
      <button
        onClick={decVotes}
        className="votes-btn"
        disabled={incrementActive}
      >
        <BiDownvote
          className={
            decrementActive ? "votes-icon active-votes-btn" : "votes-icon"
          }
        />
      </button>
    </>
  );
}
