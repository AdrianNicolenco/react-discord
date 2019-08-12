import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';

import { List, ListItem, ListItemAvatar, Avatar, ListItemText } from '@material-ui/core';
import Header from './Header';

export default function Messages(props) {

  // Get chats from store
  const chatStore = useSelector(state => state.chat);
  const servers = Object.keys(chatStore.servers);
  const topics = Object.keys(chatStore.servers[chatStore.activeServer]);
  const { activeServer, activeTopic } = chatStore;

  // ref
  let messageContainer;

  useEffect(() => {
    // Keep scroll on bottom
    messageContainer.scrollIntoView()
  })

  return (
    <React.Fragment>
      <Header topics={topics} servers={servers}></Header>
      <div className="messages-container">
        <List>
          {chatStore.servers[activeServer][activeTopic].map((message, i) => (
            <ListItem className="message" key={i}>
              <ListItemAvatar>
                <Avatar>
                  <img src={process.env.PUBLIC_URL + "/user.png"} alt="user icon" height="48" />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={message.from} secondary={message.msg} className="message-text" />
            </ListItem>
          ))}
        </List>
        <div ref={(element) => messageContainer = element}></div>
      </div>
    </React.Fragment>
  )
}
