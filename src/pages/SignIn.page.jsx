import React, { useRef } from "react"
import LinkrTitle from "../components/LinkrTitle.component"
import { styled } from "styled-components"
import api from "../services/api";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

function SignIn() {
  
  const navigate = useNavigate();
  const auth = useAuth();

  const email = useRef();
  const password = useRef();
  const button = useRef();
  
  async function submit (e) {
    
    e.preventDefault();

    const data = {
      email: email.current.value,
      password: password.current.value,
    };
    
    if(!data.email || !data.password) return alert("Os campos precisam estar TODOS preenchidos!");

    try {
    
      button.current.disabled = true;
      const response = await api.signIn(data);    
      // const userData = await api.getUserById(response.data.id); // Endpoint ainda nào existe.

      const userData = response.data

      auth.login(userData, response.data.token); 
      navigate("/home");      

    } catch (error) {
      if(error.response.status === 404) alert("Email não encontrado!");
      if(error.response.status === 401) alert("Senha incorreta!");
      else console.log(error);
    }
    button.current.disabled = false;
  }


  return (
    <SignInContainer>
      <LinkrTitle />
        <FormContainer>
            <form onSubmit={submit}>
              <input data-test="email" name="email" type="email" placeholder="e-mail" ref={email} />
              <input data-test="password" name="password" type="password" placeholder="password" ref={password} />
    
              <button data-test="login-btn" ref={button} type="submit">Login</button>
              <Link data-test="sign-up-link" to={"sign-up"}>First time? Create an account!</Link>
            </form>
        </FormContainer>
    </SignInContainer>
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
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 768px) {
    width: 100%;
    max-width: 100%;
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

const SignInContainer = styled.div`
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

export default SignIn
