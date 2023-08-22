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
  justify-content: space-between;
  align-items: start;
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
  gap: 18px;
  
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-top: 30px;
  }
`;

export {
  UserPageContainer,
  SideBarContainer,
  PostsContainer,
  PostsHeaderContainer,
};
