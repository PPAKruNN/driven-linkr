import React from "react";
import { styled } from "styled-components";
import imageLink from "../assets/images/icons/react.png";

function LinkPost({post}) {

  const {urlTitle, link, urlDescr, urlImg} = post;

  return (
    <LinkPostContainer 
    href={link} 
    data-test="link"
    target="_blank"
    rel="noopener noreferrer">

      <LinkPostContainerLeft>
        <h2>{urlTitle}</h2>
        <p>
          {urlDescr}
        </p>
        <a href={link}>
          <p>{link}</p>
        </a>
      </LinkPostContainerLeft>
      <LinkPostContainerRight>
        <a href={link}>
          <LinkPostImage src={!urlImg ?imageLink :urlImg} />
        </a>
      </LinkPostContainerRight>

    </LinkPostContainer>
  )
}


const LinkPostContainer = styled.div`
  width: 100%;
  height: fit-content;
  max-height: 80%;
  border-radius: 11px;
  border: 1.5px solid #4d4d4d;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
const LinkPostContainerRight = styled.div`
  width: 30%;
`

const LinkPostContainerLeft = styled.div`
  width: 80%;

  box-sizing: border-box;
  margin: 10px 0 10px 0;
  padding: 16px;
  h2 {
    font-size: 16px;
  }
`

const LinkPostImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-top-right-radius: 11px;
  border-bottom-right-radius: 11px;
`

export default LinkPost
