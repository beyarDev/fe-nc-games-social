import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import ReviewCard from "./reviewCard";
import Loading from "./loading";
export default function Category() {
  const { slug } = useParams();
  const [reviewByCategory, setReviewByCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`https://nc-games-social.herokuapp.com/api/reviews?category=${slug}`)
      .then((response) => {
        setReviewByCategory(response.data.reviews);
        setIsLoading(false);
      });
  }, [slug]);
  return isLoading ? (
    <Loading />
  ) : (
    <main>
      {reviewByCategory.map((review) => {
        return (
          <ReviewCard
            review={review}
            key={review.review_id}
            setReviewByCategory={setReviewByCategory}
          />
        );
      })}
    </main>
  );
}
