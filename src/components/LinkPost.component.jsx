import React from "react";
import { styled } from "styled-components";
import imageLink from "../assets/images/icons/react.png";

function LinkPost({ metadata, link }) {
  return (
    <LinkPostContainer
      href={link}
      data-test="link"
      target="_blank"
      rel="noopener noreferrer"
    >
      <LinkPostContainerLeft>
        <h2>{metadata.title}</h2>
        <p>{metadata.description}</p>
        <a href={link}>
          <p>{link}</p>
        </a>
      </LinkPostContainerLeft>
      <LinkPostContainerRight>
        <a href={link}>
          <LinkPostImage
            src={!metadata.images ? imageLink : metadata.images[0]}
          />
        </a>
      </LinkPostContainerRight>
    </LinkPostContainer>
  );
}

const LinkPostContainer = styled.div`
  font-family: "Lato";
  font-weight: 400;
  width: 100%;
  height: fit-content;
  max-height: 70%;
  border-radius: 11px;
  border: 1.5px solid #4d4d4d;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media screen and (max-width: 480px) {
    width: 60vw;
    height: auto;
  }
`;

const LinkPostContainerRight = styled.div`
  width: 30%;
`;

const LinkPostContainerLeft = styled.div`
  width: 70%;
  box-sizing: border-box;
  padding: 10px;

  h2 {
    font-size: 16px;
    line-height: 19px;
    word-wrap: break-word;
  }

  p {
    font-size: 11px;
    line-height: 13px;
    word-wrap: break-word;
    margin-bottom: 12px;
  }

  a {
    font-size: 11px;
    line-height: 13px;
    word-wrap: break-word;
  }

  @media screen and (max-width: 480px) {
    height: auto;
  }
`;

const LinkPostImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 11px;
  border: none;


  @media screen and (max-width: 480px) {
    width: 15vw;
    height: 15vh;
  }
`;


export default LinkPost;
