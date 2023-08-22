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

  .search-input {

    width: 553px;
    height: 20px;

    border-radius: 8px;
    background: #fff;

    font-family: Lato;
    font-size: 19px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
   
    @media screen and (max-width: 768px) {
      width: 250px;
    }
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
  width: 630px;
  top: 50px;
  z-index: -1;
  padding-top: 20px;
`;

export { ComponentContainer, SearchBarWrapper, SearchResultsWrapper };
