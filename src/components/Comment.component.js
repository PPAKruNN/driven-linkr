import { styled } from "styled-components";
import userIcon from "../assets/images/icons/userIcon.jpeg";

export function Comment({profileUrl, userName, commentary, isAuthor, isFollowing}) {

    return (
        <CommentSC>
          <img alt="User profile" src={!profileUrl ? userIcon : profileUrl} />
          <div>
              <span>
                <h1>{userName}</h1>
                <h2>{isAuthor ? "• post's author" : isFollowing ? "• following" : ""} </h2>
              </span>
              <p>{commentary}</p>
          </div>
        </CommentSC>
    )
}



const CommentSC = styled.span`


    padding: 0px 6px;
    display: flex;
    align-items: center;
    gap: 12px;

    div {
      width: 75%;
      height: 100%;
      color: #ACACAC;
      
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      p {
        width: 100%;
        font-size: 18px;
        line-height: 24px;
        word-wrap: break-word;
      }

      span {
        width: 100%;
        font-size: 700;
        color: #F3F3F3;
        gap: 6px;
        display: flex;
        align-items: center;

        h1 {
          font-size: 18px;
          line-height: 24px;
          margin: 0;
        } 

        h2 {
          font-size: 18px;
          color: #565656;
          line-height: 24px;
        }
      }

    }

    img {
      width: 48px;
      height: 48px;
      object-fit: cover;
      border-radius: 100%;
    }

`