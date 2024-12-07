// Import modules and dependencies
const express = require('express'); // Create express app object
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const verifyToken = require("./middleware/auth.guard");

// Import route files
const usersRoute = require('./routes/user');
const productsRoute = require('./routes/products');
const wikisRoute = require('./routes/wikis');
const chatRoutes = require('./routes/chat');

// Import WebSocket setup
const setupChatWebSocket = require('./sockets/chat.socket');

// Initialize app and server
const app = express();
const server = http.createServer(app);
const port = 3500;

// Set up WebSocket server
setupChatWebSocket(server);

// MongoDB Connection URI
const mongoURI = 'mongodb://localhost:4500/studentsdb';

// Connect to MongoDB
mongoose.connect(mongoURI, {
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

// Middleware setup
app.use(cors({
    origin: 'http://localhost:4200',
}));

// Middleware to parse JSON
app.use(express.json());

// CORS Handling Middleware
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Use routes
app.use('/user', usersRoute);
app.use('/products', productsRoute);
app.use('/wikis', wikisRoute);
app.use("/chats", verifyToken, chatRoutes);

// Default routes for testing
app.get('/', (req, res) => {
    res.send('<h1>Hello, Express.js server with MongoDB! Root Node</h1>');
});

app.get('/api/message', (req, res) => {
    res.json({ message: 'Hello from the server!' });
});

// Logging for Incoming HTTP Requests
app.use((req, res, next) => {
    console.log(`HTTP Request: ${req.method} ${req.url}`);
    console.log('Headers:', req.headers);
    next();
  });

// Start the server
server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});