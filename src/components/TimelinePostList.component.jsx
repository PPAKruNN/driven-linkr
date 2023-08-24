import React, { useEffect, useState } from "react";
import TimelinePostItem from "./TimelinePostItem.component";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import loadingImage from "../assets/images/icons/loadingImage.gif";
import { styled } from "styled-components";
import InfiniteScroll from 'react-infinite-scroller';


export default function TimelinePosts() {
  const API_URL = process.env.REACT_APP_API_URL;

  const { token } = useAuth();
  const config = { headers: { Authorization: `Bearer ${token}` } };

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [emptyPage, setEmptyPage] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    console.log(token);
    axios
      .get(`${API_URL}/posts`, config)
      .then((res) => {
        console.log(res.data)
        if (Array.isArray(res.data)) {
          setPosts(res.data);
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
  }, [currentPage]);
    const loadFunc = () => {
      axios
        .get(`${API_URL}/posts?offset=${currentPage + 10}`, config)
        .then((res) => {
          const newPosts = posts.concat(res.data);
          if (newPosts.length > 0) {
            setPosts(newPosts);
            setCurrentPage(currentPage + 10);
          } else {
            setHasMore(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

  return (
    <Container>
      {loading ? (
        <Image src={loadingImage} alt="Loading..." />
      ) : error ? (
        <p> An error occurred while trying to fetch the posts, please refresh
          the page </p>
      ) : emptyPage ? (
        <p data-test="message">There are no posts yet</p>
      ) : (
        <InfiniteScroll
          pageStart={0} valor default  de pagina inicial mas não ta sendo exibido pagina
          loadMore={loadFunc}//aquii é uma func que vai ser chamada sempre que o scroll chegar ao final
          hasMore={hasMore}//se isso for false ele não chama a func msm que o scroll chegue ao final
          loader={<div className="loader" key={0}>Loading ...</div>}//teta de load que vai ser ser exibida enquanto não renderiza os componentes
        >
          {posts.map((post) => <TimelinePostItem data-test="post" key={post.id} post={post} />)}
        </InfiniteScroll>

      )}
    </Container>
  );
}

const Container = styled.div`

  p {
    font-size: 25px;
  }
`

const Image = styled.img`
  width: 20vw;
  height: 20vh;
`


