const express = require('express');
const router = express.Router();
const userService = require('../services/user.service');

// Define a route
router.get('/', (req, res) => {
    res.send('this is user route');// this gets executed when user visit http://localhost:3500/user
});

// Register endpoint
router.post('/register', userService.registerUser);
// login endpoint
router.post('/login', userService.loginUser);

// export the router module so that server.js file can use it
module.exports = router;