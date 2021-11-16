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

  const sendMessage= async ()=>{
    if(text.length>0){
      await postMessage({conversationId: conversation.conversationId, text: text})
      setText("");
    }
  }
  return(
    <Grid container spacing={2} style={{padding: "1rem"}}>
      <Grid item xs={3}>
        <Toolbar >
          <Typography > Conversations </Typography>
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
      <Grid item xs={9}>
        {userList && 
          <Container style={{height: "75vh"}}>
            <Toolbar >
              <Typography > {conversation.conversationName} </Typography>
            </Toolbar>
            <List style={{height: '60vh', overflow: 'auto'}} >
              {messages && messages.slice(0).reverse().map(({id, user, created, text}) => {
                var userInfo = userList.filter( userListItem => userListItem.username === user)[0]
                var time = new Date(parseInt(created)).toLocaleString()
                return (
                  <div key={id} style={{textAlign: user===myProfile.username?"right":"left"}} >
                    <p style={{marginBottom:"0.3rem"}}>{userInfo.firstName} {userInfo.lastName}</p>
                    <Chip style={{fontSize:"0.9rem"}} color={user===myProfile.username?"primary": "secondary"} label={text} ref={messagesEndRef} />
                    <p style={{fontSize: "0.5rem", marginBottom:"0.3rem"}}>{time}</p>
                  </div>
                )
              })}
            </List>
          </Container>
        }
      </Grid>
      {conversation.conversationId && 
        <Grid item xs={12}>
          <Container >
            <Grid container spacing={2}>
              <Grid item xs={9}>
                <TextField onChange={(e)=>{
                  setText(e.target.value)}} value={text} size="small" fullWidth variant="outlined" required label="Enter message here" />
              </Grid>
              <Grid item xs={1}>
                <Button onClick={sendMessage} fullWidth  variant="contained" style={{backgroundColor:"#60a820", color:"white"}}>Send</Button>
              </Grid>
            </Grid>
          </Container>
        </Grid>
      }
    </Grid>
  )
}

export default Chat