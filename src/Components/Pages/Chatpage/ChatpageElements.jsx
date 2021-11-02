import styled from "styled-components";
import { motion } from "framer-motion";
import {FormControl, Select,  InputLabel, MenuItem, TextField } from "@mui/material";
import "./Chatpage.css";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebase";

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
  background: white;
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
  background: white;
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

export const Title = styled.h1``;

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
  width: clamp(50%, 700px, 90%);
  height: min(70%, 500px);

  padding: 10px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  background: linear-gradient(180deg, #f3f3fb 0%, #fdfbfd 100%);
  box-shadow: 6px 6px 25px rgba(42, 139, 242, 0.15),
    4px 4px 25px rgba(42, 139, 242, 0.05),
    10px 6px 25px rgba(42, 139, 242, 0.15);
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
  const roomImage = "https://avatars.dicebear.com/api/adventurer/your-custom-seed.svg";

  const HandleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "rooms"), {
      roomname: roomname,
      roomtype: roomtype,
      roomphotoURL: roomImage,
      roommessagecount: 0,
    });
    handleClose();
  }

  return (
    <Backdrop onClick={handleClose}>
      <StyledModal
        onClick={(e) => e.stopPropagation()}
        variants={dropin}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <Form onSubmit={(e) => HandleSubmit(e)}>
          <Group>
            <TextField value = {roomname} onChange={(e) => setRoomname(e.currentTarget.value)} id="filled-basic"  fullWidth label="Roomname" variant="filled" />
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
    </Backdrop>
  );
};
