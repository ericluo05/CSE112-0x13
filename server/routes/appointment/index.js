'use strict';
let express = require('express');
let controller = require('./appointment.controller');
let router = new express.Router();

/**
 * @apiDefine AppointmentData
 * @apiSuccess {String} _id ID of the the appointment
 * @apiSuccess {String} first_name first name of person
 * @apiSuccess {String} last_name last name of person
 * @apiSuccess {String} phone_number phone number of person
 * @apiSuccess {Date} date date of appointment
 * @apiSuccess {int} company_id id of the company that this appointment belongs to
 * @apiSuccess {String} provider_name name of provider
 */
/**
 * @apiDefine AppointmentsData
 * @apiSuccess {Appointment[]} Appointments Info of all appointments belonging to
 *                  a particular company in <code>JSON</code> format
 * @apiSuccess {String} Appointments._id ID of the the appointment
 * @apiSuccess {String} Appointments,first_name first name of person
 * @apiSuccess {String} Appointments,last_name last name of person
 * @apiSuccess {String} Appointments.phone_number phone number of person
 * @apiSuccess {Date} Appointments.date date of appointment
 * @apiSuccess {int} Appointments.company_id id of the company that this
 *      appointment belongs to
 * @apiSuccess {String} Appointments.provider_name name of provider
 */


/**
 *
 * @api {post} /api/appointments/ Create appt
 * @apiDescription This is used for Creating an appointment. Look at
 * appointment.controller.js create for more info
 * @apiName AppointmentCreate
 * @apiGroup Appointment
 * @apiParam {String} first_name first name of person
 * @apiParam {String} last_name last name of person
 * @apiParam {String} phone_number phone number of person
 * @apiParam {Date} date date of appointment
 * @apiParam {int} company_id id of the company that this appointment belongs to
 * @apiParam {String} provider_name name of provider
 * @apiUse AppointmentData
 * @apiError CouldNotFind no company exists with that company ID
 * @apiError (Error 400) CouldNotSave failed connection
 * @apiError (Error 400) AlreadyCreated an appointment already exists at that time
 *
 */
router.post('/', controller.create);

/**
 *
 * @api {get} /api/appointments/:id Get appt by id
 * @apiDescription This is used for looking up existant appointments. Look at
 * appointment.controller.js get for more info
 * @apiName AppointmentGet
 * @apiGroup Appointment
 *
 * @apiParam {int} id the ID of the appointment you seek
 * @apiUse AppointmentData
 * @apiError (Error 400) CouldNotFind appointment does not exist
 */
router.get('/:id', controller.get);

/**
 *
 * @api {get} /api/appointments/company/:id Get all appt of a company
 * @apiDescription This is for getting all existant appointments for a specific company.
 * Look at appointment.controller.js getAll for more info
 * @apiName AppointmentGetAll
 * @apiGroup Appointment
 *
 * @apiParam {int} id the ID for a company
 * @apiUse AppointmentsData
 * @apiError (Error 400) CouldNotFind company doesn't exist
 */
router.get('/company/:id', controller.getAll);

/**
 *
 * @api {put} /api/appointments/:id Update appt
 * @apiDescription This is used for updating an appointment. Look at
 * appointment.controller.js update for more info
 * @apiName AppointmentUpdate
 * @apiGroup Appointment
 *
 * @apiParam {int} id the ID for an appointment
 * @apiParam {String} [first_name] first name of person
 * @apiParam {String} [last_name] last name of person
 * @apiParam {String} [phone_number] phone number of person
 * @apiParam {Date} [date] date of appointment
 * @apiParam {String} provider_name name of provider
 * @apiUse AppointmentData
 * @apiError (Error 400) CouldNotFind could not find appointment with that ID
 * @apiError (Error 400) CouldNotSave connection error
 */
router.put('/:id', controller.update);

/**
 *
 * @api {delete} /api/appointments/:id Delete appt
 * @apiDescription This is used for deleting an appointment. Look at
 * appointment.controller.js delete for more info
 * @apiName AppointmentDelete
 * @apiGroup Appointment
 *
 * @apiParam {int} id the ID for an appointment
 * @apiUse AppointmentData
 * @apiError (Error 400) CouldNotSave connection Error
 * @apiError (Error 400) CouldNotFind no such id
 */
router.delete('/:id', controller.delete);


module.exports = router;
