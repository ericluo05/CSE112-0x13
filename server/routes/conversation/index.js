'use strict';
let express = require('express');
let controller = require('./conversation.controller');
let router = new express.Router();


/**
 *
 * @api {post} /api/conversation/ Conversation session
 * @apiDescription This is used to store in information from the conversation
 * conversation.controller.js create for more info
 * @apiName ConversationHandleAll
 * @apiGroup Conversation
 *
 * TODO: Document this API
 */
router.post('/', controller.handleAll);


module.exports = router;
