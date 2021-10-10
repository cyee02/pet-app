import React from 'react'
import { useHistory } from "react-router-dom"

// import FormikTextInput from '../styles/FormikTextInput';

// Hooks
import useGetMyProfile from '../hooks/useGetMyProfile'
import useLogout from '../hooks/useLogout'

const Profile = () => {
  const { myProfile, loading } = useGetMyProfile()
  const isLogout = useLogout()
  const history = useHistory()

  if (loading) {
    return (
      null
    )
  }
  if (!myProfile) {
    history.push('/signin')
    return (
      null
    )
  }

  const handleLogOut = () => {
    isLogout(true)
    history.push('/signin')
  }

  const imageList = myProfile.images
  ? myProfile.images.map(image => {
      return (<img src={image.uri} alt="" width="300" height="auto" key={image.uri}/>)
    })
  : null

  return (
    <div>
      <button onClick={handleLogOut}>Log Out</button>
      <h1>My Profile</h1>
      {myProfile.profilePicture
        ? <img src={ myProfile.profilePicture[0].uri } alt="profilePicture" width="300" height="auto"/>
        : null
      }
      <button onClick={() => history.push('/uploadimage/profilePicture')}>Upload Profile Picture</button>
      <p>
      Name: {myProfile.firstName} {myProfile.lastName}<br/>
      Address: {myProfile.address} <br/>
      Description: {myProfile.description} <br/>
      Email: {myProfile.email} <br/>
      Gender: {myProfile.gender} <br/>
      Phone Number: {myProfile.phoneNumber}
      </p>
      <h2>
        Images
      </h2>
      <button onClick={() => history.push('/uploadimage/images')}>Upload Image</button>
      {imageList}
    </div>
  );
}

export default Profile;