import { useState } from "react";
import '../styles/comments.css'
export default function ShowHideComments({ commentsCount, children }) {
  const [show, setShow] = useState(false);
  return (
    <>
      <div className="flex-center">
        <span>{commentsCount}</span>
        <button
          className="show-comments-btn"
          onClick={() => {
            setShow(!show);
          }}
        >
          Comments
        </button>
      </div>
      <>{show && children}</>
    </>
  );
}
