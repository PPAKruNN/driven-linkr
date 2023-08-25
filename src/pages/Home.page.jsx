import React from "react";
import { styled } from "styled-components";
import UserPostForm from "../components/UserPostForm.component";
import TimelinePosts from "../components/TimelinePostList.component.jsx";
import TrendingTags from "../components/TrendingTags.component";
import Nav from "../components/Nav.component";
import SearchBar from "../components/SearchBar";

export default function Home() {
  return (
    <HomePageContainer>
      <Nav />
      <div className="mobile-search-bar">
        <SearchBar />
      </div>
      <TimelineContainer>
        <h1>timeline</h1>
        <UserPostForm />
        <TimelinePosts />
      </TimelineContainer>

      <SideBarContainer>
        <TrendingTags />
      </SideBarContainer>
    </HomePageContainer>
  );
}

const HomePageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 40px;

  .mobile-search-bar {
    margin-top: 35px;
    padding: 0 10px;

    @media (min-width: 481px) {
      display: none;
    }
  }

  @media (max-width: 480px) {
    width: 100vw;
    flex-direction: column;
  }

  @media screen and (min-width: 650px) {
    width: 60%;
  }
`;

const SideBarContainer = styled.div`
  flex: 1;
  margin-left: 40px;
  display: flex;
  justify-content: space-between;
  align-items: start;

  @media screen and (max-width: 480px) {
    flex-direction: row;
    display: none;
  }
`;

const TimelineContainer = styled.div`
  width: 75%;

  h1 {
    font-weight: 700;
    font-size: 43px;
    line-height: 63px;
    margin-bottom: 30px;
    margin-top: 50px;
  }

  @media (max-width: 480px) {
    width: 100%;
    h1 {
      font-weight: 700;
      font-size: 33px;
      line-height: 48px;
      margin-bottom: 30px;
      margin-top: 19px;
      margin-left: 17px;
    }
  }
`;
