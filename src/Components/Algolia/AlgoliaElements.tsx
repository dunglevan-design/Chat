import styled from "styled-components";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useTimeElapsed } from "../CustomHooks/useTimeElapsed";
import { Timestamp } from "firebase/firestore";
import { useHistory } from "react-router-dom";
//import { Link } from "react-router-dom";

type roomHit = {
  objectID : string;
  roommessagecount: number;
  roomname: string;
  roomphotoURL: string;
  roomtype: string;
  path: string;
  latestmessage?: string;
  lastmodified?: number;
  latestmessagetime?: number;
  latestmessageuser?: string;

}

const Resetbutton = styled(motion.button)`
  position: absolute;
  top: 10px;
  border: none;
  border-radius: 50%;
  background: none;
  z-index: 100;
  cursor: pointer;
  width: 40px;
  height: 40px;
  &:hover {
    background-color: #f2f2f2;
  }
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SvgReset = styled.svg`
    width: 100%;
    height: 100%;
`;


export const ResetButton = ({Reset}: {Reset:() => void}) => {
  return (
    <Resetbutton className =  "reset__button"  onClick={Reset}>
      <SvgReset
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16 7H3.83L9.42 1.41L8 0L0 8L8 16L9.41 14.59L3.83 9H16V7Z"
          fill="black"
        />
      </SvgReset>
    </Resetbutton>
  );
};

export const Container = styled.div`
  position: relative;
`;
const Roomcard = styled(motion.div)`
  display: flex;
  flex-direction: column;
  position: relative;
  border-radius: 16px;
  padding: 10px 0;
  cursor: pointer;
  &:hover {
    background-color: #f2f2f2;
  }
`;

const Top = styled.div`
  display: flex;
`;

const Logo = styled.div`
  display: flex;
`;
const RoomImg = styled(motion.img)`
  width: 70px;
  height: 70px;
`;

const RoomInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const RoomName = styled.h2`
  font-size: 20px;
`;

const RoomAction = styled.p`
  color: #2a8bf2;
  font-weight: 600;
`;

const RoomTimeStamp = styled.p`
  position: absolute;
  top: 16px;
  right: 10px;
`;

const Bottom = styled.div`
  padding: 0 10px;
`;
const RoomMessage = styled.p``;



export const Hit = ({ hit }: { hit: roomHit }) => {
  const CurrentItem = useRef(null);
  const returnedtime = Timestamp.fromMillis(hit.latestmessagetime);
  // console.log("timestampnow: " + timestampnow);
  const messagetime = useTimeElapsed(returnedtime);
  const history = useHistory();


  const EnterRoom = () => {
    history.push(`/chat/${hit.path}`);
    ToggleActive();
  }

  const ToggleActive = () => {
    const ActiveItem = document.querySelector(".roomcard.active");
    if (ActiveItem === CurrentItem.current) {
      return;
    }
    CurrentItem.current.classList.add("active");
    ActiveItem?.classList?.remove("active");
  };
  return (
    <Roomcard
      whileTap={{ scale: 0.95 }}
      ref={CurrentItem}
      className="roomcard"
      onClick={() => EnterRoom()}
    >
      <Top>
        <Logo>
          <RoomImg src={hit.roomphotoURL} />
          <RoomInfo>
            <RoomName>{hit.roomname}</RoomName>
            <RoomAction>{hit.latestmessageuser} writes</RoomAction>
          </RoomInfo>
        </Logo>
        <RoomTimeStamp>{messagetime}</RoomTimeStamp>
      </Top>
      <Bottom>
        <RoomMessage>{hit.latestmessage}</RoomMessage>
      </Bottom>
    </Roomcard>
  );
};
