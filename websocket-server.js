const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('Client connected');
    
    // Relay incoming messages to all connected clients
    ws.on('message', (message) => {
        console.log('Received message:', message);
        wss.clients.forEach(client => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    // Handle disconnections
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});
