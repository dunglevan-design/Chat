import styled from "styled-components";
import Icons from "../../images/svg-defs.svg";
import { motion } from "framer-motion";
import FacebookLogo from "../../images/Facebook.svg";
import GoogleLogo from "../../images/Google.svg";
import GuestLogo from "../../images/Guest.svg";

export const LoginBoard = styled.div`
  width: clamp(50%, 700px, 90%);
  height: 500px;
  background: white;
  position: absolute;
  padding: 32px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const LoginLogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoginLogoTitle = styled.h1`
  font-size: 28px;
  color: var(--text-primary);
  margin-right: 10px;
`;

export const LoginLogo = styled.svg`
  width: 24px;
  height: 24px;
  fill: black;
`;

export const Loginlogo = () => {
  const name = "chatlogo";
  return (
    <LoginLogoContainer>
      <LoginLogoTitle>Chat</LoginLogoTitle>
      <LoginLogo
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18 0H2C0.9 0 0.00999999 0.9 0.00999999 2L0 20L4 16H18C19.1 16 20 15.1 20 14V2C20 0.9 19.1 0 18 0ZM4 7H16V9H4V7ZM12 12H4V10H12V12ZM16 6H4V4H16V6Z"
          fill="black"
        />
      </LoginLogo>
    </LoginLogoContainer>
  );
};

export const LoginButton = styled(motion.button)`
  outline: none;
  border: none;
  background: linear-gradient(92.68deg, #7cb8f7 0%, #2a8bf2 100%);
  box-shadow: 6px 6px 25px rgba(42, 139, 242, 0.15),
    4px 4px 25px rgba(42, 139, 242, 0.05),
    10px 6px 25px rgba(42, 139, 242, 0.15);
  border-radius: 6px;
  padding: 10px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: clamp(30%, 400px, 80%);
  margin-bottom: 16px;
  height: 60px;
  cursor: pointer;
`;

export const ProviderLogoContainer = styled.div`
  padding: 6px;
  background: white;
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ProviderLogo = styled.img`
  width: 24px;
  height: 24px;
`;

export const Providerlogo = ({ name }: { name: string }) => {
  let logo = null;
  if (name === "Google") {
    logo = GoogleLogo;
  } else if (name === "Facebook") {
    logo = FacebookLogo;
  } else if (name === "Guest") {
    logo = GuestLogo;
  }
  return (
    <ProviderLogoContainer>
      <ProviderLogo src={logo}></ProviderLogo>
    </ProviderLogoContainer>
  );
};

export const ErrorMessageLogo = styled.img`
  width: 100px;
  height: 100px;
  margin-bottom: 32px;
`;
export const ErrorMessageContainer = styled.div`
  width: clamp(60%, 500px, 90%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ErrorMessage = styled.h1`
  text-align: center;
  margin-bottom: 10px;
`;

export const Message = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

export const ReportButton = styled(motion.button)`
  background: rgba(255, 51, 102, 0.25);
  border-radius: 20px;
  color: #FF3366;
  font-size: 20px;
  font-weight: 600;
  padding: 10px;
  border: none;
  cursor: pointer;
`;
