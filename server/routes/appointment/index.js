'use strict';

let express = require('express');
let controller = require('./appointment.controller');

let router = express.Router();

/**
 *
 * @api {post} /appointment/ create
 * @apiDescription This is used for Creating an appointment. Look at
 * appointment.controller.js create for more info
 * @apiName AppointmentCreate
 * @apiGroup Appointment
 *
 */

router.post('/', 			controller.template.create);

/**
 *
 * @api {get} /appointment/ get
 * @apiDescription This is used for looking up existant appointments. Look at
 * appointment.controller.js get for more info
 * @apiName AppointmentGet
 * @apiGroup Appointment
 *
 */

router.get('/:id', 			controller.template.get);

/**
 *
 * @api {get} /appointment/company/:id getAll
 * @apiDescription This is for getting all existant appointments. Look at
 * appointment.controller.js getAll for more info
 * @apiName AppointmentCreate
 * @apiGroup Appointment
 *
 */
router.get('/company/:id', 	controller.template.getAll);

/**
 *
 * @api {put} /appointment/:id update
 * @apiDescription This is used for updating an appointment. Look at
 * appointment.controller.js update for more info
 * @apiName AppointmentUpdate
 * @apiGroup Appointment
 *
 */

router.put('/:id', controller.template.update);

/**
 *
 * @api {delete} /appointment/:id delete
 * @apiDescription This is used for deleting an appointment. Look at
 * appointment.controller.js delete for more info
 * @apiName AppointmentDelete
 * @apiGroup Appointment
 *
 */

router.delete('/:id', controller.template.delete);



module.exports = router;
