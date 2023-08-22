import React from "react";
import { styled } from "styled-components";
import imageLink from "../assets/images/icons/react.png";

function LinkPost({metadata, link}) {

  return (
    <LinkPostContainer 
    href={link} 
    data-test="link"
    target="_blank"
    rel="noopener noreferrer">

      <LinkPostContainerLeft>
        <h2>{metadata.title}</h2>
        <p>
          {metadata.description}
        </p>
        <a href={link}>
          <p>{link}</p>
        </a>
      </LinkPostContainerLeft>
      <LinkPostContainerRight>
        <a href={link}>
          <LinkPostImage src={!metadata.images ? imageLink : metadata.images[0]} />
        </a>
      </LinkPostContainerRight>

    </LinkPostContainer>
  )
}


const LinkPostContainer = styled.div`
  width: 100%;
  height: fit-content;
  max-height: 70%;
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
  width: 70%;
  box-sizing: border-box;
  margin: 10px 0 10px 0;
  padding: 16px;

  p {
    font-size: 16px;
    line-height: 20px;
  }


  h2 {
    font-size: 16px;
    line-height: 16px;
  }
`

const LinkPostImage = styled.img`
  width: 90%;
  height: 90%;
  object-fit: cover;
  border-top-right-radius: 11px;
  border-bottom-right-radius: 11px;
`

export default LinkPost
