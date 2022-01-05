import { Ref, useContext, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import { auth, db } from "../../firebase";
import useRoomMessageList from "../CustomHooks/useMessagelist";
import useRoomDetails from "../CustomHooks/useRoomDetails";
import {
  addDoc,
  collection,
  doc,
  increment,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { context } from "../../Globals/GlobalStateProvider";
import { useMediaQuery } from "../CustomHooks/useMediaQuery";
import ExitSvg from "../../images/exit.svg";
import videocallsvg from "../../images/videocall.svg";
import { Actionsvg } from "./ChatBoxElements";
import { motion } from "framer-motion";

const Container = styled.div<{ callinprogress: boolean }>`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
`;
const Top = styled.div`
  display: flex;
  height: 90px;
  justify-content: space-between;
  position: relative;
  align-items: center;
  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 10%;
    width: 80%;
    height: 2px;
    background: lightgrey;
  }
`;

const RoomInfo = styled.div`
  display: flex;
`;
const RoomImg = styled.img`
  width: 60px;
  height: 60px;
`;
const Roomname = styled.h2`
  font-size: 18px;
  color: var(--text-color-primary);
`;

const Roomtype = styled.p`
  font-size: 16px;
  align-self: flex-start;
  margin-top: -5px;
  color: var(--text-color-secondary);
`;
const RoomAction = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CopyRoomid = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  /* background: none; */
  border: none;
  outline: none;
  border-radius: 50%;
  height: 40px;
  width: 40px;
  cursor: pointer;
  background: var(--active-color);

  & svg {
    fill: var(--text-color-primary);
  }
`;
const DeleteRoom = styled.button`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  background: var(--active-color);

  & svg {
    fill: var(--text-color-primary);
  }
`;
const VideocallButton = styled(motion.button)<{ callinprogress: boolean }>`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  background: var(--active-color);

  & img {
    width: 18px;
    height: 18px;
    position: absolute;
    left: 30%;
  }
`;
const ChatView = styled.div`
  height: calc(100% - 60px - 80px);
  padding: 10px 0;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 10%;
    width: 80%;
    height: 2px;
    background: lightgrey;
  }
`;
const MessageList = styled.ul`
  display: flex;
  height: 100%;
  flex-direction: column;
  overflow: hidden;
  overflow-y: scroll;
`;
const MessageContainer = styled.div<{ Isentit: boolean }>`
  display: flex;
  justify-content: ${(props) => (props.Isentit ? "flex-end" : "flex-start")};
`;
const UserImg = styled.img<{ Isentit: boolean }>`
  width: 28px;
  height: 28px;
  margin-right: 5px;
  order: ${(props) => (props.Isentit ? 2 : 1)};
`;
const MessageBubble = styled.div<{ Isentit: boolean }>`
  order: ${(props) => (props.Isentit ? 1 : 2)};
  border-radius: ${(props) => (props.Isentit ? "10px" : "0px 10px 10px 10px ")};
  border: ${(props) =>
    props.Isentit ? "1px solid rgba(112, 124, 151, 0.25)" : "none"};
  background: ${(props) =>
    props.Isentit
      ? "#FFFFFF"
      : "linear-gradient(90.54deg, #60a9f6 0%, #2a8bf2 100%)"};
  padding: 0 5px;
  margin-bottom: 16px;

  box-shadow: 10px 10px 25px rgba(42, 139, 242, 0.1),
    15px 15px 35px rgba(42, 139, 242, 0.05),
    10px 10px 50px rgba(42, 139, 242, 0.1);
`;
const MessageContent = styled.p<{ Isentit: boolean }>`
  color: ${(props) => (props.Isentit ? "#707C97" : "#FFFFFF")};
`;

//!Style bottom Chatinput
const Bottom = styled.div`
  height: 50px;
  display: flex;
`;
const Form = styled.form`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;

  button {
    border-radius: 12px;
    width: 50px;
    height: 50px;
    background: #2a8bf2;
    outline: none;
    border: none;
  }
`;
const Input = styled.input`
  width: 80%;
  height: 60px;
  padding: 16px 0 16px 0;
  font-size: 16px;
  outline: none;
  border: none;
  background: none;
  color: var(--text-color-primary);
  margin-left: 10%;
`;

const Chatinput = (props: any) => {
  const { roomid }: { roomid: string } = useParams();
  const [inputvalue, setinputvalue] = useState("");
  const { globalstate } = useContext(context);
  const user = globalstate.user;

  const handleChange = (e: any) => {
    setinputvalue(e.currentTarget.value);
  };

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();
    setinputvalue("");
    await addDoc(collection(db, `rooms/${roomid}/messages`), {
      content: inputvalue,
      timestamp: Timestamp.now(),
      userid: user.uid,
      user: user.displayName,
      userphotoURL: user.photoURL,
    });
    const roomref = doc(db, "rooms", roomid);
    updateDoc(roomref, {
      roommessagecount: increment(1),
      latestmessage: inputvalue,
      latestmessagetime: Timestamp.now(),
      latestmessageuser: user.displayName,
      latestmessageuserphotoURL: user.photoURL,
    });
    props.endofMessageList.current.scrollIntoView();
  };
  return (
    <Form onSubmit={(e) => handleFormSubmit(e)}>
      <Input
        placeholder="type something nice"
        onChange={(e) => handleChange(e)}
        value={inputvalue}
      ></Input>
      <button type="submit" disabled = {inputvalue.length <= 0}>🕊️</button>
    </Form>
  );
};

const ChatBox = ({ startvideocall }: { startvideocall: () => void }) => {
  const { roomid }: { roomid: string } = useParams();
  const EndOfMessageList = useRef();
  const roomdetails = useRoomDetails(roomid);
  const messagelist = useRoomMessageList(roomid);
  const user = auth.currentUser;

  return (
    <Container callinprogress={roomdetails?.callinprogress}>
      {/* <Undraw /> */}
      <Top>
        <RoomInfo>
          <RoomImg src={roomdetails?.roomphotoURL}></RoomImg>
          <div>
            <Roomname> {roomdetails?.roomname}</Roomname>
            <Roomtype>{roomdetails?.roomtype}</Roomtype>
          </div>
        </RoomInfo>
        <RoomAction>
          <VideocallButton
            whileHover={{ scale: 1.1 }}
            callinprogress={roomdetails?.callinprogress}
            onClick={() => startvideocall()}
          >
            <Actionsvg
              callinprogress={roomdetails?.callinprogress}
              viewBox="0 0 28 28"
              fill="none"
            >
              <path d="M5.25 5.5C3.45507 5.5 2 6.95508 2 8.75V19.25C2 21.0449 3.45507 22.5 5.25 22.5H14.75C16.5449 22.5 18 21.0449 18 19.25V8.75C18 6.95507 16.5449 5.5 14.75 5.5H5.25Z" />
              <path d="M23.1232 20.6431L19.5 17.0935V10.9989L23.1121 7.3706C23.8988 6.58044 25.248 7.13753 25.248 8.25251V19.7502C25.248 20.8577 23.9143 21.4181 23.1232 20.6431Z" />
            </Actionsvg>
          </VideocallButton>
        </RoomAction>
      </Top>
      <ChatView>
        <MessageList>
          {messagelist.map((message, index) => (
            <MessageContainer
              key={index}
              Isentit={message.userid === user.uid ? true : false}
            >
              <UserImg
                Isentit={message.userid === user.uid ? true : false}
                src={message?.userphotoURL}
              />
              <MessageBubble
                Isentit={message.userid === user.uid ? true : false}
              >
                <MessageContent
                  Isentit={message.userid === user.uid ? true : false}
                >
                  {message?.content}
                </MessageContent>
              </MessageBubble>
            </MessageContainer>
          ))}
          <div ref={EndOfMessageList}></div>
        </MessageList>
      </ChatView>
      <Bottom>
        <Chatinput endofMessageList={EndOfMessageList} />
      </Bottom>
    </Container>
  );
};

export default ChatBox;
