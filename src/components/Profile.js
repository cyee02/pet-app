import React, {useState, useEffect} from 'react'
import { useHistory } from "react-router-dom"
import UpdateProfile from './UpdateProfile';
// import FormikTextInput from '../styles/FormikTextInput';

// Hooks
import useGetMyProfile from '../hooks/useGetMyProfile'

const Profile = () => {
  const { myProfile, loading, fetchMore } = useGetMyProfile()
  const history = useHistory()
  // To toggle between update profile
  const [updatingProfile, setUpdatingProfile] = useState(false)

  // To refresh the data after updatingProfile is toggled
  useEffect(() => {
    fetchMore()
  }, [updatingProfile])

  if (loading) {
    return (
      null
    )
  }
  if (!myProfile) {
    console.log("not myProfile");
    history.push('/signin')
    return (
      null
    )
  }

  const imageList = myProfile.images
  ? myProfile.images.map(image => {
      return (<img src={image.uri} alt="" width="300" height="auto" key={image.uri}/>)
    })
  : null

  // UpdateProfile
  if (updatingProfile) return (<UpdateProfile myProfile={myProfile} setUpdatingProfile={setUpdatingProfile}/>)


  // Profile
  return (
    <div>
      <div>
        <button onClick={(event) => setUpdatingProfile(true)}>Update Profile</button>
      </div>
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