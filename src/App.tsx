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

function App() {
  const [isopen, setIsopen] = useState(true);
  const { globalstate } = useContext(context);
  const user: User = globalstate.user;
  const toggle = () => {
    setIsopen(!isopen);
  };
  return (
    <Router>
      <GlobalStyle />
      {user ? (
        <>
          <Sidebar isopen={isopen} toggle={toggle} />
          <Switch>
            <Redirect exact from="/" to="/chat" />
            <Route path="/chat">
              <Chatpage />
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
