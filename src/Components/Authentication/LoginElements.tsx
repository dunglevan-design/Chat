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
  box-shadow: rgba(0, 0, 0, 0.35) 0px 3px 10px;
  border-radius: 16px;
`;

export const LoginLogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
`;

export const LoginLogoTitle = styled.h1`
  font-size: 36px;
  color: var(--text-primary);
  margin-right: 10px;
`;

export const LoginLogo = styled(motion.svg)`
  width: 48px;
  height: 48px;
  fill: black;
`;

export const Loginlogo = () => {
  const name = "chatlogo";
  return (
    <LoginLogoContainer>
      <LoginLogoTitle>Chat</LoginLogoTitle>
      <LoginLogo
        viewBox="0 0 20 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 0C4.5 0 0 3.58 0 8C0.05 10.15 1.06 12.17 2.75 13.5C2.75 14.1 2.33 15.67 0 18C2.37 17.89 4.64 17 6.47 15.5C7.61 15.83 8.81 16 10 16C15.5 16 20 12.42 20 8C20 3.58 15.5 0 10 0ZM10 8C5.58 8 13.5 11.31 13.5 8C13.5 4.69 5.58 11 10 11C14.42 11 7 4.69 7 8C7 11.31 14.42 8 10 8Z"
          fill="#2A8BF2"
        />
        <motion.circle cx="7" cy="8" r="1" fill="white" initial = {{y: -10}} animate = {{y:0}}/>
        <motion.circle cx="10" cy="8" r="1" fill="white" initial = {{y: -10}} animate = {{y:0}} transition={{delay: 0.1}}/>
        <motion.circle cx="13" cy="8" r="1" fill="white" initial = {{y: -10}} animate = {{y:0}} transition={{delay: 0.2}}/>
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
  color: #ff3366;
  font-size: 20px;
  font-weight: 600;
  padding: 10px;
  border: none;
  cursor: pointer;
`;
