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
  width: clamp(50%, 600px, 90%);
  height: 300px;
  z-index: 100;
  background: #000000e1;
`;

export const Hangup = styled.button`
  position: absolute;
  left: 50%;
  top: 10px;
`;

export const Video = styled.video`
  width: 300px;
  height: 300px;
  background: #2c3e50;
`;
