import { useContext, useState, useEffect } from "react";
import { context } from "../../Globals/GlobalStateProvider";
import {
  SidebarAvatarContainer,
  SidebarContainer,
  SidebarImage,
  SidebarMenu,
  SidebarMenuItem,
  SidebarUserName,
  SidebarButton,
  MenuIcon,
  MenuIconButton,
  LogoutContainer,
  MenuLabel,
} from "./SidebarElements";


type SidebarProps = {
  isopen: boolean;
  toggle: () => void;
};
const Sidebar = ({ isopen, toggle }: SidebarProps) => {
  const { dispatch, globalstate } = useContext(context);
  const [active, setActive] = useState(false);

  const variants = {
    initial: {
      width: 50,
      height: 50,
    },
    open: {
      width: 250,
      height: "100%",
      transition: { width: { duration: 0.6 }, height: { delay: 0.6, duration: 0.6 } },
    },
    closed: {
      width: 100,
      height: "100%",
      transition: { width: { duration: 0.6 } },
    },
  };

  const labelvariants = {
    initial: { opacity: 0 },
    open: { opacity: 1, transition: { duration: 0.6 } },
    closed: { opacity: 0, transition: { duration: 0.6 } },
  };

  const usernameanimation = {
    initial: { opacity: 0 },
    open: { opacity: 1, transition: { duration: 0.6, delay: 0.8 } },
    closed: { opacity: 0, transition: { duration: 0.3 } },
  };

  return (
    <>
      <SidebarContainer
        animate={isopen ? `open` : `closed`}
        initial={`initial`}
        variants={variants}
        isopen={isopen}
      >
        <MenuIconButton
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          onClick={toggle}
        >
          <MenuIcon></MenuIcon>
          {/* <AnimatePresence initial= {false} exitBeforeEnter = {true} > */}

          <MenuLabel
            variants={labelvariants}
            animate={isopen ? `open` : `closed`}
          >
            Chat App
          </MenuLabel>
          {/* </AnimatePresence> */}
        </MenuIconButton>
        <SidebarAvatarContainer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.4 }}
        >
          <SidebarImage full={isopen} src={globalstate.user.photoURL} />
          <SidebarUserName
            variants={usernameanimation}
            animate={isopen ? `open` : `closed`}
          >
            {globalstate.user.displayName}
          </SidebarUserName>
        </SidebarAvatarContainer>
        <SidebarMenu
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.4 }}
        >
          <SidebarMenuItem
            isopen={isopen}
            to="/gettingstarted"
            label="HOME"
            icon="play"
          ></SidebarMenuItem>
          <SidebarMenuItem
            isopen={isopen}
            to="/chat"
            label="CHAT"
            icon="chat"
          ></SidebarMenuItem>
          <SidebarMenuItem
            isopen={isopen}
            to="/notifications"
            label="NOTIFICATIONS"
            icon="bell"
          ></SidebarMenuItem>
          <SidebarMenuItem
            isopen={isopen}
            to="/profile"
            label="PROFILE"
            icon="person"
          ></SidebarMenuItem>
        </SidebarMenu>
        <LogoutContainer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.4 }}
        >
          <SidebarButton
            full={isopen}
            to="/logout"
            label="LOG OUT"
            icon="power"
          />
        </LogoutContainer>
      </SidebarContainer>
    </>
  );
};

export default Sidebar;
