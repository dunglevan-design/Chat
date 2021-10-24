import styled from "styled-components";
import { Link } from "react-router-dom";
import { VscThreeBars } from "react-icons/vsc";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
export const SidebarContainer = styled(motion.nav)<{ isopen: boolean }>`
  position: fixed;
  display: flex;
  flex-direction: column;
  border-radius: 2rem;
  top: 0;
  left: 0;
  background-color: white;
  padding-left: 30px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  overflow: hidden;
`;

export const MenuIconButton = styled(motion.button)`
  background: none;
  border: none;
  outline: none;
  width: 100%;
  display: flex;
  position: absolute;
  top: 25px;
  align-items: center;
  width: 200px;
  padding-left: 8px;
`;
export const MenuIcon = styled(VscThreeBars)`
  width: 22px;
  height: 22px;
  color: #707c97;
  cursor: pointer;
  margin-right: 1rem;
`;

export const MenuLabel = styled(motion.label)`
  color: #707c97;
  cursor: pointer;
  font-size: 20px;
  font-weight: 600;
`;

export const SidebarAvatarContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  top: 15%;
  left: 50%;
  transform: translateX(-50%);
`;
export const SidebarImage = styled.img<{ full: boolean }>`
  width: ${({ full }) => (full ? "4.5rem" : "2rem")};
  height: ${({ full }) => (full ? "4.5rem" : "2rem")};
  margin-bottom: 1rem;
  clip-path: circle(50% at 50% 50%);
  transition: all 1s ease-in;
`;
export const SidebarUserName = styled(motion.h3)`
  font-size: 20px;
  font-weight: 500;
`;
export const SidebarMenu = styled(motion.ul)`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 35%;
  width: 100%;
`;
export const SidebarMenuitem = styled(motion.li)`
  margin-bottom: 1rem;
  position: relative;
  padding: 10px;
  border: none;
  outline: none;
  border-radius: 10px;
  transition: background-color 0.2s ease-in;
`;

export const Sidebarbutton = styled(Link)<{ full: boolean }>`
  transition: all 1s ease-in;
  cursor: pointer;
  display: flex;
  align-items: center;
  width: 173px;
`;
export const Icon = styled.img<{ full: boolean }>`
  margin-right: 1rem;
  width: 18px;
  height: 18px;
  color: #707c97;
`;
export const Label = styled(motion.label)`
  color: #707c97;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
`;
export const SidebarButton = ({
  full,
  to,
  label,
  icon,
}: {
  full?: boolean;
  to: string;
  label: string;
  icon: string;
}) => {
  const labelvariants = {
    initial: { opacity: 0 },
    open: { opacity: 1, transition: { duration: 0.4 } },
    closed: { opacity: 0, transition: { duration: 0.4 } },
  };

  return (
    <>
      <Sidebarbutton full={full} to={to}>
        <Icon full={full} src={icon}></Icon>
        <Label variants={labelvariants} animate={full ? `open` : `closed`}>
          {label}
        </Label>
      </Sidebarbutton>
    </>
  );
};

export const SidebarMenuItem = ({ isopen, to, label, icon }: { isopen: boolean, to: string, label: string, icon: string }) => {
  const CurrentItem = useRef(null);
  const ToggleActive = () => {
    const ActiveItem = document.querySelector(".sidebar__menu__item.active");
    console.log(ActiveItem);
    if(ActiveItem === CurrentItem.current) {
      console.log("equals");
      return;
    }
    CurrentItem.current.classList.add("active");
    ActiveItem?.classList?.remove("active");
  }
  
  const buttonanimation = {
    initial: { width: "38px" },
    open: { width: "183px" , transition: {duration: 0.6}},
    closed: { width: "37px", transition: {duration: 0.6} },
  };

  return (
    <SidebarMenuitem ref = {CurrentItem} className = "sidebar__menu__item" variants={buttonanimation} animate = {isopen ? "open" : "closed"} onClick={ToggleActive}>
      <SidebarButton
        full={isopen}
        to={to}
        label={label}
        icon={icon}
      />
    </SidebarMenuitem>
  );
};

export const LogoutContainer = styled(motion.div)`
  width: 70%;
  position: absolute;
  bottom: 10%;
  padding-left: 10px;
`;
