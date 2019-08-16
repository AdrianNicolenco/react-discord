import io from 'socket.io-client';

import { SEND_MESSAGE, ADD_MESSAGE, SIGN_IN, ADD_CHANNEL } from '../actions/types';

export const socketMiddleware = (baseUrl) => {
  return storeAPI => {
    let socket = io(baseUrl);

    // Setup default listener
    let listener = setupSocketListener('default', socket, storeAPI);

    // Check actions and emit from socket if needed
    return next => action => {
      if (action.type === SEND_MESSAGE) {
        socket.emit('simple-chat-message', action.payload);
        return;
      }
      else if (action.type === SIGN_IN) {
        socket.emit('simple-chat-userId', action.payload.userId);
        listener.off();
        listener = setupSocketListener(action.payload.userId, socket, storeAPI);
      }


      return next(action);
    }
  }
}

// Listens on socket with our userId
// Listens to socket server
// Action types of (Message, Channel)
function setupSocketListener(userId, socket, storeAPI) {
  return socket.on(userId, (action) => {
    // Check for action type
    if (action.type === "message") {
      storeAPI.dispatch({
        type: ADD_MESSAGE,
        payload: action.payload
      });
    }
    else if (action.type === "channel") {
      storeAPI.dispatch({
        type: ADD_CHANNEL,
        payload: action.payload
      })
    }
  });
}