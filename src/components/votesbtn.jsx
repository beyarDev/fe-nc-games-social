import { BiUpvote } from "react-icons/bi";
import { BiDownvote } from "react-icons/bi";
import { useState } from "react";
import * as api from "../utils/api";
import "../styles/votesbtn.css";

export default function VotesBtn({ reviewID, setVotes }) {
  const [incrementActive, setIncrementActive] = useState(false);
  const [decrementActive, setDecrementActive] = useState(false);
  const [error, setError] = useState(null);
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
        })
        .catch((err) => {
          setError(err);
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
        })
        .catch((err) => {
          setError(err);
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
        })
        .catch((err) => {
          setError(err);
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
        })
        .catch((err) => {
          setError(err);
        });
    }
  }
  if (error) {
    return <span className="error">error</span>;
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
