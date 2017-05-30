'use strict';
let express = require('express');
let controller = require('./appointment.controller');
let router = new express.Router();

/**
 *
 * @api {post} api/appointment/ create
 * @apiDescription This is used for Creating an appointment. Look at
 * appointment.controller.js create for more info
 * @apiName AppointmentCreate
 * @apiGroup Appointment
 *
 * @apiParam {String} first_name first name of person
 * @apiParam {String} last_name last name of person
 * @apiParam {String} phone_number phone number of person
 * @apiParam {Date} date date of appointment
 * @apiParam {int} company_id id of the company that this appointment belongs to
 * @apiParam {String} provider_name Don't know
 * @apiSuccess {JSON} appointment the newly created appointment
 * @apiError CouldNotFind no company exists with that company ID
 * @apiError CouldNotSave failed connection
 * @apiError AlreadyCreated an appointment already exists at that time
 *
 */
router.post('/', controller.create);

/**
 *
 * @api {get} api/appointment/:id get
 * @apiDescription This is used for looking up existant appointments. Look at
 * appointment.controller.js get for more info
 * @apiName AppointmentGet
 * @apiGroup Appointment
 *
 * @apiParam {int} id the ID of the appointment you seek
 * @apiSuccess {JSON} appointment the appointment with that id
 * @apiError CouldNotFind appointment does not exist
 */
router.get('/:id', controller.get);

/**
 *
 * @api {get} /appointment/company/:id getAll
 * @apiDescription This is for getting all existant appointments for a specific company.
 * Look at appointment.controller.js getAll for more info
 * @apiName AppointmentCreate
 * @apiGroup Appointment
 *
 * @apiParam {int} id the ID for a company
 * @apiSuccess {JSON} allAppointments The set of all appointments for a company
 * @apiError CouldNotFind company doesn't exist
 */
router.get('/company/:id', controller.getAll);

/**
 *
 * @api {put} api/appointment/:id update
 * @apiDescription This is used for updating an appointment. Look at
 * appointment.controller.js update for more info
 * @apiName AppointmentUpdate
 * @apiGroup Appointment
 *
 * @apiParam {int} id the ID for an appointment
 * @apiParam {String} first_name first name of person
 * @apiParam {String} last_name last name of person
 * @apiParam {String} phone_number phone number of person
 * @apiParam {Date} date date of appointment
 * @apiParam {int} company_id id of the company that this appointment belongs to
 * @apiParam {String} provider_name Don't know
 * @apiSuccess {JSON} appointment the new updated appointment
 * @apiError CouldNotFind could not find appointment with that ID
 * @apiError CouldNotSave connection error
 */
router.put('/:id', controller.update);

/**
 *
 * @api {delete} api/appointment/:id delete
 * @apiDescription This is used for deleting an appointment. Look at
 * appointment.controller.js delete for more info
 * @apiName AppointmentDelete
 * @apiGroup Appointment
 *
 * @apiParam {int} id the ID for an appointment
 * @apiSuccess {JSON} appointment JSON for the appointment you just deleted
 * @apiError CouldNotSave connection Error
 * @apiError CouldNotFind no such id
 */
router.delete('/:id', controller.delete);


module.exports = router;
