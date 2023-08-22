import React from "react"
import { styled } from "styled-components"

function LinkrTitle() {
  return (
    <CenteredContainer>
      <LinkrTitleContainer>
        <h2>linkr</h2>
        <span>
          save, share and discover
          <br />
          the best links on the web
        </span>
      </LinkrTitleContainer>
    </CenteredContainer>
  )
}

const LinkrTitleContainer = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  h2 {
      font-size: 3rem;
      font-weight: 700;
      text-align: start;
      margin-bottom: 12px;
    }
    @media screen and (min-width: 768px) {
    transform: translateY(50%);
  }
  `
const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 40%;
  @media screen and (max-width: 768px) {
    height: 20vh;
    width: 100vw;
  }
`

export default LinkrTitle
