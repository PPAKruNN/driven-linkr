import React, { useRef, useState, useCallback } from "react";
import { styled } from "styled-components";
import LinkPost from "./LinkPost.component";
import { LikeComponent } from "./Post.Components/Like.component";
import RepostModal from "../components/Post.Components/ModalRepost";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import DeletePost from "./Delete-Edit-Post.component";

import userIcon from "../assets/images/icons/userIcon.jpeg";
import { Link } from "react-router-dom";
import reactStringReplace from "react-string-replace";


export default function TimelinePostItem({ post }) {

  const {description, userName, profileUrl, id} = post;
  const API_URL = process.env.REACT_APP_API_URL;
  const { token } = useAuth();
  const textRef = useRef(null);
  const config = { headers: { Authorization: `Bearer ${token}` } };

  const [editingDescription, setEditingDescription] = useState(null);
  const [isLiked, setIsLiked] = useState(post.liked);
  const [toggle, setToggle] = useState(false);
  const [editing, setEditing] = useState(false);
  const [textValue, setTextValue] = useState(description);
  const [showRepostModal, setShowRepostModal] = useState(false);
  const [showRepost, setShowRepost] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [repostCount, setRepostCount] = useState({});


  const handleEditClick = () => {
      setEditing(!editing);
  };
  const navigate = useNavigate();

  const handleKey = (e) => {
    if (e.keyCode === 27) return setEditing(!editing);
    if (e.keyCode !== 13) return;

    setTextValue(textRef.current.value);
    setEditing(false);
  };

  function handleClick() {
    navigate(`/user/${post.userId}`);
  }

  const convertHashtagsToLinks = (text) => {
    const regex = /#(\w+)/g;
    return reactStringReplace(text, regex, (match, i) => (
      <span key={i}>
        <StyledLink to={`/hashtag/${match}`}>
          #{match}
        </StyledLink>
      </span>
    ));
  };

  const descriptionConvertedHashtags = convertHashtagsToLinks(textValue);

  
    //REPOSTAR POSTS
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
              `${API_URL}/posts/${id}/repost`,
              {},
              config
            );
      
            setRepostCount((prevRepostCount) => ({
              ...prevRepostCount,
              [id]: (prevRepostCount[id] || 0) + 1,
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
      // eslint-disable-next-line
        }, [config, id]);


  return (
    <TimelinePost>
      <TimeLinePostLeft>
        <AuthorImage src={!profileUrl ? userIcon : profileUrl} />

        < LikeComponent
            idPost={id}
            isLiked={isLiked}
            setIsLiked={setIsLiked}
            likeCount={post.LikeCount}
        />

        <RepostModal
          show={showRepostModal}
          onClose={() => setShowRepostModal(false)}
          onConfirm={postRepost}
          sharing={sharing}
        />
      </TimeLinePostLeft>

      <TimeLinePostRight>

      <DeletePost post={post} />

        <h2 onClick={handleClick} data-test="username">
          {userName}
        </h2>

        <LinkPost metadata={post.metadata} link={post.link}/>
      </TimeLinePostRight>
    </TimelinePost>
  );
}

const TimelinePost = styled.div`
  font-family: "Lato";
  color: white;
  line-height: 1.6em;
  width: 100%;
  height: fit-content;
  min-height: 210px;
  display: flex;
  flex-direction: row;
  border-radius: 16px;
  background-color: #171717;
  padding: 10px;
  margin-bottom: 20px;

  @media screen and (min-width: 480px) {
    flex-direction: row;
  }
  @media screen and (max-width: 480px) {
    width: 375px;
  }
`;

const TimeLinePostLeft = styled.div`
  width: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
`;

const TimeLinePostRight = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  padding: 10px;
  position: relative;
  h2 {
    color: #FFFFFF;
    line-height: 23px;
    font-size: 19px;
    font-weight: 700;
    margin-bottom: 12px;
    &:hover {
      cursor: pointer;
    }
  }
  p {
    font-size: 17px;
    margin-bottom: 12px;
    color: #B7B7B7;
    font-weight: 700;
    word-wrap: break-word;
  }
  .description {
    background-color: white;
    border-radius: 12px;
    height: 10%;
    width: 96.6%;
    margin: 6% 0;
  }
`;

const AuthorImage = styled.img`
  width: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;
  border-radius: 100%;
`;

const StyledLink = styled(Link)`
  font-weight: 700;
  cursor: pointer;
`;
