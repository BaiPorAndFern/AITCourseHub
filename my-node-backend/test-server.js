const WebSocket = require('ws');
const http = require('http');

const port = 3500;

// Create HTTP server
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('HTTP server running\n');
});

// Attach WebSocket server
const wsServer = new WebSocket.Server({ server });

wsServer.on('connection', (ws) => {
  console.log('New client connected');
  ws.on('message', (message) => {
    console.log('Message received:', message);
    ws.send(`Echo: ${message}`);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

server.listen(port, () => {
  console.log(`WebSocket server is running on ws://localhost:${port}`);
});