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


const Styledsvg = styled.svg`
  height: 300px;
  width: 300px;
`;
const Undraw = () => (<Styledsvg data-name="Layer 1" width="891.29496" height="745.19434" viewBox="0 0 891.29496 745.19434">
<ellipse cx="418.64354" cy="727.19434" rx="352" ry="18" fill="#f2f2f2" />
<path d="M778.64963,250.35008h-3.99878V140.80476a63.40187,63.40187,0,0,0-63.4018-63.40193H479.16232a63.40188,63.40188,0,0,0-63.402,63.4017v600.9744a63.40189,63.40189,0,0,0,63.4018,63.40192H711.24875a63.40187,63.40187,0,0,0,63.402-63.40168V328.32632h3.99878Z" transform="translate(-154.35252 -77.40283)" fill="#3f3d56" />
<path d="M761.156,141.24713v600.09a47.35072,47.35072,0,0,1-47.35,47.35h-233.2a47.35084,47.35084,0,0,1-47.35-47.35v-600.09a47.3509,47.3509,0,0,1,47.35-47.35h28.29a22.50659,22.50659,0,0,0,20.83,30.99h132.96a22.50672,22.50672,0,0,0,20.83-30.99h30.29A47.35088,47.35088,0,0,1,761.156,141.24713Z" transform="translate(-154.35252 -77.40283)" fill="#fff" />
<path d="M686.03027,400.0032q-2.32543,1.215-4.73047,2.3-2.18994.99-4.4497,1.86c-.5503.21-1.10987.42-1.66992.63a89.52811,89.52811,0,0,1-13.6001,3.75q-3.43506.675-6.96,1.06-2.90991.33-5.87989.47c-1.41015.07-2.82031.1-4.24023.1a89.84124,89.84124,0,0,1-16.75977-1.57c-1.44043-.26-2.85009-.57-4.26025-.91a88.77786,88.77786,0,0,1-19.66992-7.26c-.56006-.28-1.12012-.58-1.68018-.87-.83008-.44-1.63965-.9-2.4497-1.38.38964-.54.81005-1.07,1.23974-1.59a53.03414,53.03414,0,0,1,78.87012-4.1,54.27663,54.27663,0,0,1,5.06006,5.86C685.25977,398.89316,685.6499,399.44321,686.03027,400.0032Z" transform="translate(-154.35252 -77.40283)" fill="#2a8bf2" />
<circle cx="492.14325" cy="234.76352" r="43.90974" fill="#2f2e41" />
<circle cx="642.49883" cy="327.46205" r="32.68086" transform="translate(-232.6876 270.90663) rotate(-28.66315)" fill="#a0616a" />
<path d="M676.8388,306.90589a44.44844,44.44844,0,0,1-25.402,7.85033,27.23846,27.23846,0,0,0,10.796,4.44154,89.62764,89.62764,0,0,1-36.61.20571,23.69448,23.69448,0,0,1-7.66395-2.63224,9.699,9.699,0,0,1-4.73055-6.3266c-.80322-4.58859,2.77227-8.75743,6.488-11.567a47.85811,47.85811,0,0,1,40.21662-8.03639c4.49246,1.16124,8.99288,3.12327,11.91085,6.731s3.78232,9.16981,1.00224,12.88488Z" transform="translate(-154.35252 -77.40283)" fill="#2f2e41" />
<path d="M644.5,230.17319a89.98675,89.98675,0,0,0-46.83984,166.83l.58007.34q.72.43506,1.43995.84c.81005.48,1.61962.94,2.4497,1.38.56006.29,1.12012.59,1.68018.87a88.77786,88.77786,0,0,0,19.66992,7.26c1.41016.34,2.81982.65,4.26025.91a89.84124,89.84124,0,0,0,16.75977,1.57c1.41992,0,2.83008-.03,4.24023-.1q2.97-.135,5.87989-.47,3.52513-.39,6.96-1.06a89.52811,89.52811,0,0,0,13.6001-3.75c.56005-.21,1.11962-.42,1.66992-.63q2.26464-.87,4.4497-1.86,2.40015-1.08,4.73047-2.3a90.7919,90.7919,0,0,0,37.03955-35.97c.04-.07995.09034-.16.13038-.24a89.30592,89.30592,0,0,0,9.6499-26.41,90.051,90.051,0,0,0-88.3501-107.21Zm77.06006,132.45c-.08008.14-.1499.28-.23.41a88.17195,88.17195,0,0,1-36.48,35.32q-2.29542,1.2-4.66992,2.25c-1.31006.59-2.64991,1.15-4,1.67-.57032.22-1.14991.44-1.73.64a85.72126,85.72126,0,0,1-11.73,3.36,84.69473,84.69473,0,0,1-8.95019,1.41c-1.8501.2-3.73.34-5.62012.41-1.21.05-2.42969.08-3.6499.08a86.762,86.762,0,0,1-16.21973-1.51,85.62478,85.62478,0,0,1-9.63037-2.36,88.46592,88.46592,0,0,1-13.98974-5.67c-.52-.27-1.04-.54-1.5503-.82-.73-.39-1.46972-.79-2.18994-1.22-.54-.3-1.08008-.62-1.60986-.94-.31006-.18-.62012-.37-.93018-.56a88.06851,88.06851,0,1,1,123.18018-32.47Z" transform="translate(-154.35252 -77.40283)" fill="#3f3d56" />
<path d="M624.2595,268.86254c-.47244-4.968-6.55849-8.02647-11.3179-6.52583s-7.88411,6.2929-8.82863,11.19308a16.0571,16.0571,0,0,0,2.16528,12.12236c2.40572,3.46228,6.82664,5.623,10.95,4.74406,4.70707-1.00334,7.96817-5.59956,8.90127-10.32105s.00667-9.58929-.91854-14.31234Z" transform="translate(-154.35252 -77.40283)" fill="#2f2e41" />
<path d="M691.24187,275.95964c-.47245-4.968-6.5585-8.02646-11.3179-6.52582s-7.88412,6.29289-8.82864,11.19307a16.05711,16.05711,0,0,0,2.16529,12.12236c2.40571,3.46228,6.82663,5.623,10.95,4.74406,4.70707-1.00334,7.96817-5.59955,8.90127-10.32105s.00667-9.58929-.91853-14.31234Z" transform="translate(-154.35252 -77.40283)" fill="#2f2e41" />
<path d="M488.93638,356.14169a4.47525,4.47525,0,0,1-3.30664-1.46436L436.00767,300.544a6.02039,6.02039,0,0,0-4.42627-1.94727H169.3618a15.02615,15.02615,0,0,1-15.00928-15.00927V189.025a15.02615,15.02615,0,0,1,15.00928-15.00928H509.087A15.02615,15.02615,0,0,1,524.0963,189.025v94.5625A15.02615,15.02615,0,0,1,509.087,298.59676h-9.63135a6.01157,6.01157,0,0,0-6.00464,6.00489v47.0332a4.474,4.474,0,0,1-2.87011,4.1958A4.52563,4.52563,0,0,1,488.93638,356.14169Z" transform="translate(-154.35252 -77.40283)" fill="#fff" />
<path d="M488.93638,356.14169a4.47525,4.47525,0,0,1-3.30664-1.46436L436.00767,300.544a6.02039,6.02039,0,0,0-4.42627-1.94727H169.3618a15.02615,15.02615,0,0,1-15.00928-15.00927V189.025a15.02615,15.02615,0,0,1,15.00928-15.00928H509.087A15.02615,15.02615,0,0,1,524.0963,189.025v94.5625A15.02615,15.02615,0,0,1,509.087,298.59676h-9.63135a6.01157,6.01157,0,0,0-6.00464,6.00489v47.0332a4.474,4.474,0,0,1-2.87011,4.1958A4.52563,4.52563,0,0,1,488.93638,356.14169ZM169.3618,176.01571A13.024,13.024,0,0,0,156.35252,189.025v94.5625a13.024,13.024,0,0,0,13.00928,13.00927H431.5814a8.02436,8.02436,0,0,1,5.90039,2.59571l49.62208,54.1333a2.50253,2.50253,0,0,0,4.34716-1.69092v-47.0332a8.0137,8.0137,0,0,1,8.00464-8.00489H509.087a13.024,13.024,0,0,0,13.00928-13.00927V189.025A13.024,13.024,0,0,0,509.087,176.01571Z" transform="translate(-154.35252 -77.40283)" fill="#3f3d56" />
<circle cx="36.81601" cy="125.19345" r="13.13371" fill="#2a8bf2" />
<path d="M493.76439,275.26947H184.68447a7.00465,7.00465,0,1,1,0-14.00929H493.76439a7.00465,7.00465,0,0,1,0,14.00929Z" transform="translate(-154.35252 -77.40283)" fill="#e6e6e6" />
<path d="M393.07263,245.49973H184.68447a7.00465,7.00465,0,1,1,0-14.00929H393.07263a7.00464,7.00464,0,0,1,0,14.00929Z" transform="translate(-154.35252 -77.40283)" fill="#e6e6e6" />
<path d="M709.41908,676.83065a4.474,4.474,0,0,1-2.87011-4.1958v-47.0332a6.01157,6.01157,0,0,0-6.00464-6.00489H690.913a15.02615,15.02615,0,0,1-15.00928-15.00927V510.025A15.02615,15.02615,0,0,1,690.913,495.01571H1030.6382a15.02615,15.02615,0,0,1,15.00928,15.00928v94.5625a15.02615,15.02615,0,0,1-15.00928,15.00927H768.4186a6.02039,6.02039,0,0,0-4.42627,1.94727l-49.62207,54.1333a4.47525,4.47525,0,0,1-3.30664,1.46436A4.52563,4.52563,0,0,1,709.41908,676.83065Z" transform="translate(-154.35252 -77.40283)" fill="#fff" />
<path d="M709.41908,676.83065a4.474,4.474,0,0,1-2.87011-4.1958v-47.0332a6.01157,6.01157,0,0,0-6.00464-6.00489H690.913a15.02615,15.02615,0,0,1-15.00928-15.00927V510.025A15.02615,15.02615,0,0,1,690.913,495.01571H1030.6382a15.02615,15.02615,0,0,1,15.00928,15.00928v94.5625a15.02615,15.02615,0,0,1-15.00928,15.00927H768.4186a6.02039,6.02039,0,0,0-4.42627,1.94727l-49.62207,54.1333a4.47525,4.47525,0,0,1-3.30664,1.46436A4.52563,4.52563,0,0,1,709.41908,676.83065ZM690.913,497.01571A13.024,13.024,0,0,0,677.9037,510.025v94.5625A13.024,13.024,0,0,0,690.913,617.59676h9.63135a8.0137,8.0137,0,0,1,8.00464,8.00489v47.0332a2.50253,2.50253,0,0,0,4.34716,1.69092l49.62208-54.1333a8.02436,8.02436,0,0,1,5.90039-2.59571h262.2196a13.024,13.024,0,0,0,13.00928-13.00927V510.025a13.024,13.024,0,0,0-13.00928-13.00928Z" transform="translate(-154.35252 -77.40283)" fill="#3f3d56" />
<path d="M603.53027,706.11319a89.06853,89.06853,0,0,1-93.65039,1.49,54.12885,54.12885,0,0,1,9.40039-12.65,53.43288,53.43288,0,0,1,83.90967,10.56994C603.2998,705.71316,603.41992,705.91318,603.53027,706.11319Z" transform="translate(-154.35252 -77.40283)" fill="#2a8bf2" />
<circle cx="398.44256" cy="536.68841" r="44.20157" fill="#2f2e41" />
<circle cx="556.81859" cy="629.4886" r="32.89806" transform="translate(-416.96496 738.72884) rotate(-61.33685)" fill="#ffb8b8" />
<path d="M522.25039,608.79582a44.74387,44.74387,0,0,0,25.57085,7.9025,27.41946,27.41946,0,0,1-10.8677,4.47107,90.22316,90.22316,0,0,0,36.85334.20707,23.852,23.852,0,0,0,7.71488-2.64973,9.76352,9.76352,0,0,0,4.762-6.36865c.80855-4.61909-2.7907-8.81563-6.53113-11.64387a48.17616,48.17616,0,0,0-40.4839-8.08981c-4.52231,1.169-9.05265,3.144-11.99,6.77579s-3.80746,9.23076-1.0089,12.97052Z" transform="translate(-154.35252 -77.40283)" fill="#2f2e41" />
<path d="M555.5,721.17319a89.97205,89.97205,0,1,1,48.5708-14.21875A89.87958,89.87958,0,0,1,555.5,721.17319Zm0-178a88.00832,88.00832,0,1,0,88,88A88.09957,88.09957,0,0,0,555.5,543.17319Z" transform="translate(-154.35252 -77.40283)" fill="#3f3d56" />
<circle cx="563.81601" cy="445.19345" r="13.13371" fill="#2a8bf2" />
<path d="M1020.76439,595.26947H711.68447a7.00465,7.00465,0,1,1,0-14.00929h309.07992a7.00464,7.00464,0,0,1,0,14.00929Z" transform="translate(-154.35252 -77.40283)" fill="#e6e6e6" />
<path d="M920.07263,565.49973H711.68447a7.00465,7.00465,0,1,1,0-14.00929H920.07263a7.00465,7.00465,0,0,1,0,14.00929Z" transform="translate(-154.35252 -77.40283)" fill="#e6e6e6" />
<ellipse cx="554.64354" cy="605.66091" rx="24.50394" ry="2.71961" fill="#f2f2f2" />
<ellipse cx="335.64354" cy="285.66091" rx="24.50394" ry="2.71961" fill="#f2f2f2" />
</Styledsvg>)

const Container = styled.div`
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
`;

const Roomtype = styled.p`
  font-size: 16px;
  align-self: flex-start;
  margin-top: -5px;
`;
const RoomAction = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Addmember = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  /* background: none; */
  border: none;
  outline: none;
  border-radius: 50%;
  height: 40px;
  width: 40px;
`;
const DeleteRoom = styled.button`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  border: none;
  outline: none;
`;
const DeleteSvg = styled.svg`
  width: 16px;
  height: 16px;
`;
const RoomTime = styled.div``;
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



const Chatinput = (props:any) => {
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

const ChatBox = () => {
  const { roomid }: { roomid: string } = useParams();
  const EndOfMessageList = useRef();
  const roomdetails = useRoomDetails(roomid);
  const messagelist = useRoomMessageList(roomid);
  const user = auth.currentUser;

  return (
    <Container>
      {/* <Undraw /> */}
      <Top>
        <RoomInfo>
          <RoomImg src={roomdetails?.roomphotoURL}></RoomImg>
          <Roomname> {roomdetails?.roomname}</Roomname>
          <Roomtype>{roomdetails?.roomtype}</Roomtype>
        </RoomInfo>
        <RoomAction>
          <Addmember>+</Addmember>
          <DeleteRoom>
            <DeleteSvg
              viewBox="0 0 14 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 16C1 17.1 1.9 18 3 18H11C12.1 18 13 17.1 13 16V4H1V16ZM14 1H10.5L9.5 0H4.5L3.5 1H0V3H14V1Z"
                fill="black"
              />
            </DeleteSvg>
          </DeleteRoom>
          <RoomTime>TODO</RoomTime>
        </RoomAction>
      </Top>
      <ChatView>
        <MessageList>
          {messagelist.map((message, index) => (
            <MessageContainer key= {index}
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
        <Chatinput endofMessageList = {EndOfMessageList}/>
      </Bottom>
    </Container>
  );
};

export default ChatBox;
