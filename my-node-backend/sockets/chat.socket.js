const WebSocket = require("ws");
const chatService = require("../services/chat.service");

const setupChatWebSocket = (server) => {
  const chatSocket = new WebSocket.Server({ server: server });

  let totalClients = 0; // Keep track of connected clients

  console.log('WebSocket server is ready to accept connections');

  // WebSocket connection handler
  chatSocket.on('connection', (ws) => {
    totalClients++;
    console.log(`New client connected. Total clients: ${totalClients}`);

    ws.on('message', async (message) => {
      console.log('Message received:', message);
      try {
        const data = JSON.parse(message);
        const { chatId, senderId, content } = data;

        const newMessage = await chatService.addMessageToChat(
          chatId,
          senderId,
          content
        );

        // Debug log to ensure populated data
        console.log('Sending populated message:', newMessage);

        chatSocket.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(newMessage));
          }
        });
      } catch (error) {
        console.error("Error processing message:", error);
        ws.send(JSON.stringify({ error: "Error processing message" }));
      }
    });

    ws.on("close", () => {
      totalClients = Math.max(totalClients - 1, 0); // Ensure non-negative count
      console.log("Client disconnected");
    });

    ws.on('error', (err) => {
      console.error('WebSocket error:', err);
    });
  });
};

module.exports = setupChatWebSocket;
