const WebSocket = require('ws');
const chatService = require('../services/chat.service');


const setupChatWebSocket = (server) => {
 const chatSocket = new WebSocket.Server({ server });


 chatSocket.on('connection', (ws) => {
   console.log('New client connected');


   ws.on('message', async (message) => {
     try {
       const data = JSON.parse(message);
       const { chatId, senderId, content } = data;


       const newMessage = await chatService.addMessageToChat(chatId, senderId, content);


       chatSocket.clients.forEach((client) => {
         if (client.readyState === WebSocket.OPEN) {
           client.send(JSON.stringify(newMessage));
         }
       });
     } catch (error) {
       console.error('Error processing message:', error);
       ws.send(JSON.stringify({ error: 'Error processing message' }));
     }
   });


   ws.on('close', () => {
     console.log('Client disconnected');
   });
 });
};

module.exports = setupChatWebSocket;