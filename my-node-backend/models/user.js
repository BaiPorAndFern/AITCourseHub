const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    trim: true
  },
  lastname: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
}, {
    timestamps: true // automatically add createdAt and updatedAt fields
  });

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;