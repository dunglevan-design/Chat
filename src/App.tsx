import GlobalStyle from "./Globals/GlobalStyle";
//@ts-ignore
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Sidebar from "./Components/Sidebar/Sidebar";
import { useContext, useState } from "react";
import { context } from "./Globals/GlobalStateProvider";
import Login from "./Components/Authentication/Login";
import { User } from "../node_modules/firebase/auth/dist/auth";
import Chatpage from "./Components/Pages/Chatpage/Chatpage";
import Notificationspage from "./Components/Pages/Notifications";
import Profilepage from "./Components/Pages/Profile";
import Homepage from "./Components/Pages/Homepage";
import VideoChatRoom from "./Components/VideoChat/VideoChatRoom";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { db, messaging } from "./firebase";
import { useSpring } from "../node_modules/framer-motion/types";
import Notification from "./Components/Notification/Notification";
import { onMessage } from "firebase/messaging";

function App() {
  const [isopen, setIsopen] = useState(true);
  const { globalstate } = useContext(context);
  const user: User = globalstate.user;
  const roomid = globalstate.currentRoom;
  const [videocalling, setvideocalling] = useState(false);
  const [caller, setcaller] = useState(true);
  // const [notificationMessage, setnotificationMessage] = useState("");
  const toggle = () => {
    setIsopen(!isopen);
  };

  const StartVideocall = async () => {
    setvideocalling(true);
    /**If a call already in progress. 
     * You are the callee. Otherwise you are the caller */
    const callDoc = await getDoc(doc(db, "rooms", roomid));
    if(callDoc.data().callinprogress){
      setcaller(false);
    }
    else {
      updateDoc(doc(db, "rooms", roomid), {
        callinprogress: true,
      });
    }

  };

  const StopVideocall = () => {
    setvideocalling(false);
    updateDoc(doc(db, "rooms", roomid), {
      callinprogress: false,
    });
  };

  /**
   * onMessage, display notification card for 2seconds.
   */

  return (
    <Router>
      <GlobalStyle />
      {user ? (
        <>
          <Sidebar isopen={isopen} toggle={toggle} />
          {videocalling && (
            <VideoChatRoom caller = {caller} stopvideocall={StopVideocall}></VideoChatRoom>
          )}
          <Notification />
          <Switch>
            {/* <Redirect exact from="/" to="/chat/rooms/CJEJ9bI7mBP8WK8bVY01" /> */}
            <Route path="/chat/:rooms?/:roomid?">
              <Chatpage StartVideocall={StartVideocall} />
            </Route>
            <Route path="/notifications">
              <Notificationspage />
            </Route>
            <Route path="/profile">
              <Profilepage />
            </Route>
            <Route path="/">
              <Homepage />
            </Route>
          </Switch>
        </>
      ) : (
        <Login />
      )}
    </Router>
  );
}

export default App;
