import { styled } from "styled-components";
import userIcon from "../assets/images/icons/userIcon.jpeg";
import { IoIosSend } from "react-icons/io";
import { useRef } from "react";

export function CommentInput({profileUrl, submitCallback }) {

    const inputRef = useRef(); 
  
    async function submit(event) {
      event.preventDefault();

      if(inputRef.current.value.trim() === "") return;
      inputRef.current.disabled = true;
      submitCallback(inputRef.current.value);
      inputRef.current.disabled = false;

      inputRef.current.value = "";
    }

    return (
        <CommentInputSC onSubmit={submit}>
          <img alt="User profile"  src={!profileUrl ? userIcon : profileUrl} />
          <form>
            <input ref={inputRef} placeholder="Insira seu comentário aqui" type="text"></input>
            <IoIosSend onClick={submit}/>   
          </form>
        </CommentInputSC>
    )
}

const CommentInputSC = styled.span`

    padding: 0px 6px;
    display: flex;
    align-items: center;
    gap: 12px;

    form {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      width: 100%;
      height: 100%;
      
      background-color: #333333;
      border-radius: 6px;
      color: #ACACAC;
      
      input {
        background-color: transparent;
        color: #ACACAC;
        font-size: 16px;
        
        padding: 16px 6px 16px 16px;
      }
      
      input::placeholder{
        color: #575757;
      }

      svg {
        width: 24px;
        height: 24px;
        margin-right: 8px;

        cursor: pointer; 
      }
      
      svg:hover {
        transition: 100ms;
        color: #FFF;
      }

    }


    img {
      width: 48px;
      height: 48px;
      object-fit: cover;
      border-radius: 100%;
    }

`