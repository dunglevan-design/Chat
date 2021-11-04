import styled from "styled-components";
import { Link } from "react-router-dom";
import { VscThreeBars } from "react-icons/vsc";
import { motion } from "framer-motion";
import { useRef } from "react";
import Icons from "../../images/svg-defs.svg";

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
  z-index: 9;
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
  background-size: 500%;
  background-position: left;
  background-image: linear-gradient(92.68deg, white 50%, #2A8BF2 100%);
  transition: background-position 1s ease-out;
`;

export const Sidebarbutton = styled(Link)`
  cursor: pointer;
  display: flex;
  align-items: center;
  width: 173px;
`;
export const Iconsvg = styled.svg`
  transition: fill 0.5s ease-in;
  margin-right: 1rem;
  width: 18px;
  height: 18px;
  color: black;
  fill: black;
`;
export const Label = styled(motion.label)`
  transition: color 0.5s ease-in;
  color: black;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
`;

export const Icon = ({ name }: { name: string }) => {
  return (
    <Iconsvg
      className={`icon icon-${name}`}
    >
      <use xlinkHref={`${Icons}#icon-${name}`} />
    </Iconsvg>
  );
};
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
      <Sidebarbutton to={to}>
        <Icon name={icon}></Icon>
        <Label className = "label" variants={labelvariants} animate={full ? `open` : `closed`}>
          {label}
        </Label>
      </Sidebarbutton>
    </>
  );
};

export const SidebarMenuItem = ({
  isopen,
  to,
  label,
  icon,
}: {
  isopen: boolean;
  to: string;
  label: string;
  icon: string;
}) => {
  const CurrentItem = useRef(null);
  const ToggleActive = () => {
    const ActiveItem = document.querySelector(".sidebar__menu__item.active");
    if (ActiveItem === CurrentItem.current) {
      return;
    }
    CurrentItem.current.classList.add("active");
    ActiveItem?.classList?.remove("active");
  };

  const buttonanimation = {
    initial: { width: "38px" },
    open: { width: "183px", transition: { duration: 0.6 } },
    closed: { width: "37px", transition: { duration: 0.6 } },
  };

  return (
    <SidebarMenuitem
      ref={CurrentItem}
      className="sidebar__menu__item"
      variants={buttonanimation}
      animate={isopen ? "open" : "closed"}
      onClick={ToggleActive}
      whileHover={{scale: 1.05}}
      whileTap={{scale: 0.9}}
    >
      <SidebarButton full={isopen} to={to} label={label} icon={icon} />
    </SidebarMenuitem>
  );
};

export const LogoutContainer = styled(motion.div)`
  width: 70%;
  position: absolute;
  bottom: 10%;
  padding-left: 10px;
`;
