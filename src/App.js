import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import NavBar from './components/NavBar';
import SignIn from './components/SignIn';
import Profile from './components/Profile';
import Register from './components/Register';
import UploadImage from './components/UploadImage';
import UpdateProfile from './components/UpdateProfile';
import Chat from './components/Chat';
import './App.css';

import useGetMyProfile from './hooks/useGetMyProfile'

function App() {
  const { myProfile, loading, fetchMore } = useGetMyProfile()
  const [triggerFetchMore, setTriggerFetchMore] = useState(false)

  useEffect(() => {
    fetchMore(triggerFetchMore)
    setTriggerFetchMore(false)
  },[triggerFetchMore, fetchMore])
  if (loading) {
    return (
      null
    )
  }
  var isLogIn = false
  myProfile ? isLogIn = true : isLogIn = false
  return (
    <Router>
      <NavBar isLogin={isLogIn} myProfile={myProfile} />
      <Switch>
        <Route path="/signin">
          <SignIn myProfile={myProfile}/>
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/user/:username">
          <Profile myProfile={myProfile} />
        </Route>
        <Route path="/updateprofile" match="exact">
          <UpdateProfile myProfile={myProfile} setTriggerFetchMore={setTriggerFetchMore}/>
        </Route>
        <Route path="/uploadimage/:imageType">
          <UploadImage setTriggerFetchMore={setTriggerFetchMore}/>
        </Route>
        <Route path="/chat">
          <Chat  myProfile={myProfile}  />
        </Route>
        <Redirect to="/user" />
      </Switch>
    </Router>
  );
}

export default App;
