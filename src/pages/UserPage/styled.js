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
  margin-left: 40px;
  display: flex;
  align-items: start;
  flex-direction: column;
  margin-top: 165px;
  @media screen and (max-width: 480px) {
    display: none;
  }
`;

const PostsContainer = styled.div`
  width: 75%;
  margin-top: 40px;
  
  h1,
  h2 {
    color: #fff;
    font-family: Oswald;
    font-size: 43px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    @media screen and (max-width: 480px) {
      font-size: 33px;
    }
  }

  h2 {
    @media screen and (max-width: 480px) {
      margin-left: 17px;
    }
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
  max-width: 70vw;
  min-width: 375px;
  height: 64px;
  margin-bottom: 41px;
  margin-top: 20px;

  @media screen and (max-width: 480px) {
    min-width: 100vw;
  }

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-top: 20px;
    margin-left: 30px;
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

  @media screen and (max-width: 480px) {
    margin-right: 17px;
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

  @media screen and (max-width: 480px) {
    margin-right: 17px;
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
