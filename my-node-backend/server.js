// require (import) modules
const express = require('express');
const mongoose = require('mongoose');

const app = express(); // create express app object
const port = 3000;
const mongoURI = 'mongodb://localhost:4500/studentsdb';

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
   
   // Middleware to parse JSON
   app.use(express.json());

// route for handling requests from the Angular client
// Example defining a route in Express
app.get('/', (req, res) => {
    res.send('<h1>Hello, Express.js server! root node</h1>'); // this get executed when user visit http://localhost:3000/
});

// Include route files
const usersRoute = require('./routes/users');
const productsRoute = require('./routes/products');
const wikisRoute = require('./routes/wikis');

// Use routes
app.use('/users', usersRoute);
app.use('/products', productsRoute);
app.use('/wikis', wikisRoute);

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