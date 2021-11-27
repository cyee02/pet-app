import React, {useState, useEffect, useRef} from 'react'
import { useHistory } from "react-router-dom"
import {Container, Chip, Grid, TextField, Button, List, ListItemButton, ListItemText, ListItemAvatar, Avatar, Typography, Toolbar} from '@mui/material';

// Hooks
import useGetProfiles from '../../hooks/useGetProfiles';
import useSubscribeMessage from './useSubscribeMessage'
import usePostMessage from './usePostMessage'
import useGetConversation from './useGetConversation'

const Chat = ({myProfile}) =>{
  const history = useHistory()
  const [postMessage] = usePostMessage()
  const [text, setText] = useState("");
  const [conversation, setConversation] = useState({});
  const {messages} = useSubscribeMessage(conversation.conversationId)
  const {conversations, conversationLoading} = useGetConversation()
  const {getProfiles, profileListInfo, profileListLoading} = useGetProfiles()

  const messagesEndRef = useRef(null)
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView()
  }
  var userList
  var isSubsequentMessage = { previousUser: null, isSame: false }

  useEffect(() => {
    scrollToBottom()
  });

  if (!myProfile) {
    history.push('/signin')
    return (
      null
      )
  }

  if (!profileListLoading) {
    userList = profileListInfo
  }

  const sendMessage= async (e)=>{
    e.preventDefault()
    if(text.length>0){
      await postMessage({conversationId: conversation.conversationId, text: text})
      setText("");
    }
  }
  return(
    <Grid container spacing={2} style={{padding: "1rem"}}>
      <Grid item xs={3}>
        <Toolbar >
          <Typography variant="h5"> Conversations </Typography>
        </Toolbar>
        <List>
          {!conversationLoading && conversations.map(conversation => {
            var conversationNameItem = conversation.conversationName
              ? conversation.conversationName
              : conversation.users.filter((user)=> user!==myProfile.username).join(", ")
            var users = conversation.users.filter(user => user!==myProfile.username).join(', ')
            return (
              <ListItemButton key={conversation.conversationId} onClick={() => {
                setConversation(conversation)
                getProfiles(conversation.users)}}>
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src={require("../../assets/icons/paw.png").default} />
                </ListItemAvatar>
                <ListItemText primary={conversationNameItem} secondary={users}/>
              </ListItemButton>
            )
          })}
        </List>
      </Grid>
      <Grid item xs={9} style={{height: "75vh", minHeight: "75vh"}}>
        {userList &&
          <Container>
            <Toolbar>
              <Typography variant="h5"> {conversation.conversationName} </Typography>
            </Toolbar>
            <List style={{height: '60vh', overflow: 'auto', backgroundColor: 'azure', borderRadius: '10px', padding: '10px'}} >
              {messages && messages.slice(0).reverse().map(({id, user, created, text}) => {
                var userInfo = userList.filter( userListItem => userListItem.username === user)[0]
                var displayName
                var imageUri
                if (user !== isSubsequentMessage.previousUser){
                  console.log("user !== isSubsequentMessage.previousUser")
                  isSubsequentMessage.previousUser = user
                  displayName = userInfo.firstName + ' ' + userInfo.lastName
                  isSubsequentMessage.isSame = false
                  imageUri = userInfo.profilePicture[0].uri
                } else {
                  console.log("user -== isSubsequentMessage.previousUser")
                  isSubsequentMessage.isSame = true
                  imageUri = null
                }
                var time = new Date(parseInt(created)).toLocaleString()
                return (
                  <li key={id} style={{textAlign: user===myProfile.username?"right":"left"}} >
                    {user===myProfile.username
                      ? <div style={{height: "2rem", width: "2.2rem", float: user===myProfile.username?"right":"left", margin: "0.1rem 0.3rem"}} >
                          {!isSubsequentMessage.isSame
                          ? <img alt="profilePicture" src={imageUri} style={{width: "2.2rem", borderRadius: "50%", padding: "0.1rem"}} />
                          : null}
                        </div>
                      : <div style={{height: "3rem", width: "2.2rem", display: "block", float: user===myProfile.username?"right":"left", margin: "0.3rem 0.3rem"}} >
                          {!isSubsequentMessage.isSame
                          ? <img alt="profilePicture" src={imageUri} style={{width: "2.2rem", borderRadius: "50%", padding: "0.1rem", marginTop: "0.4rem"}} onClick={()=>history.push(`user/${user}`)}/>
                          : null}
                        </div>
                    }
                    <p style={{ marginBottom: "0.1rem" ,fontSize: "0.7rem"}}> {user===myProfile.username?null:displayName} </p>
                    <Chip style={{fontSize:"0.9rem"}}
                    color={user===myProfile.username?"primary": "secondary"}
                    label={text}
                    ref={messagesEndRef} />
                    <p style={{fontSize: "0.5rem", marginBottom: "1px"}}>{time}</p>
                  </li>
                )
              })}
            </List>
          </Container>
        }
      </Grid>
      {conversation.conversationId && 
        <Grid item xs={12}>
          <form onSubmit={sendMessage} >
            <div>
            <TextField 
              onChange={(e)=>{setText(e.target.value)}} value={text} size="small" variant="outlined" required label="Enter message here" style={{width: "85%"}} />
            <Button onClick={sendMessage} variant="contained" style={{padding: "1rem", margin: "0.1rem 1rem", color:"white", borderRadius: "20px"}}>Send</Button>
            </div>
          </form>
        </Grid>
      }
    </Grid>
  )
}

export default Chat