import { DebounceInput } from "react-debounce-input";
import { useRef, useState } from "react";
import {
  ComponentContainer,
  SearchBarWrapper,
  SearchResultsWrapper,
} from "./styled";
import searchIcon from "../../assets/images/icons/searchIcon.png";
import SearchResultCard from "../SearchResultCard";
import api from "../../services/api";
import useAuth from "../../hooks/useAuth";

export default function SearchBar() {
  const inputRef = useRef();
  const [searchResults, setSearchResults] = useState([]);
  const { auth } = useAuth() || {};

  function handleInputChange() {
    if (inputRef.current.state.value.length < 3) {
      setSearchResults([]);
      return;
    }
    const inputValue = inputRef.current.state.value;

    const promise = api.searchUsers(auth.token, inputValue);

    promise
      .then((res) => {
        setSearchResults(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <ComponentContainer>
      <SearchBarWrapper>
        <DebounceInput
          data-test="search"
          ref={inputRef}
          minLength={3}
          debounceTimeout={30}
          onChange={handleInputChange}
          className="search-input"
          placeholder={"Search for people"}
          onBlur={() => setTimeout(() => setSearchResults([]), 200)}
          onFocus={handleInputChange}
        />
        <img src={searchIcon} alt="search icon" />
      </SearchBarWrapper>
      {searchResults.length > 0 && (
        <SearchResultsWrapper>
          {searchResults.map((result) => (
            <SearchResultCard
              data-test="user-search"
              key={result.id}
              id={result.id}
              profileUrl={result.profileUrl}
              userName={result.userName}
            />
          ))}
        </SearchResultsWrapper>
      )}
    </ComponentContainer>
  );
}
