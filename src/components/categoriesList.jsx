import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as api from "../utils/api";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    api.getData("categories").then((response) => {
      setCategories(response.data.categories);
    });
  });
  return (
    <ul className="categories-ul">
      {categories.map((category) => {
        return (
          <li key={category.slug}>
            <Link to={`/categories/${category.slug}`}>{category.slug}</Link>
          </li>
        );
      })}
    </ul>
  );
}
