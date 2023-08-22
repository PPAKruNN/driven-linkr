import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function TrendingTags() {
  const navigate = useNavigate();

  
  const API_URL = process.env.REACT_APP_API_URL;
  const { auth, token } = useAuth();
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const [trendingTags, setTrendingTags] = useState([]);



  useEffect(() => {
    axios
      .get(`${API_URL}/trending`, config)
      .then((res) => {
        setTrendingTags(res.data);
        // console.error(res.data);
      })
      .catch((err) => {
        // console.error(err);
        alert(
          "An error occurred while trying to fetch the trending tags, please refresh the page"
        );
      });
  }, []);

  const handleTagClick = (tagName) => {
    navigate(`/hashtag/${tagName.replace(/^#/, '')}`);
  };

  return (
    <TrendingTagsContainer data-test="trending">
      <h2>trending</h2>
      <HorizontalLine />
      <TrendingTagsContainer>
        {trendingTags.map((tag, index) => (
          <Tag data-test="hashtag" key={index} onClick={() => handleTagClick(tag)}>
            #{tag}
          </Tag>
        ))}
      </TrendingTagsContainer>
    </TrendingTagsContainer>
  );
}

const TrendingTagsContainer = styled.div`
  color: white;
  line-height: 1.2rem;
  position: sticky;
  z-index: 5;
  top: 180px;
  width: 100%;
  min-width: 200px;
  background-color: #171717;
  border-radius: 16px;
  background-color: #171717;
  box-sizing: border-box;
  left: 0;

  h2 {
    font-weight: 700;
    font-size: 27px;
    margin-left: 8px;
    font-family: "Oswald";
  }

  p {
    font-family: "Lato";
    font-weight: 700;
    font-size: 19px;
    margin-bottom: 8px;
    margin-top: 15px;
  }
`;

const HorizontalLine = styled.div`
  margin-top: 10px;
  background-color: #333333;
  width: 120%;
  margin-left: -10px;
  box-sizing: border-box;
  height: 2px;
`;

const Tag = styled.p`
  font-family: "Lato";
  font-weight: 700;
  font-size: 19px;
  cursor: pointer;
  margin-bottom: 8px;
  margin-left: 8px;
`;

export default TrendingTags;
