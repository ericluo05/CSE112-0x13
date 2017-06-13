'use strict';
/**
 *  Module that house all the API routes that pertains to appointment
 * @module routes/appointment
 */
let Appointment = require('../../models/Appointment');
let Conversation = require('../../models/Conversation');

/**
 * @function handleAll
 * @description  conversation handler
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.handleAll = function(req, res) {
    let conversation = new Conversation();
    let param = req.body.result.parameters;
    let sessionId = req.body.sessionId;

    // DEBUG
    console.log(param);

    // provided info
    conversation.conversation_id = sessionId;

    let query = {conversation_id: sessionId};
    Conversation.find(query, function(err, conversations) {
        // Error handling
        if(err) {
            console.log('error finding: ' + err);
            return res.status(400).json({error: 'Could not find'});
        }

        // if not found then we create a new conversation
        if(conversations.length==0) {
            conversation.save(function(err, ans) {
                if(err)
                    return res.status(400).json({error: 'Could Not Save'});
                return res.status(200).json(ans);
            });
        }

        // request body handling
        let update = {};
        if(param.first_name != undefined)
            update.first_name = param.first_name;
        if(param.last_name != undefined)
            update.last_name = param.last_name;
        if(param.phone_number != undefined)
            update.phone_number = param.phone_number;
        if(param.email != undefined)
            update.email = param.email;
        if(param.date != undefined)
            update.date = param.date;
        if(param.time != undefined)
            update.time = param.time;

        // update the database
        Conversation.update(query, update, function(err) {
            if(err) console.log(err);
        });

    });
};
