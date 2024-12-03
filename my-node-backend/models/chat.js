const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const chatSchema = new mongoose.Schema({
  name: [{
    type: String,
    required: true,
  }],
  messages: [messageSchema],
},
{
    timestamps: true
});

module.exports = mongoose.model('Chat', chatSchema);