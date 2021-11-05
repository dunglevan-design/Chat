import styled from "styled-components";
import {motion} from "framer-motion"


export const Container = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
`;
export const StyledVideoChatRoom = styled(motion.div)`
  position: relative;
  top: 0;
  left: 0;
  width: clamp(60%, 720px, 90%);
  height: 400px;
  z-index: 100;
  background: #000000e1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px;
  flex-wrap: wrap;
  border-radius: 32px;
`;

export const Hangup = styled(motion.button)`
  position: absolute;
  top: 10px;
  right: 20px;
  border: none;
  background: none;
  cursor: pointer;
`;
export const Hangupsvg = styled.svg`
  fill: #ff3366;
  width: 24px;
  height: 24px;
  
`;
export const Video = styled.video`
  width: 50%;
  height: 300px;
  background: #2c3e50;
  border-radius: 16px;
  object-fit: scale-down;
`;
