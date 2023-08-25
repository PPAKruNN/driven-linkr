import React, { useRef, useState } from "react";
import { styled } from "styled-components";
import LinkPost from "./LinkPost.component";
import { LikeComponent } from "./Post.Components/Like.component";
import { EditOrDelete } from "./Post.Components/EditOrDelete";
import { useNavigate } from "react-router-dom";

import userIcon from "../assets/images/icons/userIcon.jpeg";
import { Link } from "react-router-dom";
import reactStringReplace from "react-string-replace";

  

export default function TimelinePostItem({ post }) {
  const {description, userName, profileUrl, id} = post;

  const textRef = useRef(null);
  const [isLiked, setIsLiked] = useState(post.liked);
  const [toggle, setToggle] = useState(false);
  const [editing, setEditing] = useState(false);
  const [textValue, setTextValue] = useState(description);
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
  width: 80%;
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
