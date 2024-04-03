const messageRouter = require('express').Router();
const messageController = require('./message.controller');

messageRouter.post('/completion', messageController.getResponse);

module.exports = messageRouter;
