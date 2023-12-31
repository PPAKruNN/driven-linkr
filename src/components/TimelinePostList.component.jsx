import React, { useEffect, useState} from "react";
import TimelinePostItem from "./TimelinePostItem.component";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import loadingImage from "../assets/images/icons/loadingImage.gif";
import { styled } from "styled-components";
import dayjs from 'dayjs';
import useInterval from 'use-interval'
import { LoadMore } from "./Post.Components/LoadMore";
import useUserContext from "../hooks/useUserContext";
import InfiniteScroll from 'react-infinite-scroller';


export default function TimelinePosts() {
  const API_URL = process.env.REACT_APP_API_URL;
  const { token } = useAuth();
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [emptyPage, setEmptyPage] = useState(false);
  const [showRepost, setShowRepost] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [repostCount, setRepostCount] = useState({});
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [lastTime, setLastTime] = useState(dayjs().format('YYYY-MM-DD HH:mm:ss'));
  const [displayLoadMore, setDisplayLoadMore] = useState(false);
  const [amountNewPosts, setAmountNewPosts] = useState(0);
  const { following } = useUserContext();
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  //CARREGAR POSTS
  useEffect(() => {
    axios.get(`${API_URL}/posts`, config)
      .then((res) => {
        console.log(res.data.posts);
        if (Array.isArray(res.data.posts)) {
          setPosts(res.data.posts);
          setLoading(false);
        } else {
          setError(true);
          setLoading(false);
          alert(
            "An error occurred while trying to fetch the posts, please refresh the page"
          );
        }
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
        alert(
          "An error occurred while trying to fetch the posts, please refresh the page"
        );
      });
    
  }, [currentPage]);
 
  
const loadFunc = () => {
  axios.get(`${API_URL}/posts?offset=${currentPage + 10}`, config)
    .then((res) => {
      const newPosts = posts.concat(res.data.posts);
      if (newPosts.length > 0) {
        setPosts(newPosts);
        setCurrentPage(currentPage + 10);
      } else {
        setHasMore(false);
      }
    }, [config, selectedPostId]);
  }

  return (
    <Container>
      {loading ? (
        <Image src={loadingImage} alt="Loading..." />
      ) : error ? (
        <p> An error occurred while trying to fetch the posts, please refresh
          the page </p>
      ) : emptyPage ? (
        <></>
      ) : (
        <LoadMore 
              displayLoadMore={displayLoadMore}
              amountNewPosts={amountNewPosts}
        />
      )}
      
      {following.length === 0 ? (
        <p data-test="message">You don't follow anyone yet. Search for new friends!</p>
      ) : posts.length === 0 ? (
        <p data-test="message">No posts found from your friends</p>
    ) : (
        <InfiniteScroll
          pageStart={0} //valor default de pagina inicial mas não ta sendo exibido pagina
          loadMore={loadFunc} //aquii é uma func que vai ser chamada sempre que o scroll chegar ao final
          hasMore={hasMore} //se isso for false ele não chama a func msm que o scroll chegue ao final
          loader={<div className="loader" key={0}>Loading ...</div>} //teta de load que vai ser ser exibida enquanto não renderiza os componentes
        >
          {posts.map((post) => <TimelinePostItem data-test="post" key={post.id} post={post} />)}
        </InfiniteScroll>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  
  gap: 64px;
  align-items: center;
  
  p {
    font-size: 16px;
    color: white;
  }  
`

const Image = styled.img`
  margin-top: 100px;
  width: 10vw;
  height: 10vh;
`
