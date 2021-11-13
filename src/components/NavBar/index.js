import React from 'react'
import { useHistory } from "react-router-dom"

// Hooks
import useLogout from './useLogout'

const NavBar = ({isLogin, myProfile}) => {
  const history = useHistory()
  const isLogout = useLogout()

  const handleLogOut = async () => {
    await isLogout(true)
    history.push('/signin')
  }

  return (
    <div>
      <ul className="NavBar">
        <li> <img src={require("../../assets/icons/paw.png").default} className="icon" alt="" /> </li>
        {isLogin
          ?
          <div>
          <li><img src={require("../../assets/icons/notification.svg").default} alt="notification"/></li>
          <li><img src={require("../../assets/icons/profile.svg").default} alt="profile" onClick={() => history.push(`/user/${myProfile.username}`)} /></li>
          <li><img src={require("../../assets/icons/chats.svg").default} alt="chats" onClick={() => history.push('/chat')} /></li>
          <li><img src={require("../../assets/icons/newImage.svg").default} alt="upload" onClick={() => history.push('/uploadimage/images')}/></li>
          </div>
          : null
        }
        {isLogin 
          ? <li style={{float: "right"}}> <button onClick={handleLogOut}>Log Out</button> </li>
          : <li style={{float: "right"}}> <button onClick={() => history.push('/signin')}>Log In</button> </li>
        }

      </ul>
    </div>
  )
}

export default NavBar;