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

const Container = styled.div<{ callinprogress: boolean }>`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
`;
const Top = styled.div`
  display: flex;
  height: 60px;
  justify-content: space-between;
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

const RoomInfo = styled.div`
  display: grid;
  grid-template: auto auto / 60px auto;
`;
const RoomImg = styled.img`
  width: 60px;
  height: 60px;
  grid-column: 1/2;
  grid-row: 1/3;
`;
const Roomname = styled.h2`
  font-size: 18px;
  align-self: flex-end;
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
const VideocallButton = styled.button<{ callinprogress: boolean }>`
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
  height: 80px;
  display: flex;
`;
const Form = styled.form`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`;
const Input = styled.input`
  width: 80%;
  height: 60px;
  padding: 16px;
  font-size: 16px;
  outline: none;
  border: none;
  background: none;
  color: var(--text-color-primary);
`;

const AddContainer = styled.div`
  &:hover .add__menu {
    opacity: 1;
  }
`;
const Addbutton = styled.button`
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(325.78deg, #2a8bf2 14.76%, #7cb8f7 87.3%);
  cursor: pointer;
`;
const Addemojibutton = styled.button`
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(325.78deg, #2a8bf2 14.76%, #7cb8f7 87.3%);
  cursor: pointer;
`;

const Addmenu = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  top: -150px;
  z-index: 1;
  padding: 10px 0;
  opacity: 0;
  height: 170px;
`;

const AddmenuButton = styled.button`
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(325.78deg, #2a8bf2 14.76%, #7cb8f7 87.3%);
  cursor: pointer;
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
    console.log("submitted");
    const ref = await addDoc(collection(db, `rooms/${roomid}/messages`), {
      content: inputvalue,
      timestamp: Timestamp.now(),
      userid: user.uid,
      user: user.displayName,
      userphotoURL: user.photoURL,
    });
    console.log("message added");
    const roomref = doc(db, "rooms", roomid);
    updateDoc(roomref, {
      roommessagecount: increment(1),
      latestmessage: inputvalue,
      latestmessagetime: Timestamp.now(),
      latestmessageuser: user.displayName,
      latestmessageuserphotoURL: user.photoURL,
    });
    props.endofMessageList.current.scrollIntoView();
    setinputvalue("");
  };
  return (
    <Form onSubmit={(e) => handleFormSubmit(e)}>
      <AddContainer>
        <Addbutton>
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M14 8H8V14H6V8H0V6H6V0H8V6H14V8Z" fill="white" />
          </svg>
        </Addbutton>
        <Addmenu className="add__menu">
          <AddmenuButton>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17.4443 20H6.5553C6.2493 20 6.0003 19.776 6.0003 19.5V4.5C6.0003 4.224 6.2493 4 6.5553 4H11.0003V8.15C11.0003 9.722 12.2173 11 13.7143 11H18.0003V19.5C18.0003 19.776 17.7503 20 17.4443 20ZM17.6493 9H13.7143C13.3203 9 13.0003 8.619 13.0003 8.15V4H13.1123L17.6493 9ZM19.7403 8.328L14.2963 2.328C14.1073 2.119 13.8383 2 13.5553 2H6.5553C5.1463 2 4.0003 3.122 4.0003 4.5V19.5C4.0003 20.878 5.1463 22 6.5553 22H17.4443C18.8533 22 20.0003 20.878 20.0003 19.5V9C20.0003 8.751 19.9073 8.512 19.7403 8.328Z"
                fill="white"
              />
              <mask
                id="mask0_1:413"
                maskUnits="userSpaceOnUse"
                x="4"
                y="2"
                width="17"
                height="20"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M17.4443 20H6.5553C6.2493 20 6.0003 19.776 6.0003 19.5V4.5C6.0003 4.224 6.2493 4 6.5553 4H11.0003V8.15C11.0003 9.722 12.2173 11 13.7143 11H18.0003V19.5C18.0003 19.776 17.7503 20 17.4443 20ZM17.6493 9H13.7143C13.3203 9 13.0003 8.619 13.0003 8.15V4H13.1123L17.6493 9ZM19.7403 8.328L14.2963 2.328C14.1073 2.119 13.8383 2 13.5553 2H6.5553C5.1463 2 4.0003 3.122 4.0003 4.5V19.5C4.0003 20.878 5.1463 22 6.5553 22H17.4443C18.8533 22 20.0003 20.878 20.0003 19.5V9C20.0003 8.751 19.9073 8.512 19.7403 8.328Z"
                  fill="white"
                />
              </mask>
              <g mask="url(#mask0_1:413)">
                <rect width="24" height="24" fill="white" />
              </g>
            </svg>
          </AddmenuButton>
          <AddmenuButton>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8 10C8.828 10 9.5 9.328 9.5 8.5C9.5 7.672 8.828 7 8 7C7.172 7 6.5 7.672 6.5 8.5C6.5 9.328 7.172 10 8 10ZM18 19H6.561L13.566 13.155C13.812 12.946 14.258 12.947 14.499 13.154L19 16.994V18C19 18.552 18.552 19 18 19ZM6 5H18C18.552 5 19 5.448 19 6V14.364L15.797 11.632C14.807 10.79 13.258 10.79 12.277 11.626L5 17.698V6C5 5.448 5.448 5 6 5ZM18 3H6C4.346 3 3 4.346 3 6V18C3 19.654 4.346 21 6 21H18C19.654 21 21 19.654 21 18V6C21 4.346 19.654 3 18 3Z"
                fill="white"
              />
              <mask
                id="mask0_1:426"
                maskUnits="userSpaceOnUse"
                x="3"
                y="3"
                width="18"
                height="18"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8 10C8.828 10 9.5 9.328 9.5 8.5C9.5 7.672 8.828 7 8 7C7.172 7 6.5 7.672 6.5 8.5C6.5 9.328 7.172 10 8 10ZM18 19H6.561L13.566 13.155C13.812 12.946 14.258 12.947 14.499 13.154L19 16.994V18C19 18.552 18.552 19 18 19ZM6 5H18C18.552 5 19 5.448 19 6V14.364L15.797 11.632C14.807 10.79 13.258 10.79 12.277 11.626L5 17.698V6C5 5.448 5.448 5 6 5ZM18 3H6C4.346 3 3 4.346 3 6V18C3 19.654 4.346 21 6 21H18C19.654 21 21 19.654 21 18V6C21 4.346 19.654 3 18 3Z"
                  fill="white"
                />
              </mask>
              <g mask="url(#mask0_1:426)">
                <rect width="24" height="24" fill="white" />
              </g>
            </svg>
          </AddmenuButton>
          <AddmenuButton>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M19 18.2559C19 18.6659 18.666 18.9999 18.256 18.9999H17V16.9999H19V18.2559ZM5 18.2559V16.9999H7V18.9999H5.744C5.334 18.9999 5 18.6659 5 18.2559ZM5.744 4.99988H7V6.99988H5V5.74388C5 5.33388 5.334 4.99988 5.744 4.99988ZM19 5.74388V6.99988H17V4.99988H18.256C18.666 4.99988 19 5.33388 19 5.74388ZM17 14.9999H19V12.9999H17V14.9999ZM17 10.9999H19V8.99988H17V10.9999ZM9 18.9999H15V4.99988H9V18.9999ZM5 14.9999H7V12.9999H5V14.9999ZM5 10.9999H7V8.99988H5V10.9999ZM18.256 2.99988H5.744C4.231 2.99988 3 4.23188 3 5.74388V18.2559C3 19.7689 4.231 20.9999 5.744 20.9999H18.256C19.769 20.9999 21 19.7689 21 18.2559V5.74388C21 4.23188 19.769 2.99988 18.256 2.99988Z"
                fill="white"
              />
              <mask
                id="mask0_1:442"
                maskUnits="userSpaceOnUse"
                x="3"
                y="2"
                width="18"
                height="19"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M19 18.2559C19 18.6659 18.666 18.9999 18.256 18.9999H17V16.9999H19V18.2559ZM5 18.2559V16.9999H7V18.9999H5.744C5.334 18.9999 5 18.6659 5 18.2559ZM5.744 4.99988H7V6.99988H5V5.74388C5 5.33388 5.334 4.99988 5.744 4.99988ZM19 5.74388V6.99988H17V4.99988H18.256C18.666 4.99988 19 5.33388 19 5.74388ZM17 14.9999H19V12.9999H17V14.9999ZM17 10.9999H19V8.99988H17V10.9999ZM9 18.9999H15V4.99988H9V18.9999ZM5 14.9999H7V12.9999H5V14.9999ZM5 10.9999H7V8.99988H5V10.9999ZM18.256 2.99988H5.744C4.231 2.99988 3 4.23188 3 5.74388V18.2559C3 19.7689 4.231 20.9999 5.744 20.9999H18.256C19.769 20.9999 21 19.7689 21 18.2559V5.74388C21 4.23188 19.769 2.99988 18.256 2.99988Z"
                  fill="white"
                />
              </mask>
              <g mask="url(#mask0_1:442)">
                <rect width="24" height="24" fill="white" />
              </g>
            </svg>
          </AddmenuButton>
        </Addmenu>
      </AddContainer>
      <Input onChange={(e) => handleChange(e)} value={inputvalue}></Input>
      <Addemojibutton>
        <svg
          width="14"
          height="14"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.99 0C4.47 0 0 4.48 0 10C0 15.52 4.47 20 9.99 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 9.99 0ZM10 18C5.58 18 2 14.42 2 10C2 5.58 5.58 2 10 2C14.42 2 18 5.58 18 10C18 14.42 14.42 18 10 18ZM13.5 9C14.33 9 15 8.33 15 7.5C15 6.67 14.33 6 13.5 6C12.67 6 12 6.67 12 7.5C12 8.33 12.67 9 13.5 9ZM6.5 9C7.33 9 8 8.33 8 7.5C8 6.67 7.33 6 6.5 6C5.67 6 5 6.67 5 7.5C5 8.33 5.67 9 6.5 9ZM10 15.5C12.33 15.5 14.31 14.04 15.11 12H4.89C5.69 14.04 7.67 15.5 10 15.5Z"
            fill="white"
          />
        </svg>
      </Addemojibutton>
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
          <Roomname> {roomdetails?.roomname}</Roomname>
          <Roomtype>{roomdetails?.roomtype}</Roomtype>
        </RoomInfo>
        <RoomAction>
          <CopyRoomid>
            <Actionsvg width="16" height="16" viewBox="0 0 19 22" fill="none">
              <path d="M14 0H2C0.9 0 0 0.9 0 2V16H2V2H14V0ZM13 4L19 10V20C19 21.1 18.1 22 17 22H5.99C4.89 22 4 21.1 4 20L4.01 6C4.01 4.9 4.9 4 6 4H13ZM12 11H17.5L12 5.5V11Z" />
            </Actionsvg>
          </CopyRoomid>
          <DeleteRoom>
            <Actionsvg
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                d="M476.352,247.979l-85.333-74.667c-3.136-2.731-7.616-3.392-11.435-1.685c-3.819,1.728-6.251,5.525-6.251,9.707v32H256
				c-5.888,0-10.667,4.779-10.667,10.667v64c0,5.888,4.779,10.667,10.667,10.667h117.333v32c0,4.181,2.453,7.979,6.251,9.707
				c1.408,0.64,2.923,0.96,4.416,0.96c2.539,0,5.035-0.896,7.019-2.645l85.333-74.667c2.325-2.027,3.648-4.949,3.648-8.021
				S478.677,250.005,476.352,247.979z"
              />
              <path
                d="M341.333,320H256c-17.643,0-32-14.357-32-32v-64c0-17.643,14.357-32,32-32h85.333c5.888,0,10.667-4.779,10.667-10.667V32
				c0-17.643-14.357-32-32-32H64C46.357,0,32,14.357,32,32v448c0,17.643,14.357,32,32,32h256c17.643,0,32-14.357,32-32V330.667
				C352,324.779,347.221,320,341.333,320z"
              />
            </Actionsvg>
          </DeleteRoom>
          <VideocallButton
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
