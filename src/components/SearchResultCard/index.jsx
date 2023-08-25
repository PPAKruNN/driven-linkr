import { SearchResultCardWrapper } from "./styled";
import { useNavigate } from "react-router-dom";
import useUserContext from "../../hooks/useUserContext";

export default function SearchResultCard({ id, profileUrl, userName }) {
  const navigate = useNavigate();
  const { following } = useUserContext();

  function handleClick() {
    navigate(`/user/${id}`);
  }

  return (
    <SearchResultCardWrapper>
      <img src={profileUrl} alt="profile picture" />
      <h1 onClick={handleClick}>{userName} <span>{following.includes(id) && "• following"}</span></h1>
    </SearchResultCardWrapper>
  );
}
