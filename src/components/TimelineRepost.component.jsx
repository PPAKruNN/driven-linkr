import { useState, useCallback } from "react";
import useAuth from "../hooks/useAuth";
import styled from 'styled-components';
import axios from "axios";


export function RepostPost ({post}){

  const API_URL = process.env.REACT_APP_API_URL;
  const { token } = useAuth();
  const config = { headers: { Authorization: `Bearer ${token}` } };

  const [showRepost, setShowRepost] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [repostCount, setRepostCount] = useState({});
  const [selectedPostId, setSelectedPostId] = useState(null);


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


      return (
          <>
            {repostCount[post.id] > 0 && (
               <ContainerRepostBy>
                  <p>
                    <BiRepost className="repost-icon"/>Re-post by&nbsp;
                    <span className="username">{post.userName}</span>
                  </p>
                </ContainerRepostBy>
                )}
         </>
    );
}


export default RepostPost;

