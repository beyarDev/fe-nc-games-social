//style
import "./App.css";
// App components
import Header from "./components/header";
import Navigation from "./components/nav";
import HomePage from "./components/homepage";
import Category from "./components/categoryPage";
import SingleReview from "./components/singleReview";
import NotFound from "./components/notfound";
import PostReview from "./components/postreview";

//React components
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { UserContext } from "./contexts/userContext";

function App() {
  return (
    <UserContext.Provider value={{ username: "cooljmessy" }}>
      <BrowserRouter>
        <div className="App">
          <Header />
          <Navigation />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/post-review" element={<PostReview />} />
            <Route path="/categories/:slug" element={<Category />} />
            <Route
              path="/reviews/:reviewTitle/:reviewId"
              element={<SingleReview />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
