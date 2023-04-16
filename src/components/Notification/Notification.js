import React, { useEffect, useState } from "react";
import { connectWebSocket, sendWebSocketMessage } from "./websocket";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getSuggestions } from "../Suggestions/suggestions.service";

const WebSocket = window.WebSocket;

export const Notification = ({setNewSuggestionsCount, newSuggestionsCount}) => {
  const [notification, setNotification] = useState("");
  const [allowAudioPlayback, setAllowAudioPlayback] = useState(false);





  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");

    socket.addEventListener("message", handleMessageReceived);

    return () => {
      socket.removeEventListener("message", handleMessageReceived);
    };
  }, []);

  function handleMessageReceived(event) {
    const message = event.data;
    setNotification(message);
    toast.info(event.data);
    if (allowAudioPlayback) {
      const notificationSound = new Audio(
        "/assets/mixkit-bubble-pop-up-alert-notification-2357.wav"
      );
      notificationSound.play();
    }
    if(message !== 'Welcome to the WebSocket Server!')
      setNewSuggestionsCount(newSuggestionsCount + 1);
  }

  useEffect(() => {
    console.log({ notification });
  }, [notification]);

  const handleButtonClick = () => {
    setAllowAudioPlayback(true);
    const notificationSound = new Audio("../../sounds/relentless-572.mp3");
    notificationSound.play();
  };

  connectWebSocket();

  return (
    <div>
      <ToastContainer />
    </div>
  );
};
