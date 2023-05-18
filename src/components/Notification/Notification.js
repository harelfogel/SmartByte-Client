import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { eventEmitter } from '../../WebSocket/ws.js'; // import eventEmitter instead of ws

export const Notification = ({ setNewSuggestionsCount, newSuggestionsCount }) => {
  const [notification, setNotification] = useState("");
  const [allowAudioPlayback, setAllowAudioPlayback] = useState(false);

  useEffect(() => {
    function handleMessageReceived(message) {
      setNotification(message);
      toast.info(message);
      if (allowAudioPlayback) {
        const notificationSound = new Audio(
          "/assets/mixkit-bubble-pop-up-alert-notification-2357.wav"
        );
        notificationSound.play();
      }
      if (message !== 'Welcome to the WebSocket Server!')
        setNewSuggestionsCount(newSuggestionsCount + 1);
    }

    // eventEmitter.on('motionDetected', handleMessageReceived);

    // return () => {
    //   eventEmitter.off('motionDetected', handleMessageReceived);
    // };
  }, [newSuggestionsCount, allowAudioPlayback]);

  const handleButtonClick = () => {
    setAllowAudioPlayback(true);
    const notificationSound = new Audio("../../sounds/relentless-572.mp3");
    notificationSound.play();
  };

  useEffect(() => {
    console.log({ notification });
  }, [notification]);

  return (
    <div>
      <ToastContainer />
    </div>
  );
};
