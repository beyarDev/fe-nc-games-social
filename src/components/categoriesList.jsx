import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as api from "../utils/api";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    setError(null);
    api
      .getData("categories")
      .then((response) => {
        setCategories(response.data.categories);
      })
      .catch((err) => {
        setError(err);
      });
  });
  return (
    <ul className="categories-ul">
      {error ? (
        <li className="error">sorry could not load categories</li>
      ) : (
        categories.map((category) => {
          return (
            <li key={category.slug}>
              <Link to={`/categories/${category.slug}`}>{category.slug}</Link>
            </li>
          );
        })
      )}
    </ul>
  );
}
