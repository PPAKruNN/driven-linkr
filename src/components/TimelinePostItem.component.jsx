import React, { useRef, useState } from "react";
import { styled } from "styled-components";
import LinkPost from "./LinkPost.component";
import { LikeComponent } from "./Post.Components/Like.component";
import { EditOrDelete } from "./Post.Components/EditOrDelete";
import { useLocation, useNavigate } from "react-router-dom";

import userIcon from "../assets/images/icons/userIcon.jpeg";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import reactStringReplace from "react-string-replace";

  

export default function TimelinePostItem({ post }) {
  const {description, link, userName, profileUrl, id} = post;
  const { auth } = useAuth();
  const textRef = useRef(null);
  const [isLiked, setIsLiked] = useState(false);
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

  const descriptionConvertedHashtags = convertHashtagsToLinks(description);

  return (
    <TimelinePost>
      <TimeLinePostLeft>
        <AuthorImage src={!profileUrl ? userIcon : profileUrl} />

        < LikeComponent
            idPost={id}
            isLiked={isLiked}
            setIsLiked={setIsLiked}
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
              <p>{textValue}</p></>
            )}

        <p data-test="description">{convertHashtagsToLinks(description)}</p>
        <LinkPost post={post} />
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
  //border: 1px solid red;
`;

const TimeLinePostLeft = styled.div`
  width: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
`;
const TimeLinePostRight = styled.div`
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
