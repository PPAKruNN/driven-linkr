import { SearchResultCardLink, SearchResultCardWrapper } from "./styled";
import useUserContext from "../../hooks/useUserContext";

export default function SearchResultCard({ id, profileUrl, userName }) {
  const { following } = useUserContext();

  return (
    <SearchResultCardWrapper>
      <img src={profileUrl} alt="profile picture" />
      <SearchResultCardLink to={`/user/${id}`} reloadDocument>
        {userName}  <span>{following.includes(id) && "• following"}</span>
      </SearchResultCardLink>
    </SearchResultCardWrapper>
  );
}
