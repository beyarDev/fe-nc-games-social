import { useContext, useState, useEffect } from "react";
import { UserContext } from "../contexts/userContext";
import "../styles/header.css";
import * as api from "../utils/api";

export default function Header() {
  const [userImageUrl, setUserImageUrl] = useState("");
  const { username } = useContext(UserContext);
  const [error, setError] = useState(null);
  useEffect(() => {
    setError(null);
    api
      .getData(`users/${username}`)
      .then((response) => {
        setUserImageUrl(response.data.user.avatar_url);
      })
      .catch((err) => {
        setError(err);
      });
  }, [username]);

  return (
    <header className="header">
      {error ? (
        <h3 className="error">could not load user</h3>
      ) : (
        <h1>
          Welcome <span className="user-name">{username}</span>
        </h1>
      )}

      <img src={userImageUrl} alt={username} className="profile--img"></img>
    </header>
  );
}
