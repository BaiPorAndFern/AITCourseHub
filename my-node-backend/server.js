// require (import) modules
const express = require('express'); // create express app object
const port = 3000;
const app = express();
const mongoose = require('mongoose');
const cors = require('cors')
const verifyToken = require("./middleware/auth.guard")

// import setup websocket server
const setupChatWebSocket = require('./sockets/chat.socket')

const http = require('http');
const server = http.createServer(app);

const mongoURI = 'mongodb://localhost:4500/studentsdb';

// Include route files
const usersRoute = require('./routes/user');
const productsRoute = require('./routes/products');
const wikisRoute = require('./routes/wikis');
const chatRoutes = require('./routes/chat');

// Connect to MongoDB
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
   })
   .then(() => {
    console.log('Connected to MongoDB');
   })
   .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
   });

// Use routes
app.use(cors({
    origin: 'http://localhost:4200',
}))
// Middleware to parse JSON
app.use(express.json());
app.use('/user', usersRoute);
app.use('/products', productsRoute);
app.use('/wikis', wikisRoute);
// imports chats routes as well
app.use("/chats", verifyToken, chatRoutes)

// route for handling requests from the Angular client
// Example defining a route in Express
app.get('/', (req, res) => {
    res.send('<h1>Hello, Express.js server with MongoDB! root node</h1>'); // this get executed when user visit http://localhost:3000/
});
app.get('/api/message', (req, res) => {
    res.json({ message: 'Hello from the server!' });
});

// setup web socket server
setupChatWebSocket(server)

// Specifying the port and starting the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

// handling CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", 
               "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", 
               "Origin, X-Requested-With, Content-Type, Accept");
    next();
});