import { SearchResultCardLink, SearchResultCardWrapper } from "./styled";

export default function SearchResultCard({ id, profileUrl, userName }) {
  return (
    <SearchResultCardWrapper>
      <img src={profileUrl} alt="profile picture" />
      <SearchResultCardLink to={`/user/${id}`}>{userName}</SearchResultCardLink>
    </SearchResultCardWrapper>
  );
}
