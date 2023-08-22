import axios from "axios";
import { useState } from "react";
import { Tooltip } from "react-tooltip";
import { styled } from "styled-components";
import useAuth from "../../hooks/useAuth";


export function LikeComponent(props){
    const API_URL = process.env.REACT_APP_API_URL;

    const { token, auth } = useAuth();
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const{isLiked, setIsLiked, idPost} = props;
    const detail = `Maria João e outras 12 pessoas`;
    const handleLike = ()=>{
        axios.post(`${API_URL}/handleLIke`,{id:idPost, author: auth.userId}, config)
        .then(res=>{
          console.log(res);
          setIsLiked(!isLiked);
         
        }).catch(err=>{
          console.log(err)
        })
        
    }

    return(
        <CsLikeComponent>

            {!isLiked ? (
                <div className="heartNoLiked" onClick={handleLike}>
                    <ion-icon name="heart-outline"></ion-icon>
                </div>
            ) : (
                <div className="heartLiked" onClick={handleLike}>
                    <ion-icon name="heart"></ion-icon>
                </div>
            )}
            
            
            <div 
                data-test="counter" 
                className="text"
                data-tooltip-id="details"
                data-tooltip-content={detail}
            >
                14 likes
            </div>
            <Tooltip 
                data-test="tooltip"
                id="details" 
                variant="light"
                place="bottom"
            />
        </CsLikeComponent>
    );
}

 const CsLikeComponent= styled.div`
 
    width: 90%;
    max-width: 80px;
    min-width: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    //border: 1px solid white;
    //*{border: 1px solid white}
    padding-top: 15px;
    .text{
        font-size: 14px;
    }

    ion-icon{
        cursor: pointer;
        height: 100%;
        width: 100%;   
    }

    .heartLiked{
        width: 35px;
        height: 35px;
        color: red;
    }
    .heartNoLiked{
        width: 35px;
        height: 35px;
        color: white;
    }

 `;