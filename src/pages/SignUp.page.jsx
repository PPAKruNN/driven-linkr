import React, { useRef } from "react"
import LinkrTitle from "../components/LinkrTitle.component"
import { styled } from "styled-components"
import api from "../services/api";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

function SignUp() {

  const navigate = useNavigate();

  const username = useRef();
  const profileUrl = useRef();
  const email = useRef();
  const password = useRef();
  const button = useRef();
  
  async function submit (e) {
    e.preventDefault();

    const data = {
      email: email.current.value,
      password: password.current.value,
      username: username.current.value,
      profileUrl: profileUrl.current.value
    };

    if(!data.email || !data.password || !data.username || !data.profileUrl) return alert("Os campos precisam estar TODOS preenchidos!");

    try {
    
      button.current.disabled = true;
      await api.signUp(data);    
      navigate("/");      

    } catch (error) {
      if(error.response.status === 409) alert("Email inserido já está cadastrado!");
      else console.log(error);
    }
    button.current.disabled = false;
  }

  return (
    <SignUpContainer>
      <LinkrTitle />
      <FormContainer>
            <form onSubmit={submit}>
              <input data-test="email" name="email" type="email" placeholder="e-mail" ref={email} />
              <input data-test="password" name="password" type="password" placeholder="password" ref={password} />
              <input data-test="username" name="username" type="text" placeholder="username" ref={username} /> 
              <input name="profileUrl" type="text" placeholder="picture url" ref={profileUrl} />
    
              <button data-test="sign-up-btn" ref={button} type="submit">Cadastro</button>
              <Link data-test="login-link" to={"/"}>Switch back to login</Link>
            </form>
      </FormContainer>
    </SignUpContainer>
  )
}

const FormContainer = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  height: 100vh;
  min-width: 400px;
  width: 40%;
  max-width: 500px;
  background-color: #333333;

  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 768px) {
    width: 100%;
    max-width: 100%;
    /* position: inherit; */
    bottom: 0;
    top: auto;
    right: auto;
    height: 80vh;
  }

  form {
    width: 80%;
    
    input {
      color: #9F9F9F;
      font-size: 27px;
      font-weight: 700;
      
    }
    
    button {
      background-color: #1877F2;
      font-size: 27px;
      font-weight: 700;
    }
    
    a {
      text-decoration: underline;
      font-weight: 400;      
      font-size: 20px;
    }
  }
`

const SignUpContainer = styled.div`
  background-color: #151515;
  width: 100%;
  display: flex;
  flex-direction: row;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    justify-content: start;
    margin-bottom: 200px;
  }

`

export default SignUp
