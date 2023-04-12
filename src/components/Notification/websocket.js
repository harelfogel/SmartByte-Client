// // websocket.js

// const WebSocket = window.WebSocket;


// const WebSocketClient = () => {
//     let socket = null;
  
//     const connect = () => {
//       socket = new WebSocket('ws://localhost:8080');
  
//       socket.onopen = function() {
//         console.log('Connected to the WebSocket server');
//       };
  
//       socket.onmessage = function(event) {
//         console.log('Received message:', event.data);
//       };
  
//       socket.onclose = function(event) {
//         console.log('Disconnected from the WebSocket server');
//         setTimeout(() => connect(), 5000); // reconnect after 5 seconds
//       };
//     };
  
//     const send = (message) => {
//       if (socket && socket.readyState === WebSocket.OPEN) {
//         socket.send(message);
//       }
//     };
  
//     return {
//       connect,
//       send
//     };
//   };
  
//   export default WebSocketClient();




// WebSocket.js

let socket = null;

function connectWebSocket() {
  if (!socket) {
    const WebSocket = window.WebSocket;
    socket = new WebSocket('ws://localhost:8080');

    socket.addEventListener('open', function (event) {
      console.log('WebSocket connection opened');
    });

    socket.addEventListener('message', function (event) {
      console.log('Received message:', event.data);
    });

    socket.addEventListener('error', function (event) {
      console.error('WebSocket error:', event);
    });

    socket.addEventListener('close', function (event) {
      console.log('WebSocket connection closed');
    });
  }
}

function sendWebSocketMessage(message) {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(message);
  }
}

export { connectWebSocket, sendWebSocketMessage };