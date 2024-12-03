const Chat = require('../models/chat');

const create = async (req, res) => {
    try {
        const name = req.body.name;

        const chat = new Chat({
            name: name
        });

        chat.save();

        res.status(201).json({message: 'Chat created successfully'});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const getAll = async (req, res) => {
    try {
      const chats = await Chat.find()
   
   
      res.status(200).json({ chats: chats })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
   };

const getById = async (req, res) => {
    try {
        const id = req.params.id;

        const chat = await Chat.findById(id);

        res.status(200).json({chat: chat});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const addMessageToChat = async (chatId, senderId, content) => {
    const chat = await Chat.findById(chatId);
    if (!chat) throw new Error('Chat not found');
    
    const newMessage = {
        sender_id: senderId,
        content: content
    };

    chat.messages.push(newMessage);
    await chat.save();

    return newMessage;
};

module.exports = {
    create,
    getAll,
    getById,
    addMessageToChat
};