'use strict';
/**
 *  Module that house all the API routes that pertains to appointment
 * @module routes/appointment
 */
let Appointment = require('../../models/Appointment');

/**
 * @function create
 * @description  handler to create an appointment
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.create = function(req, res) {
    let appointment = new Appointment();
    let param = req.body;

    // require provided info
    appointment.first_name = param.first_name;
    appointment.last_name = param.last_name;
    appointment.phone_number = param.phone_number;
    appointment.date = param.date;
    appointment.company_id = param.company_id;
    appointment.provider_name = param.provider_name;

    Appointment.find(
        {
            company_id: param.company_id,
            date: param.date,
        }, function(err, appointments) {
            if(err) return res.status(400).json({error: 'Could Not Find'});
            if(appointments.length==0) {
                appointment.save(function(err, a) {
                    if (err)
                        return res.status(400).json({error: 'Could Not Save'});
                    return res.status(200).json(a);
                });
            }else{
                return res.status(400).json({error: 'Already Created'});
            }
        });
};

/**
 * @function getAll
 * @description  handler to all appointment of a company
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.getAll = function(req, res) {
    Appointment.find({company_id: req.params.id}, function(err, result) {
            if(err) {
                return res.status(400).json(err);
            }
            return res.status(200).json(result);
        });
};

/**
 * @function get
 * @description  handler to get an appointment
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.get = function(req, res) {
    Appointment.findOne({_id: req.params.id}, function(err, a) {
        if(err || !a)
            return res.status(400).send({error: 'Could Not Find'});
        return res.status(200).json(a);
    });
};

/**
 * @function update
 * @description  handler to update an appointment
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.update = function(req, res) {
    Appointment.findOne({_id: req.params.id}, function(err, a) {
        if(err || !a)
            return res.status(401).json({error: 'Could Not Find'});

        if (req.body.first_name !== undefined)
            a.first_name = req.body.first_name;

        if (req.body.last_name !== undefined)
            a.last_name = req.body.last_name;

        if (req.body.phone_number !== undefined)
            a.phone_number = req.body.phone_number;

        if (req.body.date!== undefined)
            a.date = req.body.date;
        if (req.body.provider_name!== undefined)
            a.provider_name = req.body.provider_name;
        // TODO check if the date is taken already
        a.save(function(err) {
            if(err) {
                return res.status(400).json({error: 'Could Not Save'});
            }
            return res.status(200).json(a);
        });
    });
};

/**
 * @function delete
 * @description  handler to delete an appointment
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.delete = function(req, res) {
    Appointment.findById(req.params.id, function(err, a) {
        if(err)
            res.status(400).json({error: 'Could Not Find'});
        a.remove(function(err) {
            if(err) {
                res.status(400).json({error: 'Could Not Save'});
            } else {
                return res.status(200).json(a);
            }
        });
    });
};
