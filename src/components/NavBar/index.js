import React from 'react'
import { useHistory } from "react-router-dom"

// Hooks
import useLogout from './useLogout'

const NavBar = () => {
  const history = useHistory()
  const isLogout = useLogout()

  const handleLogOut = () => {
    isLogout(true)
    history.push('/signin')
  }

  return (
    <div>
      <ul className="NavBar">
        <li> <img src="icons/paw.png" className="icon" alt="" /> </li>
        <li><img src={"icons/home.svg"} alt="home"/></li>
        <li><img src={"icons/notification.svg"} alt="notification"/></li>
        <li><img src={"icons/profile.svg"} alt="profile" onClick={() => history.push('/profile')} /></li>
        <li><img src={"icons/chats.svg"} alt="chats"/></li>
        <li><img src={"icons/newImage.svg"} alt="chats" onClick={() => history.push('/uploadimage/images')}/></li>
        <li style={{float: "right"}}>
          <button onClick={handleLogOut}>Log Out</button>
        </li>
      </ul>
    </div>
  )
}

export default NavBar;