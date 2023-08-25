import styled from 'styled-components';
import loadingImage from "../../assets/images/icons/loadingImage.gif";

const ModalRepost = ({ show, onClose, onConfirm, sharing}) => {

  return (
    <>
      {show && (
        <RepostContainer>
          {sharing ? (
            <img src={loadingImage} alt="Loading..." />
          ) : (
            <Content>

              <Title>Do you want to re-post this link?</Title>

              <Buttons>
                <button data-test="cancel" onClick={onClose}>
                  "No, cancel!"
                </button>
                <button
                  data-test="confirm"
                  onClick={onConfirm}
                  disabled={sharing}
                >
                  "Yes, share!"
                </button>
              </Buttons>

            </Content>
          )}
        </RepostContainer>
      )}
    </>
  );
};

export default ModalRepost;


const RepostContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 2;
`

const Content = styled.div`
  background-color: #333333;
  padding: 50px;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Title = styled.h3`
  text-align: center;
  width: 18vw;
  color: white;
  font-size: 25px;
  margin-bottom: 10px;
`

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;

  button {
    margin-left: 10px;
    padding: 10px 15px;
    border-radius: 5px;
    border: none;
    background-color: #1676f2;
    color: white;
    font-size: 14px;
    cursor: pointer;
  }
`