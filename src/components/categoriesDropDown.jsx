import { useState } from "react";
export default function CategoriesDropDown({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        className="category-dropDown-btn"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        Category
      </button>
      <>{isOpen && children}</>
    </>
  );
}
