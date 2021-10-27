import GlobalStyle from "./Globals/GlobalStyle";
//@ts-ignore
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Sidebar from "./Components/Sidebar/Sidebar";
import Notifications from "./Components/Pages/Notifications";
import Gettingstarted from "./Components/Pages/Gettingstarted";
//@ts-ignore
import Chat from "./Components/Pages/Chat";
import Profile from "./Components/Pages/Profile";
import { useContext, useState } from "react";
import { context } from "./Globals/GlobalStateProvider";
import Login from "./Components/Authentication/Login";
import { User } from "../node_modules/firebase/auth/dist/auth";

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
            <Redirect to="/chat" />
            <Route path="/chat">
              <Chat />
            </Route>
            <Route path="/notifications">
              <Notifications />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/">
              <Gettingstarted />
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
