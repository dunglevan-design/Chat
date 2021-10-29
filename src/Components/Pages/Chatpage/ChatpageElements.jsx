import styled from "styled-components";
import { motion } from "framer-motion";

export const Container = styled.div`
  display: flex;
  width: calc(100% - 100px);
  position: absolute;
  left: 100px;
  top: 80px;
  height: calc(100% - 75px);
  padding: 0 10px;
  @media screen and (max-width: 768px) {
    width: 100%;
    left: 0;
  }
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
 position: relative;
 width: 100%;
 display: flex;
 height: 100%;
 
`;

export const Left = styled.div`
  display: flex;
  flex: 1 1 380px;
  background: white;
  flex-direction: column;
  padding: 10px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  border-radius: 16px;
  @media screen and (max-width: 600px) {
    width: 100%;
    position: absolute;
  }
`;
export const Right = styled.div`
  display: flex;
  flex: 1 1 320px;
  background: white;

  @media screen and (max-width: 600px) {
    width: 100%;
    position: absolute;
    left: 100vw;
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


