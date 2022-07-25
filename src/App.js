//style
import "./App.css";
// App components
import Header from "./components/header";
import Navigation from "./components/nav";
import HomePage from "./components/homepage";
//React components
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { UserContext } from "./contexts/userContext";

function App() {
  return (
    <UserContext.Provider value={{ username: "cooljmessy" }}>
    <BrowserRouter>
      <div className="App">
        <Header/>
        <Navigation/>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
        </Routes>
      </div>
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
