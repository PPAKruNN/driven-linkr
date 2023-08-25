import { styled } from "styled-components";
import {TbTrashFilled} from 'react-icons/tb';
import {PiPencilBold} from 'react-icons/pi';
import { useState, useCallback, useEffect, useRef} from "react";
import useAuth from "../hooks/useAuth";
import axios from "axios";


export default function DeletePost({ post }){

  const { id, description } = post;
  const API_URL = process.env.REACT_APP_API_URL;
  const { token } = useAuth();
  const config = { headers: { Authorization: `Bearer ${token}` } };

  const [deleting, setDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingDescription, setEditingDescription] = useState(null);
  const descriptionRefs = useRef({});

<<<<<<< HEAD
  
=======

>>>>>>> main
      //EDITAR POSTS
          // Lidar com o clique no botão de editar
          const handleEditClick = useCallback(
            (id) => {
              if (editingDescription === id) {
                setEditingDescription(null);
              } else {
                setEditingDescription(id);
              }
            },
            [editingDescription]
          );

        // Focar na caixa de edição ao iniciar a edição
        useEffect(() => {
          if (editingDescription && descriptionRefs.current[editingDescription]) {
             descriptionRefs.current[editingDescription].focus();
            }
          }, [editingDescription, descriptionRefs]);


        // Salvar a edição de um post
          const saveEdit = useCallback(
            async (id) => {
            const updatedDescription = descriptionRefs.current[id].value;

            descriptionRefs.current[id].disabled = true;

            try {
              await axios.put(
                `${API_URL}/posts/${id}`,
                {
                  description: updatedDescription,
                },
                config
              );
              post((prevPosts) =>
                prevPosts.map((prevPost) => {
                  if (prevPost.id === id) {
                    return {
                      ...prevPost,
                      description: updatedDescription,
                    };
                  }
                  return prevPost;
                })
              );
              setEditingDescription(null);
            } catch (error) {
              console.error(error);
              alert("An error occurred while saving the edit");
              descriptionRefs.current[id].disabled = false;
            }
          },
          // eslint-disable-next-line
          []
        );


      // DELETAR POSTS
      const deletePostPage = useCallback(async () => {
        setDeleting(true);

        try {
          await axios.delete(
            `${API_URL}/posts/${id}`,
            config
          );
          setShowDeleteModal(false);
          window.location.reload();
        } catch (error) {
          console.error(error);
          alert("An error occurred while deleting the post");
        } finally {
          setDeleting(false);
        }
        // eslint-disable-next-line
      }, []);


    return(
        <CsEditOrDelete>
             <div className="edit option">
                 <PiPencilBold 
                 data-test="edit-btn"
                 />
            </div>

            <div className="delete option">
                 <TbTrashFilled 
                 data-test="delete-btn" 
                 show={showDeleteModal}
                 onClick={deletePostPage}
                 onConfirm={deletePostPage}
                 onClose={() => setShowDeleteModal(false)}
                 deleting={deleting}/>
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
<<<<<<< HEAD

=======
>>>>>>> main
`;