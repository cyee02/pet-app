import { useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import useGetProfile from "../../hooks/useGetProfile"
import useCreateConversation from "./useCreateConversation"
import useGetConversation from '../Chat/useGetConversation'

const Profile = (args) => {
  const history = useHistory()
  const { username } = useParams()
  const {getProfile, profileInfo, loading} = useGetProfile()
  const [createConversation] = useCreateConversation()
  const {conversations} = useGetConversation()

  useEffect(() => {
    getProfile(username)
  }, [username])

  if (loading) {
    return null
  }
  var profile = profileInfo
  var isMyProfile = false

  if (args.myProfile !== null && username === args.myProfile.username) {
    isMyProfile = true
    profile = args.myProfile
  }

  if(!profile) {
    return (
      <p>User '{username}' not found</p>
    )
  }

  const imageList = profile.images
    ? profile.images.map(image => {
        return (<img src={image.uri} alt="" width="300" height="231" key={image.uri}/>)
      })
    : <p>No images found for user</p>

  const handleCreateConversation = async() => {
    var hasPrivateChat = false
    conversations.every(conversation => {
      if (conversation.users.filter(user => user!==profile.username && user!==args.myProfile.username ).length === 0){
        hasPrivateChat = true
        return false // to break the loop
      }
      return true // does nothing and goes to next iteration
    })
    if (!hasPrivateChat){
      await createConversation({users: [profile.username], conversationName: `${profile.firstName} ${profile.lastName}`})
    }
    history.push('/chat')
  }

  return (
    <div className="profileOverall">
      <div className="profileCard">
        <div style={{ "display": "block", "alignSelf": "center"}} >
          {profile.profilePicture
            ? <img 
              src={ profile.profilePicture[0].uri }
              alt="profilePicture" className="profilePicture"/>
            : <img 
              src={require("../../assets/icons/profileSilhouette.svg").default}
              alt="profilePicture" className="profilePicture"/>
          }
          {isMyProfile &&
            <div style={{"position": "relative"}}>
              <img src={require("../../assets/icons/plus.svg").default} alt="new dp"
                onClick={() => history.push('/uploadimage/profilePicture')}
                style={{"height": "30px", "position": "absolute", "bottom": "0px", "right": "0px" }} />
            </div>
          }
        </div>

        <div className="profileDetails">
          <div style={{"position": "relative" }}>
          {isMyProfile &&
            <img src={require("../../assets/icons/edit.svg").default} alt="new dp"
              onClick={() => history.push('/updateprofile')}
              style={{"height": "30px", "position": "absolute", "top": "0px", "right": "5px" }} />
          }
            <h1>{profile.username}</h1>
            <h5>{profile.firstName} {profile.lastName}</h5>
            <p> {profile.description} </p>
          </div>
          <div>
            {!isMyProfile && 
            <button onClick={handleCreateConversation} >Message</button>
            }
          </div>
        </div>
      </div>

      <div className="imageGallery">
        {imageList}
      </div>
    </div>
  );
}

export default Profile;