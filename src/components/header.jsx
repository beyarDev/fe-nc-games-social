import { useContext, useState, useEffect } from "react";
import { UserContext } from "../contexts/userContext";
import "../styles/header.css";
import axios from "axios";
export default function Header() {
  const [userImageUrl, setUserImageUrl] = useState("");
  const { username } = useContext(UserContext);

  useEffect(() => {
    axios
      .get(`https://nc-games-social.herokuapp.com/api/users/${username}`)
      .then((response) => {
        setUserImageUrl(response.data.user.avatar_url);
      });
  }, [username]);

  return (
    <header className="header">
      <h1>Welcome {username}</h1>
      <img src={userImageUrl} alt={username} className="profile--img"></img>
    </header>
  );
}
