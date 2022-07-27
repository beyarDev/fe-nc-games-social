import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as api from "../utils/api";

import ReviewCard from "./reviewCard";
import Loading from "./loading";

export default function Category() {
  const { slug } = useParams();
  const [reviewByCategory, setReviewByCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    api.getData(`reviews?category=${slug}`).then((response) => {
      setReviewByCategory(response.data.reviews);
      setIsLoading(false);
    });
  }, [slug]);
  return isLoading ? (
    <Loading />
  ) : (
    <main>
      {reviewByCategory.map((review) => {
        return <ReviewCard review={review} key={review.review_id} />;
      })}
    </main>
  );
}
