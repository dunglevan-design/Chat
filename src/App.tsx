import GlobalStyle from './Globals/GlobalStyle';
import styled from 'styled-components';
//@ts-ignore
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom"; 
import Sidebar from './Components/Sidebar/Sidebar';
import Notifications from './Components/Pages/Notifications';
import Gettingstarted from './Components/Pages/Gettingstarted';
//@ts-ignore
import Chat from './Components/Pages/Chat';
import Profile from './Components/Pages/Profile';
import { useState } from 'react';


function App() {
  const [isopen, setIsopen] = useState(true);

  const toggle = () => {
      setIsopen(!isopen);
  }
  return (
    <Router>
      <GlobalStyle/>
      <Sidebar isopen = {isopen} toggle = {toggle}/>
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
    </Router>
  );
}

export default App;
