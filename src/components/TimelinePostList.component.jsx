import React, { useEffect, useState, useCallback } from "react";
import TimelinePostItem from "./TimelinePostItem.component";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import loadingImage from "../assets/images/icons/loadingImage.gif";
import { styled } from "styled-components";
import dayjs from 'dayjs';
import useInterval from 'use-interval'
import { LoadMore } from "./Post.Components/LoadMore";

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
  const [displayLoadMore, setDisplayLoadMore] = useState('none');
  const [amountNewPosts, setAmountNewPosts] = useState(0);


  //CARREGAR POSTS
  useEffect(() => {
    console.log(token);
    axios
      .get(`${API_URL}/posts`, config)
      .then((res) => {
        console.log(res.data)
        if (Array.isArray(res.data.posts)) {
          setPosts(res.data.posts);
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


  // BUSCAR REPOSTS
  const getRepost = useCallback(async () => {
    try {
      const result = await axios.get(`${API_URL}/posts/repost`, config);
      const reposts = result.data;

      const countRepost = {};
      reposts.forEach((repost) => {
        const { postId, reposts } = repost;
        countRepost[postId] = reposts;
      });

      setRepostCount(countRepost);
    } catch (error) {
      console.error(error);
      alert("An error occurred while fetching repost counts");
    }
  }, [config]);


  //REPOSTAR
    const postRepost = useCallback(async () => {
      setSharing(true);
  
      try {
        await axios.post(
          `${API_URL}/posts/${selectedPostId}/repost`,
          {},
          config
        );
  
        setRepostCount((prevRepostCount) => ({
          ...prevRepostCount,
          [selectedPostId]: (prevRepostCount[selectedPostId] || 0) + 1,
        }));
  
        setShowRepost(false);
      } 
      catch (error) {
        console.error(error);
        alert("An error occurred while reposting the post");
      } 
      finally {
        setSharing(false);
      }
    }, [config, selectedPostId]);

  //VERIFICAR NOVOS POSTS

    const vefifyNewPosts = ()=>{
      alert('oi')
      axios.get(`${API_URL}/posts/new-posts?recentUpdate=${lastTime}`)
        .then(res=>{
          console.log('aqui é a quantidade de novos posts')
          console.log(res.data)
          if(res.data>0){
            setAmountNewPosts(res.data);
            setDisplayLoadMore('flex')
          }else{
            setDisplayLoadMore('none')
          }

        }).catch(err=>console.log(err));
    }
    useInterval(()=>vefifyNewPosts, 15000);

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
        <>
          <LoadMore 
                displayLoadMore={displayLoadMore}
                amountNewPosts={amountNewPosts}
          />
          {posts.map((post) => <TimelinePostItem data-test="post" key={post.id} post={post} />)}        
        </>
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


