import React, { useRef, useState, useCallback } from "react";
import { styled } from "styled-components";
import LinkPost from "./LinkPost.component";
import { LikeComponent } from "./Post.Components/Like.component";
import { EditOrDelete } from "./Post.Components/EditOrDelete";
import { useNavigate } from "react-router-dom";
import DeletePost from "./Delete-Edit-Post.component";
import RepostModal from "../components/Post.Components/ModalRepost";
import { BiRepost } from "react-icons/bi";

import userIcon from "../assets/images/icons/userIcon.jpeg";
import { IoChatbubblesOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import reactStringReplace from "react-string-replace";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import { Comment } from "./Comment.component";
import { CommentInput } from "./CommentInput.component";
import api from "../services/api";
import useUserContext from "../hooks/useUserContext";

  

export default function TimelinePostItem({ post }) {
  const {description, userName, profileUrl, id, author, CommentCount} = post;
  const API_URL = process.env.REACT_APP_API_URL;

  const textRef = useRef(null);
  const [isLiked, setIsLiked] = useState(post.liked);
  const [editing, setEditing] = useState(false);
  const [textValue, setTextValue] = useState(description);
  const [showRepost, setShowRepost] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [repostCount, setRepostCount] = useState({});
  const descriptionConvertedHashtags = convertHashtagsToLinks(textValue);
  const { token, auth } = useAuth();
  const [comments, setComments] = useState([]);
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const user = useUserContext();

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
        (data) => <Comment author={author} commentary={data.message} profileUrl={data.profileUrl} userName={data.userName} isAuthor={author === data.author} isFollowing={user.following.includes(data.author)}/>
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

    // BUSCAR REPOSTS
    const getRepost = useCallback(async () => {
      try {
        const result = await axios.get(`${API_URL}/posts/repost`, config);
        const reposts = result.data;
  
        const countRepost = {};
        reposts.forEach((repost) => {
          const { id, reposts } = repost;
          countRepost[id] = reposts;
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
      }, [config, id]);


  return (
    <Post>
        <TimelinePost>
          <TimeLinePostLeft>
            <AuthorImage src={!profileUrl ? userIcon : profileUrl} />

            < LikeComponent
                idPost={id}
                isLiked={isLiked}
                setIsLiked={setIsLiked}
                likeCount={post.LikeCount}
            />

            {repostCount[id] > 0 && (
              <>
                   <ContainerRepostBy>
                      <p>
                        <BiRepost className="repost-icon"/>Re-post by&nbsp;
                        <span className="username">{userName}</span>
                      </p>
                    </ContainerRepostBy>

                    <RepostModal
                      show={showRepost}
                      onClose={() => setShowRepost(false)}
                      onConfirm={postRepost}
                      sharing={sharing}
                    />
              </>
            )} 

          </TimeLinePostLeft>

          <TimeLinePostRight>
            <DeletePost post={post}
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
        {comments.length !== 0 ? 
        (<CommentSection>
          {comments}
          <CommentInput profileUrl={""} submitCallback={submitComment}/>
        </CommentSection>)
        :
        <></>
        }
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
  padding: 10px;
  margin-bottom: 20px;

  @media screen and (min-width: 480px) {
    flex-direction: row;
  }
  @media screen and (max-width: 480px) {
    min-width: 375px;
    border-radius: 0;
    width: 100%;
    padding: 0;
  }
`;

const TimeLinePostLeft = styled.div`
  width: 13%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px;
 
  & > div {
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
  width: 80%;
  display: flex;
  flex-direction: column;
  padding: 10px;
  position: relative;
  @media screen and (max-width: 480px) {
    width: 100%;
  }
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

const ContainerRepostBy = styled.div`
  background-color: #1e1e1e;
  width: 100%;
  height: 20px;
  border-radius: 5px;
  margin-bottom: 10px;
  display: flex;
  justify-content: left;
  align-items: center;
  flex-shrink: 0;

  p {
    display: flex;
    align-items: center;
    font-size: 16px;
  }

  .repost-icon {
    margin-right: 5px;
    font-size: 20px;
    font-weight: bold;
  }

  .username {
    font-weight: bold; 
  }
`;
