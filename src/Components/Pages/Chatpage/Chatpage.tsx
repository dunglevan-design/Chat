import { useHistory, useParams } from "react-router-dom";
import Algolia from "../../Algolia/Algolia";
import ChatBox from "../../ChatBox/ChatBox";
import { useMediaQuery } from "../../CustomHooks/useMediaQuery";
import {collection, doc, addDoc} from "firebase/firestore";
import {
  Addsvg,
  ButtonDesc,
  Container,
  Content,
  Left,
  Modal,
  NewChatButton,
  Right,
  Title,
  Top,
} from "./ChatpageElements";
import styled from "styled-components";
import { db } from "../../../firebase";
import { useState } from "react";


const Back = styled.button`
  position: absolute;
  top: 0;
  left: 0;

`;
const Chatpage = () => {
  const history = useHistory();
  const { roomid }: { roomid: string } = useParams();
  const matches = useMediaQuery("(max-width: 600px)");

  const [modalOpen, setmodalOpen] = useState(false);

  const OpenModal = () => {
    setmodalOpen(true);
  }
  const CloseModal = () => {
    setmodalOpen(false);
  }
  const ChangeToRoomListView = () => {
    history.goBack();
    const slider = document.querySelector(".View__Slider") as HTMLElement;
    slider.style.transform = "translateX(0)";
  }

  const AddnewRoom = () => {

    
    // const ref = await addDoc(collection(db, `rooms`)
    
  }
  return (


    <>
    {(matches&&roomid) ? <Back onClick={() => ChangeToRoomListView()}>BACK</Back> : ""}
    {modalOpen && <Modal handleClose={CloseModal}></Modal>}
    <Container>
      <Content className="View__Slider">
        <Left>
          <Top>
            <Title>Chat</Title>
            <NewChatButton onClick={() => OpenModal()}>
              <Addsvg
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M14 8H8V14H6V8H0V6H6V0H8V6H14V8Z" fill="white" />
              </Addsvg>
              <ButtonDesc>Create New Chat</ButtonDesc>
            </NewChatButton>
          </Top>
          <Algolia/>
        </Left>
        <Right>
          <ChatBox/>
        </Right>
      </Content>
    </Container>
    </>
  );
};

export default Chatpage;
