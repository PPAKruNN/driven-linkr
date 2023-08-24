import styled from "styled-components";

const UserPageContainer = styled.div`
  width: 70%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 40px;
`;

const SideBarContainer = styled.div`
  flex: 1;
  margin-left: 40px;
  display: flex;
  align-items: start;
  flex-direction: column;
  gap: 60px;
  z-index: 0;
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
`;

const PostsHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 913px;

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
