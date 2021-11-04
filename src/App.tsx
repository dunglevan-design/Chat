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

function App() {
  const [isopen, setIsopen] = useState(true);
  const { globalstate } = useContext(context);
  const user: User = globalstate.user;
  const toggle = () => {
    setIsopen(!isopen);
  };

  const [videocalling, setvideocalling] = useState(false);

  const StartVideocall = () => {
    setvideocalling(true);
  };

  const StopVideocall = () => {
    setvideocalling(false);
  };
  return (
    <Router>
      <GlobalStyle />
      {user ? (
        <>
          <Sidebar isopen={isopen} toggle={toggle} />
          {videocalling && (
            <VideoChatRoom stopvideocall={StopVideocall}></VideoChatRoom>
          )}
          <Switch>
            {/* <Redirect exact from="/" to="/chat/rooms/CJEJ9bI7mBP8WK8bVY01" /> */}
            <Route path="/chat/:rooms?/:roomid?">
              <Chatpage StartVideocall={StartVideocall}/>
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
