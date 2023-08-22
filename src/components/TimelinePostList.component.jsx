import React, { useEffect, useState } from "react";
import TimelinePostItem from "./TimelinePostItem.component";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import loadingImage from "../assets/images/icons/loadingImage.gif";
import { styled } from "styled-components";

export default function TimelinePosts() {
  const API_URL = process.env.REACT_APP_API_URL;

  const { token } = useAuth();
  const config = { headers: { Authorization: `Bearer ${token}` } };

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [emptyPage, setEmptyPage] = useState(false);

  useEffect(() => {
    axios
      .get(`${API_URL}/posts`, config)
      .then((res) => {
        console.log(res.data.results)
        if (Array.isArray(res.data.results)) {
          setPosts(res.data.results);
          setLoading(false);
        } else {
          console.error(res.data);
          setError(true);
          setLoading(false);
          alert(
            "An error occurred while trying to fetch the posts, please refresh the page"
          );
        }
      })
      .catch((err) => {
        console.error(err);
        setError(true);
        setLoading(false);
        alert(
          "An error occurred while trying to fetch the posts, please refresh the page"
        );
      });
  }, []);

  return (
    <Container>
      {loading ? (
         <Image src={loadingImage} alt="Loading..." />
      ) : error ? (
        <p> An error occurred while trying to fetch the posts, please refresh
        the page </p>
      ) : emptyPage ? (
        <p data-test="message">There are no posts yet</p>
      ) :  (
        posts.map((post) => <TimelinePostItem data-test="post" key={post.id} post={post} />)
      )}
    </Container>
  );
}

const Container = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;


  p {
    font-size: 25px;
  }
`

const Image = styled.img`
  margin-top: 50px;
  width: 10vw;
  height: 10vh;
`


