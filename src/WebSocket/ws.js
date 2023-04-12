const ws = new WebSocket('ws://localhost:8080');

ws.addEventListener('open',() => {
    console.log('connected');
});

ws.addEventListener('message', (event) => {
    console.log(event.data);
})