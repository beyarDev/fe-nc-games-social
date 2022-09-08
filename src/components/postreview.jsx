import { useState, useContext, useEffect } from "react";
import { UserContext } from "../contexts/userContext";
import { useNavigate } from "react-router-dom";
import * as api from "../utils/api";
import '../styles/post-form.css'
export default function PostReview() {
  const [reviewBody, setReviewBody] = useState("");
  const [title, setTitle] = useState("");
  const [designer, steDesigner] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("strategy");
  const [active, setActive] = useState(false)
  const { username } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    api.getData("categories").then((response) => {
      setCategories(response.data.categories);
    });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    setActive(true)
    api.postData("reviews", {
      title,
      owner: username,
      category: selectedCategory,
      designer,
      review_body: reviewBody,
    }).then(()=>{
      setActive(false)
      navigate('/')
    })
  }
  return (
    <form onSubmit={handleSubmit} className= "post-form">
      <label htmlFor="title">Title</label>
      <input
        id="title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <label htmlFor="designer">Game Designer</label>
      <input
        id="designer"
        value={designer}
        onChange={(e) => {
          steDesigner(e.target.value);
        }}
      />
      <label htmlFor="category">Category</label>
      <select id="category"
        onChange={(e) => {
          setSelectedCategory(e.target.value);
        }}
        defaultValue={selectedCategory}
      >
        {categories.map((category) => {
          return (
            <option key={category.description} value={category.slug}>
              {category.slug}
            </option>
          );
        })}
      </select>
      <textarea className="post-textarea"
        placeholder="Write a review"
        onChange={(e) => {
          setReviewBody(e.target.value);
        }}
        value={reviewBody}
      />
      <button className={active ? "post-submit-btn active-post-btn" : "post-submit-btn"} disabled={active}>Post</button>
    </form>
  );
}