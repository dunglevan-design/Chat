import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  TextField,
  Switch,
} from "@mui/material";
import "./Chatpage.css";
import { useContext, useState } from "react";
import {
  addDoc,
  collection,
  getDoc,
  doc,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import { db, messaging } from "../../../firebase";
import { context } from "../../../Globals/GlobalStateProvider";
import { getToken } from "firebase/messaging";

export const Container = styled.div`
  display: flex;
  width: calc(100% - 100px);
  position: absolute;
  left: 100px;
  top: 80px;
  height: calc(100% - 80px);
  padding: 0 10px;
  overflow: hidden;
  @media screen and (max-width: 768px) {
    width: 100%;
    left: 0;
  }
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transition: all 0.3s ease-in;
`;

export const Left = styled.div`
  display: flex;
  height: 100%;
  width: 50%;
  background: var(--bg-widget);
  flex-direction: column;
  padding: 10px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  border-radius: 16px;
  position: absolute;
  left: 0;
  @media screen and (max-width: 600px) {
    width: 100%;
  }
`;
export const Right = styled.div`
  height: 100%;
  width: 50%;
  display: flex;
  background: var(--bg-widget);
  flex-direction: column;
  padding: 10px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  border-radius: 16px;
  position: absolute;
  left: 50%;

  @media screen and (max-width: 600px) {
    width: 100%;
    left: 100vw;
    /* top: 1000vh; */
  }
`;
export const Top = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.h1`
  color: var(--text-color-primary);
`;

export const NewChatButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
  border: none;
  border-radius: 16px;
  background: linear-gradient(92.68deg, #7cb8f7 0%, #2a8bf2 100%);
  box-shadow: 6px 6px 25px rgba(42, 139, 242, 0.15),
    4px 4px 25px rgba(42, 139, 242, 0.05),
    10px 6px 25px rgba(42, 139, 242, 0.15);
  cursor: pointer;
`;

export const ButtonDesc = styled.p`
  color: white;
  font-size: 14px;
  margin-left: 10px;
`;

export const Addsvg = styled.svg`
  width: 24px;
  height: 24px;
`;

const StyledBackdrop = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: #000000e1;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;

  & .modal__wrapper {
    width: clamp(50%, 700px, 90%);
    height: min(70%, 500px);
    perspective: 1000px;
  }
`;
export const Backdrop = ({ children, onClick }) => {
  return (
    <StyledBackdrop
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </StyledBackdrop>
  );
};

const StyledModal = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 10px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  background: var(--bg);
  box-shadow: 6px 6px 25px rgba(42, 139, 242, 0.15),
    4px 4px 25px rgba(42, 139, 242, 0.05),
    10px 6px 25px rgba(42, 139, 242, 0.15);
`;

const SwitchContainer = styled.div`
  position: relative;
  top: -10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const SwitchLabel = styled.div`
  display: flex;
  justify-content: space-between;

  & p:nth-child(2) {
    margin: 10px;
    color: ${(props) => (props.flipped ? "#2A8BF2" : "black")};
    font-weight: ${(props) => (props.flipped ? "500" : "400")};
  }
  & p:nth-child(1) {
    margin: 10px;
    font-weight: ${(props) => (props.flipped ? "400" : "500")};
    color: ${(props) => (props.flipped ? "black" : "#2A8BF2")};
  }
`;

const dropin = {
  hidden: {
    y: "-100vh",
  },
  visible: {
    y: "0",
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

const rotate = {
  rotatein: {
    rotateY: 0,
    transition: {
      duration: 0.5,
      delay: 0.5,
      ease: "linear",
    },
  },
  rotateout: {
    rotateY: 90,
    transition: {
      ease: "linear",
      duration: 0.5,
    },
  },
  rotateout2: {
    rotateY: -90,
    transition: {
      ease: "linear",
      duration: 0.5,
    },
  },
};

const Form = styled.form`
  width: 100%;
  height: 100%;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Group = styled.fieldset`
  display: flex;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  margin-bottom: 10px;
`;
const Label = styled.p`
  font-size: 20px;
  color: black;
`;
const Input = styled.input`
  height: 60px;
  width: 100%;
  padding: 10px;
  border-radius: 16px;
  text-align: center;
  border: none;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  font-size: 20px;
  outline: none;
`;

const SubmitButton = styled(motion.button)`
  background: #ff3366;
  border-radius: 20px;
  color: white;
  padding: 10px;
  width: 100px;
  height: 40px;
  border: none;
  outline: none;
  box-shadow: none;
  cursor: pointer;
  font-weight: 500;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Modal = ({ handleClose }) => {
  const [roomname, setRoomname] = useState("");
  const [roomtype, setRoomtype] = useState("");
  const [roomid, setroomid] = useState("");
  const [flipmodal, setFlipmodal] = useState(false);
  const { globalstate } = useContext(context);
  const user = globalstate.user;
  const [message, setmessage] = useState("");
  const roomImage = `https://avatars.dicebear.com/api/adventurer/${Math.random()}.svg`;

  // add user to room and room to user.
  const joinRoombyId = async (roomid) => {
    const SubscribeToRoom = async (token, roomid) => {
      console.log(`sending ${token} subscribing to ${roomid}`);
      const data = {
        token: token,
        roomid: roomid,
      }
      // const url =
      //   "https://us-central1-chat-b7198.cloudfunctions.net/subscribeToTopic";
      const url = "http://localhost:5001/chat-b7198/us-central1/subscribeToTopic";
      const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data),
      });
      console.log(await response.json);
    };
    if (await validRoomid(roomid)) {
      setmessage("room created sucessfully");
      const userDocref = doc(db, "users", user.uid);
      const roomDocref = doc(db, "rooms", roomid);
      /**
       * Add roomid to user's doc.
       * 1. get current roomlist
       * 2. Check if roomlist exist.
       * 2. add new room to the room list
       */
      const snapshot = await getDoc(userDocref);
      const roomlist = snapshot.data()?.privateRooms;
      if (!roomlist) {
        updateDoc(userDocref, {
          privateRooms: [roomid],
        });
      } else {
        if (roomlist.includes(roomid)) return;
        roomlist.push(roomid);
        updateDoc(userDocref, {
          privateRooms: roomlist,
        });
      }

      /**
       * add current user to room's doc
       * 1. get current user list
       * 2. add current user to userlist
       */
      const roomsnapshot = await getDoc(roomDocref);
      if (roomsnapshot.data().users) {
        await updateDoc(roomDocref, {
          users: [...roomsnapshot.data().users, user.uid],
        });
      } else {
        await updateDoc(roomDocref, {
          users: [user.uid],
        });
      }
      /**
       * Subscribe to the room, so we can send notifications.
       */
      getToken(messaging, {
        vapidKey:
          "BLFRbbKh7i-skCjTBESy0m4xdv_644zN92do2g98YC0BUt-SBgYcj0hb2NFE584YDKAZChVS01AfgMsEpT6Xgs8",
      })
        .then(async (currentToken) => {
          //Subscribe messaging instance to topic.
          SubscribeToRoom(currentToken, roomid);
        })
        .catch((e) => {
          console.log("error while retrieving the token", e);
        });
    } else {
      setmessage("room doesn't exist");
    }
  };
  const HandleSubmit = async (e) => {
    e.preventDefault();
    const newroom = await addDoc(collection(db, "rooms"), {
      roomname: roomname,
      roomtype: roomtype,
      roomphotoURL: roomImage,
      roommessagecount: 0,
    });
    if (roomtype === "private") {
      await joinRoombyId(newroom.id);
    }
    handleClose();
  };

  const validRoomid = async (roomid) => {
    const snapshot = await getDoc(doc(db, "rooms", roomid));
    if (snapshot.exists()) {
      return true;
    }
    return false;
  };

  const Joinroom = async (e) => {
    e.preventDefault();
    joinRoombyId(roomid);
  };

  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        className="modal__wrapper"
        onClick={(e) => e.stopPropagation()}
        variants={dropin}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <SwitchContainer>
          <SwitchLabel flipped={flipmodal}>
            <p>Create room</p>
            <p>Join A room</p>
          </SwitchLabel>
          <Switch
            checked={flipmodal}
            onChange={(e) => setFlipmodal(e.target.checked)}
            inputProps={{ "aria-label": "controlled" }}
          />
        </SwitchContainer>
        <StyledModal
          onClick={(e) => e.stopPropagation()}
          variants={rotate}
          animate={flipmodal ? "rotateout" : "rotatein"}
        >
          <Form onSubmit={(e) => HandleSubmit(e)}>
            <Group>
              <TextField
                value={roomname}
                onChange={(e) => setRoomname(e.currentTarget.value)}
                id="filled-basic"
                fullWidth
                label="Roomname"
                variant="filled"
              />
            </Group>
            <Group>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Room Type</InputLabel>
                <Select
                  variant="filled"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={roomtype}
                  label="Age"
                  onChange={(e) => setRoomtype(e.target.value)}
                >
                  <MenuItem value="public">Public</MenuItem>
                  <MenuItem value="private">Private</MenuItem>
                </Select>
              </FormControl>
            </Group>
            <Group>
              <Label>Room Image:</Label>
            </Group>
            <Group>
              <SubmitButton
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
                type="submit"
              >
                Submit
              </SubmitButton>
            </Group>
          </Form>
        </StyledModal>
        <StyledModal
          onClick={(e) => e.stopPropagation()}
          variants={rotate}
          animate={!flipmodal ? "rotateout2" : "rotatein"}
          initial="rotateout2"
        >
          <Form onSubmit={(e) => Joinroom(e)}>
            <Group>
              <TextField
                value={roomid}
                onChange={(e) => setroomid(e.currentTarget.value)}
                id="filled-basic"
                fullWidth
                label="room id"
                variant="filled"
              />
            </Group>
            {message && (
              <Group>
                <p>{message}</p>
              </Group>
            )}
            <Group>
              <SubmitButton
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
                type="submit"
              >
                Submit
              </SubmitButton>
            </Group>
          </Form>
        </StyledModal>
      </motion.div>
    </Backdrop>
  );
};
