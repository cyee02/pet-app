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
  return (
    <Router>
      {myProfile
       ? <NavBar />
       : null}
      <Switch>
        <Route path="/signin">
          <SignIn  myProfile={myProfile}/>
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/profile">
          <Profile myProfile={myProfile} fetchMore={fetchMore}/>
        </Route>
        <Route path="/updateprofile" match="exact">
          <UpdateProfile myProfile={myProfile} setTriggerFetchMore={setTriggerFetchMore}/>
        </Route>
        <Route path="/uploadimage/:imageType">
          <UploadImage setTriggerFetchMore={setTriggerFetchMore}/>
        </Route>
        <Redirect to="/profile" />
      </Switch>
    </Router>
  );
}

export default App;
