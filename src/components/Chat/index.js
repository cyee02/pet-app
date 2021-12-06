import React, {useState, useEffect, useRef} from 'react'
import { useHistory } from "react-router-dom"
import {Container, Chip, Grid, Divider, List, ListItemButton, ListItemText, ListItemAvatar, Avatar, Typography, Toolbar, Paper, InputBase} from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import InfoIcon from '@mui/icons-material/Info';

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
  const [displayChatInfo, setDisplayChatInfo] = useState(false);
  const {messages} = useSubscribeMessage(conversation.conversationId)
  const {conversations, conversationLoading} = useGetConversation()
  const {getProfiles, profileListInfo, profileListLoading} = useGetProfiles()

  const messagesEndRef = useRef(null)
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView()
  }
  var userList

  useEffect(() => {
    scrollToBottom()
  });

  if (!myProfile) {
    history.push('/signin')
    return null
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

  // To check if it is the first message
  var previousUser
  const checkFirstMessage = (user) => {
    if (user !== previousUser){
      previousUser = user
      return true
    }
    return false
  }

  return(
    <Grid container spacing={2} style={{padding: "1rem"}}>
      <Grid item xs={3} >
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
      <Grid item xs={9} >
        {userList &&
          <Container>
            <Toolbar>
              <Typography variant="h5"> {conversation.conversationName} </Typography>
              <InfoIcon onClick={()=>setDisplayChatInfo(!displayChatInfo)} color="primary" style={{margin: "0 0.5rem"}} />
            </Toolbar>
            <List style={{ height: "70vh", overflow: 'auto', backgroundColor: 'azure', borderRadius: '10px', padding: '10px'}} >
              {messages && messages.slice(0).reverse().map(({id, user, created, text}) => {
                var userInfo = userList.filter( userListItem => userListItem.username === user)[0]
                var isFirstMessage = checkFirstMessage(user)
                var time = new Date(parseInt(created)).toLocaleString()
                return (
                  <li key={id} style={{display: "inline-block", width: "100%"}} >
                    <div>
                      {user===myProfile.username
                        ? <div style={{ float: "right" }} >
                            {displayChatInfo && <span style={{fontSize: "0.5rem", margin: "0 0.5rem"}}>{time}</span>}
                            <Chip style={{fontSize:"0.9rem", marginBottom: "0.1rem" }}
                            color={"primary"}
                            label={text}
                            ref={messagesEndRef} />
                          </div>
                        // Their messages
                        : <div style={{ float: "left", position: "relative" }} >
                            {isFirstMessage &&
                            <div>
                              <p style={{marginBottom: "0", marginLeft: "48px", fontSize: "0.7rem"}} >{userInfo.firstName} {userInfo.lastName}</p>
                              <div 
                                style={{
                                  backgroundImage: userInfo.profilePicture && `url(${userInfo.profilePicture[0].uri})`,
                                  width: "44px",
                                  height: "44px",
                                  borderRadius: "22px",
                                  backgroundSize: "48px",
                                  backgroundPosition: "center",
                                  position: "absolute",
                                  bottom: "0",
                                }}
                                onClick={()=>history.push(`user/${userInfo.username}`)}
                              />
                            </div>}
                            <Chip style={{fontSize:"0.9rem", marginBottom: "0.1rem", marginLeft: '48px' }}
                            color={"secondary"}
                            label={text}
                            ref={messagesEndRef} />
                            {displayChatInfo && <span style={{fontSize: "0.5rem", margin: "0 0.5rem"}}>{time}</span>}
                          </div>}
                    </div>
                  </li>
                )
              })}
            </List>
            <Paper
              component="form"
              onSubmit={sendMessage}
              style={{padding: "0.2rem", display: "flex", flexDirection: "row"}}
            >
              <InputBase
                onChange={(e)=>{setText(e.target.value)}}
                value={text}
                placeholder="Enter message here..."
                variant="outlined"
                style={{ flex: "1" }}
              />
              <Divider orientation="vertical" flexItem />
              <SendIcon style={{flex: "0.1", alignSelf: "center"}} color="primary" onClick={sendMessage} />
            </Paper>
          </Container>
        }
      </Grid>
    </Grid>
  )
}

export default Chat