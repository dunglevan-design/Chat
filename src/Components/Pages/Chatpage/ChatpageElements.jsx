import styled from "styled-components";

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

