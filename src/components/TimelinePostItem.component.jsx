import React, { useRef, useState } from "react";
import { styled } from "styled-components";
import LinkPost from "./LinkPost.component";
import { LikeComponent } from "./Post.Components/Like.component";
import { EditOrDelete } from "./Post.Components/EditOrDelete";
import { useNavigate } from "react-router-dom";

import userIcon from "../assets/images/icons/userIcon.jpeg";
import { IoChatbubblesOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import reactStringReplace from "react-string-replace";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import { Comment } from "./Comment.component";
import { CommentInput } from "./CommentInput.component";
import api from "../services/api";

  

export default function TimelinePostItem({ post }) {
  const {description, userName, profileUrl, id, author} = post;

  const textRef = useRef(null);
  const [isLiked, setIsLiked] = useState(post.liked);
  const [toggle, setToggle] = useState(false);
  const [editing, setEditing] = useState(false);
  const [textValue, setTextValue] = useState(description);
  const { token, auth } = useAuth();
  const [comments, setComments] = useState([]);
  const config = { headers: { Authorization: `Bearer ${token}` } };

  const handleEditClick = () => {
  };
  const navigate = useNavigate();

  const handleKey = (e) => {
    if (e.keyCode === 27) return setEditing(!editing);
    if (e.keyCode !== 13) return;

    setTextValue(textRef.current.value);
    setEditing(false);
  };

  function handleClick() {
    navigate(`/user/${author}`);
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

  function loadComments() {
    const promise = api.getComments(auth.token, id);

    promise.then((response) => {
      const rawData = response.data; 

      const comments = rawData.map(
        (data) => <Comment commentary={data.message} profileUrl={data.profileUrl} userName={data.userName} isAuthor={false} isFollowing={false}/>
      )

      setComments(comments);
    })
    
    promise.catch((error) => {
      console.log(error);
    })
  }

  async function submitComment(message) {
    
    await api.submitComment(auth.token, id, message);
    loadComments();

  } 

  const descriptionConvertedHashtags = convertHashtagsToLinks(textValue);

  return (
    <Post>
      <TimelinePost>
        <TimeLinePostLeft>
          <AuthorImage src={!profileUrl ? userIcon : profileUrl} />

          <LikeComponent
              idPost={id}
              isLiked={isLiked}
              setIsLiked={setIsLiked}
              likeCount={post.LikeCount}
          />

          <div onClick={loadComments}>
            <IoChatbubblesOutline/>          
            <p>100 comments</p>
          </div> 

        </TimeLinePostLeft>

        <TimeLinePostRight>
          <EditOrDelete
              id={id}
              textRef={textRef}
              toggle={toggle}
              setToggle={setToggle}
              handleEditClick={handleEditClick}
          />

          <h2 onClick={handleClick} data-test="username">
            {userName}
          </h2>

          {editing ? (
                <>
                  <textarea
                      ref={textRef} 
                      defaultValue={textValue}
                      className="description" 
                      onKeyDown={(e) => handleKey(e)}            
                      style={{
                            fontFamily: "Arial, sans-serif",
                            fontSize: "14px",
                            padding: "10px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            width: "100%",
                            height: "100%"
                      }}
                    />
                  </>
              ) : (<>
                <p data-test="description">{convertHashtagsToLinks(textValue)}</p></>
              )}

          <LinkPost metadata={post.metadata} link={post.link}/>
        </TimeLinePostRight>
      </TimelinePost>
      <CommentSection>
        {comments}
        <CommentInput profileUrl={""} submitCallback={submitComment}/>
      </CommentSection>
    </Post>
  );
}

const Post = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  background-color: #1e1e1e;

  border-radius: 16px;
`

const CommentSection = styled.section`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 12px;

  width: 100%;
  background-color: #1e1e1e;

  padding: 24px 12px;
  border-radius: 16px;

  hr {
    width: 100%;
    background-color: #353535;
    border: 1px solid #353535;
  }


`;


const TimelinePost = styled.div`
  box-sizing: border-box;
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

  padding: 12px;

`;

const TimeLinePostLeft = styled.div`
  width: 13%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px;
 
  div {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 15px;
    
      cursor: pointer;

      svg {
        width: 32px;
        height: 32px;
      }

      p {
        max-width: max-content;
        text-align: center;
        font-size: 14px;
        margin: 0;
        padding: 0;
      }

  }
`;

const TimeLinePostRight = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px;
  position: relative;
  h2 {
    line-height: 1.1em;
    font-size: 26px;
    font-weight: 500;
    &:hover {
      cursor: pointer;
    }
  }
  p {
    font-size: 12px;
    margin-top: 12px;
    margin-bottom: 12px;
    font-size: 20px;
    color: #b7b7b7;
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
