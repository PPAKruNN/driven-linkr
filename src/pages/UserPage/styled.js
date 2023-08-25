import styled from "styled-components";

const UserPageContainer = styled.div`
  width: 70%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 40px;

  @media (max-width: 480px) {
    width: 100vw;
    flex-direction: column;
  }

  .mobile-search-bar {
    margin-top: 35px;
    padding: 0 10px;

    @media (min-width: 481px) {
      display: none;
    }
  }
`;

const SideBarContainer = styled.div`
  flex: 1;
  margin-left: 40px;
  display: flex;
  align-items: start;
  flex-dire
  z-index: 0;
  @media screen and (max-width: 480px) {
    display: none;
  }
`;

const PostsContainer = styled.div`
  width: 75%;

  h1 {
    font-weight: 700;
    font-size: 43px;
    line-height: 63px;
    margin-bottom: 30px;
    margin-top: 50px;
  }

  @media screen and (max-width: 480px) {
    width: 100%;
  }

`;

const PostsHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100vw;
  max-width: 133%;
  min-width: 375px;
  background-color: red;

  @media screen and (max-width: 480px) {
    min-width: 0;
  }

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-top: 30px;
  }

  div {
    display: flex;
    gap: 18px;
    align-items: center;
  }
`;

const FollowButton = styled.button`
  width: 112px;
  height: 31px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  background: #1877f2;
  margin-top: 85px;
  align-self: end;
  cursor: pointer;

  &:hover {
    background: #42a5f5;
  }

  &:disabled {
    background: #012f6b;
    cursor: not-allowed;
  }

  p {
    color: #fff;
    font-family: Lato;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`;

const UnFollowButton = styled.button`
  width: 112px;
  height: 31px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  background: #fff;
  margin-top: 85px;
  align-self: end;
  cursor: pointer;

  &:hover {
    background: #e3e3e3;
  }

  &:disabled {
    background: #012f6b;
    cursor: not-allowed;
  }

  p {
    color: #1877f2;
    font-family: Lato;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`;

export {
  UserPageContainer,
  SideBarContainer,
  PostsContainer,
  PostsHeaderContainer,
  FollowButton,
  UnFollowButton,
};
