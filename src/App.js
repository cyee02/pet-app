import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import NavBar from './components/NavBar';
import SignIn from './components/SignIn';
import Profile from './components/Profile';
import Register from './components/Register';
import UploadImage from './components/UploadImage';

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/signin">
          <SignIn />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/uploadimage/:imageType">
          <UploadImage />
        </Route>
        <Redirect to="/profile" />
      </Switch>
    </Router>
  );
}

export default App;
