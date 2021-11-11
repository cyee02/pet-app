import React, {useState, useEffect, useRef} from 'react'
import { useHistory } from "react-router-dom"
import {Container, Chip, Grid, TextField, Button, List} from '@mui/material';

// Hooks
import useGetMessage from './useGetMessage';
import useSubscribeMessage from './useSubscribeMessage';
import usePostMessage from './usePostMessage';

const Chat = ({myProfile, conversation = {
  conversationId: "710c940d-dce9-40e0-b5b2-8a91fab24abf",
  conversationName: "Private chat with usertest1",
  users: ["username", "usertest1", "usertest2"]
}}) =>{
  const conversationId = conversation.conversationId
  const history = useHistory()
  const [postMessage] = usePostMessage()
  const [text, setText] = useState("");
  const {subMessages, subLoading} = useSubscribeMessage(conversationId)
  const {initialMessages, loading} = useGetMessage(conversationId)

  var initialLoading = true
  var messages = []

  if (!loading) {
    messages = initialMessages
    initialLoading = false
  }

  if (!initialLoading && !subLoading){
    messages = subMessages
  }

  const messagesEndRef = useRef(null)
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView()
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages]);

  if (!myProfile) {
    history.push('/signin')
    return (
      null
      )
    }

  const sendMessage= async ()=>{
    if(text.length>0){
      await postMessage({conversationId, text})
      setText("");
    }
  }

  const conversationName = conversation.conversationName
    ? conversation.conversationName
    : conversation.users.filter((user)=> user!==myProfile.username).join(", ")

  return(
      <Container style={{height: "89vh"}}>
        <h3>{conversationName}</h3>
        {/* <div style={{marginBottom:"5rem"}}> */}
        <List style={{maxHeight: '70%', overflow: 'auto', marginBottom:"5rem"}} >
          {messages && messages.slice(0).reverse().map(({id, user, created, text})=>{
            var time = new Date(parseInt(created)).toLocaleString()
            var displayName = user === myProfile.username ? myProfile.firstName + " " + myProfile.lastName : user
            return(
              <div key={id} style={{textAlign: user===myProfile.username?"right":"left"}}>
                <p style={{marginBottom:"0.3rem"}}>{displayName}</p>
                <Chip style={{fontSize:"0.9rem"}} color={user===myProfile.username?"primary": "secondary"} label={text} ref={messagesEndRef}/>
                <p style={{fontSize: "0.5rem", marginBottom:"0.3rem"}}>{time}</p>
              </div>
            )
          })}
        </List>
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
  )
}

export default Chat