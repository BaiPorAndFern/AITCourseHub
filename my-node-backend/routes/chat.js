const express = require('express');
const router = express.Router();
const chatService = require('../services/chat.service');

router.post('', chatService.create);
router.get('', chatService.getAll);
router.get('/:id', chatService.getById);

module.exports = router;