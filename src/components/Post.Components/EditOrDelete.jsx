import { styled } from "styled-components";
import { ConfirmDelete } from "./ConfirmDelete";
import {TbTrashFilled} from 'react-icons/tb';
import {PiPencilBold} from 'react-icons/pi';

export function EditOrDelete(props){
    const{toggle, setToggle, handleEditClick, id} = props;


    return(
        <CsEditOrDelete>
            <ConfirmDelete
                id={id}
                toggle={toggle}
                setToggle={setToggle}
            />
            <div className="edit option">
                 <PiPencilBold data-test="like-btn" onClick={handleEditClick}/>
            </div>
            <div className="delete option">
                 <TbTrashFilled data-test="delete-btn" onClick={()=>setToggle(!toggle)}/>
            </div>
        </CsEditOrDelete>
    );
}


const CsEditOrDelete = styled.div`
    //border: 1px solid white;
    //*{ border: 1px solid white;}
    //width: 30px;
    //height: 30px;
    position: absolute;
    top: 0;
    right: 0;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;

    .option{
        width: 23px;
        height: 23px; 
        cursor: pointer; 
    }

`;