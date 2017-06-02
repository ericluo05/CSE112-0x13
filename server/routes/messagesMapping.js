/**
 * Created by JACK on 6/2/17.
 */
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

router.post(function(req, res) {
    console.log('webhook PAYLOAD:\n', JSON.stringify(req.body, null, 4));

    const appUserId = req.body.appUser._id;
    // Call REST API to send message https://docs.smooch.io/rest/#post-message
    if (req.body.trigger === 'message:appUser') {
        smooch.appUsers.sendMessage(appUserId, {
            type: 'text',
            text: 'Live long and prosper',
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
});

module.exports = router;
