import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import * as api from "../utils/api";
//components
import ReviewCard from "./reviewCard";
import Loading from "./loading";
import FilterReviews from "./filterReviews";
//style
import "../styles/homepage.css";

export default function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [reviewList, setReviewList] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const queryObject = {
    sort_by: searchParams.get("sortby"),
    order: searchParams.get("order"),
    limit: 100,
  };
  useEffect(() => {
    api.getData("reviews", queryObject).then((response) => {
      setReviewList(response.data.reviews);
      setIsLoading(false);
    });
  }, [queryObject.order, queryObject.sort_by]);

  return isloading ? (
    <Loading />
  ) : (
    <main>
      <FilterReviews />
      <section>
        {reviewList.map((review) => {
          return (
            <ReviewCard
              review={review}
              key={review.review_id}
              setReviewList={setReviewList}
            />
          );
        })}
      </section>
    </main>
  );
}
