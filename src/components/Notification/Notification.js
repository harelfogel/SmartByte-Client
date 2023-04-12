import React, { useEffect, useState } from 'react'
// import WebSocketClient from './websocket';
import { connectWebSocket, sendWebSocketMessage } from './websocket';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import a from '../../sounds/'


const WebSocket = window.WebSocket;


export const Notification = () => {

    // console.log({WebSocketClient});
    const [notification, setNotification] = useState('');


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
        toast.info(event.data); 
        const notificationSound = new Audio('../../sounds/relentless-572.mp3');
        notificationSound.play();
      }

      useEffect(() => {
        console.log({notification});
      },[notification])
    

    connectWebSocket();

  return (
    <div>
        <ToastContainer />
    </div>
  )
}
