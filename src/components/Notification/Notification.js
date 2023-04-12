import React, { useEffect, useState } from 'react'
// import WebSocketClient from './websocket';
import { connectWebSocket, sendWebSocketMessage } from './websocket';
const WebSocket = window.WebSocket;


export const Notification = () => {

    // console.log({WebSocketClient});
    const [notification, setNotification] = useState('');
    
    //   useEffect(() => {
    //     WebSocketClient.connect();
    
    //     WebSocketClient.connect().onmessage((message) => {
    //         console.log(message);
    //       setNotification(message);
    //     });
    
    //     return () => {
    //       WebSocketClient.disconnect();
    //     };
    //   }, []);


    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8080');
    
        socket.addEventListener('message', handleMessageReceived);
    
        return () => {
          socket.removeEventListener('message', handleMessageReceived);
        };
      }, []);

      function handleMessageReceived(event) {
        const message = event.data;
        setNotification(message);
      }

      useEffect(() => {
        console.log({notification});
      },[notification])
    
    //   function handleSendMessage() {
    //     const message = 'Hello, world!';
    //     socket.send(message);
    //   }

    connectWebSocket();
    // sendWebSocketMessage('Hello, world!');

  return (
    <div>
      {notification && (
        <div >
          {notification}
        </div>
      )}
    </div>
  )
}
