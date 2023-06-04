import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { eventEmitter } from '../../WebSocket/ws.js'; // import eventEmitter instead of ws
import { connectWebSocket } from "./websocket.js";

// const WebSocket = window.WebSocket;

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
      const suggestionsPattern = /\b(Suggestion)\b/;
      if(suggestionsPattern.test(message))
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