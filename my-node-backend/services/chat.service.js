const Chat = require("../models/chat");

const create = async (req, res) => {
  try {
    const name = req.body.name;

    const chat = new Chat({
      name: name,
    });

    chat.save();

    res.status(201).json({ chat: chat });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAll = async (req, res) => {
  try {
    const chats = await Chat.find();

    res.status(200).json({ chats: chats });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const id = req.params.id;

    // Populate senderId with firstname
    const chat = await Chat.findById(id).populate(
      "messages.senderId",
      "firstname"
    );

    if (!chat) {
      return res.status(404).json({ error: "Chat not found" });
    }

    res.status(200).json({ chat: chat });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addMessageToChat = async (chatId, senderId, content) => {
  const chat = await Chat.findById(chatId);
  if (!chat) throw new Error("Chat not found");

  const newMessage = {
    senderId: senderId,
    content: content,
  };

  chat.messages.push(newMessage);
  await chat.save();

  // Populate the senderId field with user data
  const savedMessage = chat.messages[chat.messages.length - 1];
  const populatedMessage = await Chat.findOne(
    { "messages._id": savedMessage._id },
    { "messages.$": 1 }
  )
    .populate("messages.senderId", "firstname")
    .exec();

  return populatedMessage.messages[0];
};

// add 'update' and 'delete' methods as needed

module.exports = {
  create,
  getAll,
  getById,
  addMessageToChat,
};
