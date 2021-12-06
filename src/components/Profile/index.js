/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import useGetProfile from "../../hooks/useGetProfile"
import useCreateConversation from "./useCreateConversation"
import useGetConversation from '../Chat/useGetConversation'
import {Grid, Avatar, Badge, Container, ImageList, ImageListItem, Button} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Profile = (args) => {
  const history = useHistory()
  const { username } = useParams()
  const {getProfile, profileInfo, loading} = useGetProfile()
  const [createConversation] = useCreateConversation()
  const {conversations} = useGetConversation()

  useEffect(() => {
    getProfile(username)
  }, [])

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
    <Container style={{marginTop: "2rem"}} >
      <Grid container>
        <Grid item xs={3}>
          <Container>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              badgeContent={isMyProfile && <AddCircleIcon color="primary"
              style={{backgroundColor: "white", borderRadius: "50%", border: "0.15rem solid" }} />}
              onClick={() => history.push('/uploadimage/profilePicture')}
            >
              <Avatar
                alt="profilePicture"
                src={profile.profilePicture?profile.profilePicture[0].uri:undefined}
                style={{width: "10rem", height: "10rem", filter: "drop-shadow(0px 0px 2px gray)"}}
              />
            </Badge>
          </Container>
        </Grid>
        <Grid item xs={9}>
          <h1>
            {profile.firstName} {profile.lastName}
            {isMyProfile && <EditIcon onClick={() => history.push('/updateprofile')} color="primary" style={{margin: "0rem 0.5rem"}} />}
          </h1>
          <h5>@{profile.username}</h5>
          <p> {profile.description} </p>
          {!isMyProfile && <Button variant="contained" onClick={handleCreateConversation} >Message</Button> }
        </Grid>
        <Grid item xs={12} style={{borderTop: "1px solid lightGray", padding: "2rem 0.5rem 0", marginTop: "2rem"}} >
          {profile.images && 
            <ImageList cols={3} >
              {profile.images.map((image) =>
                <ImageListItem key={image.uri} >
                  <img loading="lazy" src={image.uri} alt={image.uri} style={{padding: "0"}}/>)
                </ImageListItem>)}
            </ImageList>
          }
        </Grid>
      </Grid>
    </Container>
  );
}

export default Profile;