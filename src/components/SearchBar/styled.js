import styled from "styled-components";

const ComponentContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background: #e7e7e7;
  gap: 14px;
`;

const SearchBarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background: #fff;
  max-width: 563px;
  width: 50vw;

  @media (max-width: 480px) {
    z-index: 1;
    width: 100%;
  }

  .search-input {
    height: 20px;
    border-radius: 8px;

    font-family: Lato;
    font-size: 19px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;

    &::placeholder {
      color: #c6c6c6;
    }
  }

  img {
    padding-top: 5px;
    padding-right: 11px;
    cursor: pointer;
  }
`;

const SearchResultsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background: #e7e7e7;
  padding-bottom: 10px;
  position: absolute;
  top: 40px;
  z-index: -1;
  padding-top: 20px;
  max-width: 563px;
  width: 50vw;
`;

export { ComponentContainer, SearchBarWrapper, SearchResultsWrapper };
