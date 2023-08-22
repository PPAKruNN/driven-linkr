import React from "react";
import HashtagPosts from "../components/HashtagPostList.component";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import Nav from "../components/Nav.component";
import TrendingTags from "../components/TrendingTags.component";

function Hashtag() {
  const { tagName } = useParams();
  console.log(tagName);
  return (
    <TagPageContainer>
      <Nav />
      <TimelineContainer>
        <h1>#{tagName}</h1>
        <HashtagPosts tagName={tagName} />
      </TimelineContainer>

      <SideBarContainer>
        <TrendingTags />
      </SideBarContainer>
    </TagPageContainer>
  );
}

const TagPageContainer = styled.div`
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
    width: 98.5vw;
  }

  @media screen and (min-width: 650px) {
    width: 45vw;
  }
`;

export default Hashtag;
