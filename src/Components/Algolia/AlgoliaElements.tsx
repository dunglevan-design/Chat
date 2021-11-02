import styled from "styled-components";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useTimeElapsed } from "../CustomHooks/useTimeElapsed";
import { Timestamp } from "firebase/firestore";
import { useHistory, useParams } from "react-router-dom";
import { room } from "./Algolia";
import { useMediaQuery } from "../CustomHooks/useMediaQuery";
//import { Link } from "react-router-dom";

type roomHit = {
  objectID: string;
  roommessagecount: number;
  roomname: string;
  roomphotoURL: string;
  roomtype: string;
  path: string;
  latestmessage?: string;
  lastmodified?: number;
  latestmessagetime?: number;
  latestmessageuser?: string;
};

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

export const ResetButton = ({ Reset }: { Reset: () => void }) => {
  return (
    <Resetbutton className="reset__button" onClick={Reset}>
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
const RoomMessage = styled.p`
  overflow-wrap: break-word;
`;

export const RoomlistContainer = styled.div`
  position: relative;
  height: calc(100% - 76px);
  overflow: hidden;
`;

export const Slider = styled(motion.div)`
  position: relative;
  height: 100%;
`;

export const Wrapper = styled.div`
  height: 100%;
`;
export const Roomlist = styled.ul`
  position: absolute;
  height: 100%;
  width: 100%;
  overflow: hidden;
  overflow-y: scroll;
  z-index: 3;
`;

const HitItem = styled(motion.div)`
  display: flex;
  align-items: center;
  border-radius: 16px;
  padding: 10px 0;
  cursor: pointer;
  &:hover {
    background-color: #f2f2f2;
  }
`;

const HitImage = styled.img`
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HitInfo = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
const HitRoomname = styled.h2`
  font-size: 18px;
`;

const HitRoomtype = styled.p`
  overflow-wrap: break-word;
`;

export const Hitwrapper = styled.div`
  top: 0;
  height: 100%;
  position: absolute;
  left: 100%;
  width: 100%;
`;

export const Hit = ({ hit }: { hit: roomHit }) => {
  const CurrentItem = useRef(null);
  const history = useHistory();
  const matches = useMediaQuery("(max-width: 600px)");
  const EnterRoom = () => {
    history.push(`/chat/${hit.path}`)
    if (matches) {
      
      (document.querySelector(".View__Slider") as HTMLElement).style.transform =
        "translateX(-100vw)";
    }
  };
  return (
    <HitItem
      whileTap={{ scale: 0.95 }}
      ref={CurrentItem}
      className="roomcard"
      onClick={() => EnterRoom()}
    >
      <HitImage src={hit.roomphotoURL} />
      <HitInfo>
        <HitRoomname>{hit.roomname}</HitRoomname>
        <HitRoomtype>{hit.roomtype}</HitRoomtype>
      </HitInfo>
    </HitItem>
  );
};

export const Room = ({
  roomid,
  roomname,
  roomtype,
  roomphotoURL,
  latestmessage,
  latestmessagetime,
  latestmessageuser,
}: room) => {
  const CurrentItem = useRef(null);
  const returnedtime = Timestamp.fromMillis(latestmessagetime?.seconds * 1000);
  console.log(returnedtime);
  const messagetime = useTimeElapsed(returnedtime);
  const history = useHistory();
  const matches = useMediaQuery("(max-width:600px)");

  const EnterRoom = () => {
    history.push(`/chat/rooms/${roomid}`);
    ToggleActive();
    if (matches) {
      (document.querySelector(".View__Slider") as HTMLElement).style.transform =
        "translateX(-100vw)";
    }
  };

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
          <RoomImg src={roomphotoURL} />
          <RoomInfo>
            <RoomName>{roomname}</RoomName>
            {latestmessageuser && <RoomAction>{latestmessageuser} writes</RoomAction>}
          </RoomInfo>
        </Logo>
        {latestmessagetime && <RoomTimeStamp>{messagetime}</RoomTimeStamp>}
      </Top>
      <Bottom>
        <RoomMessage>{latestmessage}</RoomMessage>
      </Bottom>
    </Roomcard>
  );
};
