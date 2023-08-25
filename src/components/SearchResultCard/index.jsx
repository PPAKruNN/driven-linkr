import { SearchResultCardWrapper } from "./styled";
import { useNavigate } from "react-router-dom";

export default function SearchResultCard({ id, profileUrl, userName }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/user/${id}`);
  }
  
  return (
    <SearchResultCardWrapper>
      <img src={profileUrl} alt="profile picture" />
      <h1 onClick={handleClick}>{userName}</h1>
    </SearchResultCardWrapper>
  );
}
