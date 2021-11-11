import styled from "styled-components";
import { Link } from "react-router-dom";
import { VscThreeBars } from "react-icons/vsc";
import { motion } from "framer-motion";
import { useContext, useRef } from "react";
import Icons from "../../images/svg-defs.svg";
//@ts-ignore
import anime from "animejs/lib/anime.es.js";
import { context } from "../../Globals/GlobalStateProvider";

export const SidebarContainer = styled(motion.nav)<{ isopen: boolean }>`
  position: fixed;
  display: flex;
  flex-direction: column;
  border-radius: 2rem;
  top: 0;
  left: 0;
  background: var(--bg-widget);
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
  color: var(--text-color-secondary);
  cursor: pointer;
  margin-right: 1rem;
`;

export const MenuLabel = styled(motion.label)`
  color: var(--text-color-secondary);
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
  color: var(--text-color-secondary);
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
  padding: 10px 10px 10px 7px;
  border: none;
  outline: none;
  border-radius: 10px;
  background-size: 500%;
  background-position: left;
  background-image: linear-gradient(92.68deg, white 50%, #2a8bf2 100%);
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
  margin-right: 1.2rem;
  width: 25px;
  height: 25px;
  color: var(--text-color-primary);
  fill: var(--text-color-primary);
`;
export const Label = styled(motion.label)`
  transition: color 0.5s ease-in;
  color: var(--text-color-secondary);
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
`;

export const Icon = ({ name }: { name: string }) => {
  return (
    <Iconsvg className={`icon icon-${name}`}>
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
        <Label
          className="label"
          variants={labelvariants}
          animate={full ? `open` : `closed`}
        >
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
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
    >
      <SidebarButton full={isopen} to={to} label={label} icon={icon} />
    </SidebarMenuitem>
  );
};

export const ButtonContainer = styled(motion.div)`
  width: 70%;
  position: absolute;
  bottom: 10%;
  padding-left: 10px;
`;

const Darklightbutton = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  width: 173px;
  padding: 10px 10px 10px 5px;
  border: none;
  outline: none;
  background: none;
`;

export const DarklightButton = ({ open }: { open: boolean }) => {
  const { dispatch, globalstate } = useContext(context);
  const currentTheme = globalstate.currentTheme;
  const isDark = currentTheme === "DARK";
  const Sunpath =
    "M58 29C58 45.0163 45.0163 58 29 58C12.9837 58 0 45.0163 0 29C0 12.9837 12.9837 0 29 0C45.0163 0 58 12.9837 58 29Z";
  const Moonpath =
    "M14.5 29C14.5 45.0163 29 58 29 58C12.9837 58 0 45.0163 0 29C0 12.9837 12.9837 0 29 0C29 0 14.5 12.9837 14.5 29Z";

  const labelvariants = {
    initial: { opacity: 0 },
    open: { opacity: 1, transition: { duration: 0.4 } },
    closed: { opacity: 0, transition: { duration: 0.4 } },
  };

  const Switchtheme = () => {
    var tl = anime.timeline({
      easing: "easeOutExpo",
      duration: 750,
    });

    tl.add({
      targets: "#Sun",
      d: [{ value: isDark ? Sunpath : Moonpath }],
    }).add(
      {
        targets: ".darklightsvg",
        rotate: isDark ? -320 : 320,
      },
      "-=350"
    );

    dispatch({
      type: "SWITCH_THEME",
      theme: isDark ? "LIGHT" : "DARK",
    });

    const root = document.querySelector("#root");
    isDark
      ? root.classList.replace("dark", "light")
      : root.classList.replace("light", "dark");
  };
  return (
    <Darklightbutton onClick={() => Switchtheme()}>
      <svg
        className="darklightsvg"
        width="58"
        height="58"
        viewBox="0 0 58 58"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          id="Sun"
          d="M58 29C58 45.0163 45.0163 58 29 58C12.9837 58 0 45.0163 0 29C0 12.9837 12.9837 0 29 0C45.0163 0 58 12.9837 58 29Z"
          fill="#FFD600"
        />
      </svg>
      <Label variants={labelvariants} animate={open ? `open` : `closed`}>
        THEME
      </Label>
    </Darklightbutton>
  );
};

// const Notificationbutton = styled.button`
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   width: 173px;
//   padding: 10px 10px 10px 5px;
//   border: none;
//   outline: none;
//   background: none;
// `;

// export const NotificationButton = ({ open }: { open: boolean }) => {
//   const labelvariants = {
//     initial: { opacity: 0 },
//     open: { opacity: 1, transition: { duration: 0.4 } },
//     closed: { opacity: 0, transition: { duration: 0.4 } },
//   };
//   return (
//     <Notificationbutton>
//       <svg
//         className="darklightsvg"
//         width="58"
//         height="58"
//         viewBox="0 0 58 58"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <path
//           id="Sun"
//           d="M58 29C58 45.0163 45.0163 58 29 58C12.9837 58 0 45.0163 0 29C0 12.9837 12.9837 0 29 0C45.0163 0 58 12.9837 58 29Z"
//           fill="#FFD600"
//         />
//       </svg>
//       <Label variants={labelvariants} animate={open ? `open` : `closed`}>
//         THEME
//       </Label>
//     </Notificationbutton>
//   );
// };
