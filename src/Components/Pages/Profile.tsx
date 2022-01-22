import React, { useContext, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { context } from "../../Globals/GlobalStateProvider";
import { Button, TextField } from "@mui/material";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

const userInfo = {
  name: "Jun",
  photoURL:
    "data:image/svg+xml;utf8,%3Csvg%20xmlns%3Adc%3D%22http%3A%2F%2Fpurl.org%2Fdc%2Felements%2F1.1%2F%22%20xmlns%3Acc%3D%22http%3A%2F%2Fcreativecommons.org%2Fns%23%22%20xmlns%3Ardf%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%22%20xmlns%3Asvg%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20360%20360%22%20fill%3D%22none%22%3E%3Cmetadata%3E%3Crdf%3ARDF%3E%3Ccc%3AWork%3E%3Cdc%3Aformat%3Eimage%2Fsvg%2Bxml%3C%2Fdc%3Aformat%3E%3Cdc%3Atype%20rdf%3Aresource%3D%22http%3A%2F%2Fpurl.org%2Fdc%2Fdcmitype%2FStillImage%22%2F%3E%3Cdc%3Atitle%3EAvatar%20Illustration%20System%3C%2Fdc%3Atitle%3E%3Cdc%3Acreator%3E%3Ccc%3AAgent%3E%3Cdc%3Atitle%3EMicah%20Lanier%3C%2Fdc%3Atitle%3E%3C%2Fcc%3AAgent%3E%3C%2Fdc%3Acreator%3E%3Cdc%3Asource%3Ehttps%3A%2F%2Fwww.figma.com%2Fcommunity%2Ffile%2F829741575478342595%3C%2Fdc%3Asource%3E%3Ccc%3Alicense%20rdf%3Aresource%3D%22https%3A%2F%2Fcreativecommons.org%2Flicenses%2Fby%2F4.0%2F%22%2F%3E%3C%2Fcc%3AWork%3E%3Ccc%3ALicense%20rdf%3Aabout%3D%22https%3A%2F%2Fcreativecommons.org%2Flicenses%2Fby%2F4.0%2F%22%3E%3Ccc%3Apermits%20rdf%3Aresource%3D%22https%3A%2F%2Fcreativecommons.org%2Fns%23Reproduction%22%2F%3E%3Ccc%3Apermits%20rdf%3Aresource%3D%22https%3A%2F%2Fcreativecommons.org%2Fns%23Distribution%22%2F%3E%3Ccc%3Apermits%20rdf%3Aresource%3D%22https%3A%2F%2Fcreativecommons.org%2Fns%23DerivativeWorks%22%2F%3E%3Ccc%3Arequires%20rdf%3Aresource%3D%22https%3A%2F%2Fcreativecommons.org%2Fns%23Notice%22%2F%3E%3Ccc%3Arequires%20rdf%3Aresource%3D%22https%3A%2F%2Fcreativecommons.org%2Fns%23Attribution%22%2F%3E%3C%2Fcc%3ALicense%3E%3C%2Frdf%3ARDF%3E%3C%2Fmetadata%3E%3Cmask%20id%3D%22avatarsRadiusMask%22%3E%3Crect%20width%3D%22360%22%20height%3D%22360%22%20rx%3D%220%22%20ry%3D%220%22%20x%3D%220%22%20y%3D%220%22%20fill%3D%22%23fff%22%2F%3E%3C%2Fmask%3E%3Cg%20mask%3D%22url(%23avatarsRadiusMask)%22%3E%3Cg%20transform%3D%22translate(80%2023)%22%3E%3Cpath%20d%3D%22M154%20319.5c-14.4-20-25.667-58.666-27-78L58.5%20212%2030%20319.5h124Z%22%20fill%3D%22rgba(172%2C%20102%2C%2081%2C%201)%22%20stroke%3D%22%23000%22%20stroke-width%3D%224%22%2F%3E%3Cmask%20id%3D%22baseStandard-a%22%20style%3D%22mask-type%3Aalpha%22%20maskUnits%3D%22userSpaceOnUse%22%20x%3D%2230%22%20y%3D%22212%22%20width%3D%22124%22%20height%3D%22118%22%3E%3Cpath%20d%3D%22M154%20329.5c-14.4-20-25.667-68.666-27-88L58.5%20212%2030%20329.5h124Z%22%20fill%3D%22rgba(172%2C%20102%2C%2081%2C%201)%22%2F%3E%3C%2Fmask%3E%3Cg%20mask%3D%22url(%23baseStandard-a)%22%3E%3Cellipse%20cx%3D%22124%22%20cy%3D%22210%22%20rx%3D%2259%22%20ry%3D%2254%22%20fill%3D%22%23000%22%20style%3D%22mix-blend-mode%3Amultiply%22%2F%3E%3C%2Fg%3E%3Cpath%20d%3D%22m181.939%20151.374.002.009.093.389.144.654c8.851%2040.206-16.109%2080.258-56.315%2089.89-40.205%209.633-80.606-14.759-90.935-54.61l-.19-.733-16.735-69.844-.067-.289C8.512%2076.334%2033.544%2035.757%2074.048%2026.053c40.504-9.704%2081.206%2015.123%2091.161%2055.501l.051.208.02.083.001.005.048.198.047.199.002.004%2016.396%2068.437.003.009.081.338.081.339Z%22%20fill%3D%22rgba(172%2C%20102%2C%2081%2C%201)%22%20stroke%3D%22%23000%22%20stroke-width%3D%224%22%2F%3E%3Cg%3E%3Cg%20transform%3D%22translate(34%20102.3)%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3Cg%20transform%3D%22translate(170%20183)%22%3E%3Cpath%20d%3D%22M13%2046c1.715-7.957%208.07-24.767%2019.77-28.348%2011.7-3.58%2017.695%208.455%2019.23%2014.92%22%20stroke%3D%22rgba(0%2C%200%2C%200%2C%201)%22%20stroke-width%3D%224%22%2F%3E%3C%2Fg%3E%3Cg%20transform%3D%22translate(110%20102)%22%3E%3Cg%20stroke%3D%22rgba(0%2C%200%2C%200%2C%201)%22%20stroke-width%3D%224%22%20stroke-linecap%3D%22round%22%3E%3Cpath%20d%3D%22M27%2026.5c6.167%202.5%2021.1%203%2031.5-15M94%204c5.167%205.333%2018.1%2012.8%2028.5%200%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3Cg%20transform%3D%22translate(49%2011)%22%3E%3Cellipse%20cx%3D%22147.854%22%20cy%3D%2258.18%22%20rx%3D%226.858%22%20ry%3D%2218.439%22%20transform%3D%22rotate(117%20147.854%2058.18)%22%20fill%3D%22%23FCFDFF%22%2F%3E%3C%2Fg%3E%3Cg%20transform%3D%22translate(142%20119)%22%3E%3Ccircle%20cx%3D%2215.24%22%20cy%3D%2220.239%22%20r%3D%2212%22%20transform%3D%22rotate(-6.276%2015.24%2020.24)%22%20fill%3D%22rgba(255%2C%20255%2C%20255%2C%201)%22%2F%3E%3Cellipse%20cx%3D%2216.53%22%20cy%3D%2229.402%22%20rx%3D%229%22%20ry%3D%2213.5%22%20transform%3D%22rotate(-6.776%2016.53%2029.402)%22%20fill%3D%22%23000%22%2F%3E%3Ccircle%20cx%3D%2279.019%22%20cy%3D%2211.611%22%20r%3D%2212%22%20transform%3D%22rotate(-6.276%2079.02%2011.61)%22%20fill%3D%22rgba(255%2C%20255%2C%20255%2C%201)%22%2F%3E%3Cellipse%20cx%3D%2280.531%22%20cy%3D%2219.402%22%20rx%3D%229%22%20ry%3D%2213.5%22%20transform%3D%22rotate(-6.276%2080.531%2019.402)%22%20fill%3D%22%23000%22%2F%3E%3Cg%3E%3Cg%20transform%3D%22translate(-40%20-8)%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3Cg%20transform%3D%22rotate(-8%201149.438%20-1186.916)%22%3E%3Cpath%20d%3D%22M12.307%2012.34c5.446-1.24%2014.377.62%2012.417%2010.543-1.743%208.82-11.11%209.303-13.724%206.822%22%20stroke%3D%22%23000%22%20stroke-width%3D%224%22%2F%3E%3C%2Fg%3E%3Cg%20transform%3D%22translate(84%20154)%22%3E%3Cpath%20d%3D%22M30.5%206.176A23.778%2023.778%200%200%200%2023.08%205c-10.493%200-19%206.5-18%2018.5%201.042%2012.5%208.507%2017%2019%2017%201.168%200%202.31-.102%203.42-.299%201.21-.214%202.381-.54%203.5-.966%22%20stroke%3D%22%23000%22%20stroke-width%3D%228%22%2F%3E%3Cpath%20d%3D%22M31.5%2039.036a19.382%2019.382%200%200%201-7.42%201.464c-10.493%200-17.958-4.5-19-17-1-12%207.507-18.5%2018-18.5%203.138%200%206.187.606%208.92%201.73l-.5%2032.306Z%22%20fill%3D%22rgba(172%2C%20102%2C%2081%2C%201)%22%2F%3E%3Cpath%20d%3D%22M27.5%2013.5c-4-1.833-12.8-2.8-16%208%22%20stroke%3D%22%23000%22%20stroke-width%3D%224%22%2F%3E%3Cpath%20d%3D%22M17%2014c2.167%201.833%206.3%207.5%205.5%2015.5%22%20stroke%3D%22%23000%22%20stroke-width%3D%224%22%2F%3E%3Cg%20transform%3D%22translate(3%2035)%22%3E%3Cpath%20d%3D%22M24%200c13.255%200%2024%2010.745%2024%2024S37.255%2048%2024%2048%200%2037.255%200%2024c0-6.391%203.5-11.5%206.572-16.5L7.5%206%22%20stroke%3D%22rgba(244%2C%20209%2C%2080%2C%201)%22%20stroke-width%3D%224%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3Cg%20transform%3D%22translate(53%20272)%22%3E%3Cg%20stroke%3D%22%23000%22%20stroke-width%3D%224%22%3E%3Cpath%20d%3D%22M260.694%2091h-273.32c16.3-29.342%2039.484-48.018%2077.07-56.588C80.459%2030.76%2099.114%2028.939%20121%2028.939c9.456%200%2016.814%201.443%2023.796%203.346%202.587.705%205.187%201.496%207.847%202.304%204.402%201.337%208.968%202.725%2013.909%203.86l.14.032.144.012C212.961%2042.297%20240.62%2062.785%20260.694%2091Z%22%20fill%3D%22rgba(255%2C%20237%2C%20239%2C%201)%22%2F%3E%3Cpath%20d%3D%22m52.93%2036.58%209.154-19.596c.218-.468.762-.691%201.249-.519%2037.926%2013.425%2072.429%2012.48%20104.403%203.58.403-.113.833.036%201.079.373l13.932%2019.052c.383.524.188%201.262-.416%201.5-33.607%2013.196-96.668%2010.953-128.916-3.066a.978.978%200%200%201-.484-1.324Z%22%20fill%3D%22rgba(255%2C%20237%2C%20239%2C%201)%22%2F%3E%3Cpath%20opacity%3D%22.75%22%20d%3D%22m52.93%2036.58%209.154-19.596c.218-.468.762-.691%201.249-.519%2037.926%2013.425%2072.429%2012.48%20104.403%203.58.403-.113.833.036%201.079.373l13.932%2019.052c.383.524.188%201.262-.416%201.5-33.607%2013.196-96.668%2010.953-128.916-3.066a.978.978%200%200%201-.484-1.324Z%22%20fill%3D%22%23fff%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E",
};

const avatars = [
  "https://avatars.dicebear.com/api/adventurer/1.svg",
  "https://avatars.dicebear.com/api/adventurer/2.svg",
  "https://avatars.dicebear.com/api/adventurer/3.svg",
  "https://avatars.dicebear.com/api/adventurer/4.svg",
  "https://avatars.dicebear.com/api/adventurer/5.svg",
  "https://avatars.dicebear.com/api/adventurer/6.svg",
  "https://avatars.dicebear.com/api/adventurer/7.svg",
  "https://avatars.dicebear.com/api/adventurer/8.svg",
  "https://avatars.dicebear.com/api/adventurer/9.svg",
  "https://avatars.dicebear.com/api/adventurer/10.svg",
  "https://avatars.dicebear.com/api/micah/1.svg",
  "https://avatars.dicebear.com/api/micah/2.svg",
  "https://avatars.dicebear.com/api/micah/3.svg",
  "https://avatars.dicebear.com/api/micah/4.svg",
  "https://avatars.dicebear.com/api/micah/5.svg",
  "https://avatars.dicebear.com/api/micah/6.svg",
  "https://avatars.dicebear.com/api/micah/7.svg",
  "https://avatars.dicebear.com/api/micah/8.svg",
  "https://avatars.dicebear.com/api/micah/9.svg",
  "https://avatars.dicebear.com/api/micah/10.svg",
];


const Container = styled.div`
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
  flex-direction: column;
`;

const StyledImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 100%;
  margin-bottom: 16px;
`;

const Content = styled.div`
  display: flex;
  width: clamp(60%, 500px, 90%);

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 40%;
`;

const StyledH1 = styled(motion.div)`
  color: var(--text-color-primary);
  cursor: pointer;
`;

const Right = styled.div`
  display: flex;
  flex: 60%;
  flex-wrap: wrap;
`;

const StyledDiv = styled(motion.div)`
  width: 50px;
  height: 50px;
  border-radius: 100%;
  cursor: pointer;
  margin: 5px;
`;

const StyledSelectable = styled.img`
  width: 100%;
  height: 100%;
`;

export const SavedButton = styled(motion.button)`
  background: rgba(255, 51, 102, 0.25);
  border-radius: 20px;
  color: #ff3366;
  font-size: 20px;
  font-weight: 600;
  padding: 10px;
  border: none;
  cursor: pointer;
  margin-top: 48px;
`;

const Profilepage = () => {
  const { globalstate } = useContext(context);
  const { dispatch } = useContext(context);

  const user = globalstate.user;

  const [currentAvatar, setCurrentAvatar] = useState(user.photoURL);
  const [currentName, setCurrentName] = useState(user.displayName);
  const [editing, setEditing] = useState(false);
  function changeAvatar(e) {
    setCurrentAvatar(e.currentTarget.children[0].currentSrc);
  }

  async function savetoFirebase() {
      setEditing(false);
      const userRef = doc(db, "users", user.uid);
      dispatch({
          type: "SET_USER",
          user: {
              ...user,
              displayName: currentName,
              photoURL: currentAvatar,
          }
      })
      setDoc(userRef, {
          name: currentName,
          photoURL: currentAvatar,
      });
      
  }
  return (
    <Container>
      <Content>
        <Left>
          <StyledImage src={currentAvatar}></StyledImage>
          {!editing ? (
            <StyledH1
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setEditing(true)}
            >
              <h3>{currentName}</h3>
            </StyledH1>
          ) : (
            <TextField id="username" variant="filled" value={currentName} onChange={(e) => setCurrentName(e.currentTarget.value)}/>
          )}
        </Left>
        <Right>
          {avatars.map((avatar, index) => (
            <StyledDiv
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => changeAvatar(e)}
              key={index}
            >
              <StyledSelectable src={avatar} />
            </StyledDiv>
          ))}
        </Right>
      </Content>

      <SavedButton whileHover={{scale: 1.2}} whileTap={{scale: 0.9}} onClick = {savetoFirebase}>Save</SavedButton>
    </Container>
  );
};

export default Profilepage;
