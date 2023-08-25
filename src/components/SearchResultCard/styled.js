import styled from "styled-components";

const SearchResultCardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 0px 8px 17px;
  gap: 12px;

  color: #515151;
  font-family: Lato;
  font-size: 19px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  &:hover {
    background: #333232;
    cursor: pointer;
    Link {
      cursor: pointer;
      color: #63edff;
    }
  }

  img {
    width: 39px;
    height: 39px;
    border-radius: 50%;
  }
  h1 {
    &:hover {
      cursor: pointer;
      color: #63edff;
    }
    color: #515151;
    font-family: Lato;
    font-size: 19px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  span {
    color: #C5C5C5;
  }

  @media (max-width: 480px) {
  }
`;

export { SearchResultCardWrapper };
