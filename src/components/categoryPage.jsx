import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import * as api from "../utils/api";

import ReviewCard from "./reviewCard";
import Loading from "./loading";
import FilterReviews from "./filterReviews";

export default function Category() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const [reviewByCategory, setReviewByCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const queryObject = {
    category: slug,
    sort_by: searchParams.get("sortby"),
    order: searchParams.get("order"),
    limit: 100,
  };
  useEffect(() => {
    setError(null);
    setIsLoading(true);
    api
      .getData("reviews", queryObject)
      .then((response) => {
        setReviewByCategory(response.data.reviews);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
      });
  }, [slug, queryObject.order, queryObject.limit, queryObject.sort_by]);
  return isLoading ? (
    <Loading />
  ) : (
    <main>
      <FilterReviews />
      {error ? (
        <h3 className="error">invalid URL query</h3>
      ) : (
        reviewByCategory.map((review) => {
          return <ReviewCard review={review} key={review.review_id} />;
        })
      )}
    </main>
  );
}
