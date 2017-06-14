'use strict';
/**
 *  Module that house all the API routes that pertains to appointment
 * @module routes/appointment
 */
let Appointment = require('../../models/Appointment');
let Conversation = require('../../models/Conversation');
let Company = require('../../models/Company');

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

    // provided info
    conversation.conversation_id = sessionId;

    let conversationQuery = {
        conversation_id: sessionId,
    };

    Conversation.find(conversationQuery, function(err, conversations) {
        // Error handling
        if(err) {
            console.log('error finding: ' + err);
            return res.status(400).json({error: 'Could not find'});
        }

        // if not found then we create a new conversation
        if(conversations.length===0) {
            if(!param.company) {
                console.log('did not specify company');
                return res.status(400).json({
                    displayText: 'Company not specified. Please try again.',
                });
            }

            // Find the company that its making the query
            let companyQuery = {name: param.company};
            Company.findOne(companyQuery, function(err, company) {
                // handle error
                if(err) {
                    console.log('error finding: ' + err);
                    return res.status(400).json({error: 'Could not find company'});
                }

                // If company not found, then notify the user
                if(!company) {
                    console.log('company not found');
                    return res.status(400).json({
                        displayText: 'Company not found. Please try again. ',
                    });
                } else{
                    // if found then store company_id in conversation object
                    conversation.company_id = company._id;
                    conversation.save(function(err, ans) {
                        if(err)
                            return res.status(400).json({error: 'Could Not Save'});
                        return res.status(200).json(ans);
                    });
                }
            });
        }

        // Variables created for updating Appointment
        let update = {};
        let updateDone = false;

        // request body handling
        if(param.first_name !== undefined)
            update.first_name = param.first_name;
        if(param.last_name !== undefined)
            update.last_name = param.last_name;
        if(param.date !== undefined)
            update.date = param.date;
        if(param.time !== undefined)
            update.time = param.time;
        if(param.phone_number !== undefined)
            update.phone_number = param.phone_number;
        if(param.email !== undefined) {
            update.email = param.email;
            updateDone = true;
        }

        // update the database
        Conversation.findOneAndUpdate(conversationQuery, update,
            function(err, foundConv) {
                if (err) console.log(err);

                // TODO: if no more update, update Appointment
                if (updateDone) {
                    // make an appointment
                    let appointment = new Appointment();
                    appointment.first_name = foundConv.first_name;
                    appointment.last_name = foundConv.last_name;
                    appointment.phone_number = foundConv.phone_number;
                    appointment.date = foundConv.date;
                    appointment.provider_name = 'Conversation';
                    appointment.company_id = foundConv.company_id;

                    // save the appointment
                    appointment.save(function(err, ans) {
                        if (err)
                            console.log(err);
                        else
                            console.log(ans);
                    });
                }
            });
    });
};

