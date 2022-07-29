import { useSearchParams } from "react-router-dom";

export default function FilterReviews() {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <div className="filters-container">
      <label htmlFor="order">order</label>
      <select
        id="order"
        name="order"
        onChange={(e) => {
          searchParams.set("order", e.target.value);
          setSearchParams(searchParams);
        }}
      >
        <option value="DESC">descending</option>
        <option value="ASC">ascending</option>
      </select>
      <label htmlFor="sortby">SortBy</label>
      <select
        id="sortby"
        name="sortby"
        onChange={(e) => {
          searchParams.set("sortby", e.target.value);
          setSearchParams(searchParams);
        }}
      >
        <option value="created_at">date</option>
        <option value="comment_count">comment counts</option>
        <option value="votes">votes</option>
      </select>
    </div>
  );
}
