import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import * as api from "../utils/api";
import { Link } from "react-router-dom";
//components
import ReviewCard from "./reviewCard";
import Loading from "./loading";
import FilterReviews from "./filterReviews";
//style
import "../styles/homepage.css";

export default function HomePage() {
  const [searchParams] = useSearchParams();
  const [reviewList, setReviewList] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const queryObject = {
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
        setReviewList(response.data.reviews);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
      });
  }, [queryObject.order, queryObject.sort_by]);

  return isloading ? (
    <Loading />
  ) : (
    <main>
      <Link to='/post-review' className="post-review-link">Post A Review</Link>
      <FilterReviews />
      <section>
        {error ? (
          <h3 className="error">could not load data from the server, please try again later</h3>
        ) : (
          reviewList.map((review) => {
            return (
              <ReviewCard
                review={review}
                key={review.review_id}
                setReviewList={setReviewList}
              />
            );
          })
        )}
      </section>
    </main>
  );
}
