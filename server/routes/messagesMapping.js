'use strict';
const express = require('express');
let router = new express.Router();

const Smooch = require('smooch-core');
const KEY_ID = 'app_5931b5b59612676b006a62b4';
const SECRET = 'gswWWcw-jo_cn5oMPn6MT2zh';

const smooch = new Smooch({
    keyId: KEY_ID,
    secret: SECRET,
    scope: 'app',
});

/**
 * When receive ask the smooch API to send greeting message
 *
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
let sendGreeting = function(req, res) {
    console.log('webhook PAYLOAD:\n', JSON.stringify(req.body, null, 4));

        const appUserId = req.body.appUser._id;
        // Call REST API to send message https://docs.smooch.io/rest/#post-message
        if (req.body.trigger === 'message:appUser') {
            smooch.appUsers.sendMessage(appUserId, {
                type: 'text',
                text: 'Hello! How is your day!',
                role: 'appMaker',
            })
                .then((response) => {
                    console.log('API RESPONSE:\n', response);
                    res.end();
                })
                .catch((err) => {
                    console.log('API ERROR:\n', err);
                    res.end();
                });
        }
};

/**
 * @api {post} /messages Messenger integration
 * @apiName send greeting
 * @apiGroup Omni-channel
 */
router.post('/', sendGreeting);

module.exports = router;
