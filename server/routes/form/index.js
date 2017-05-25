'use strict';

let express = require('express');
let controller = require('./form.controller');

let router = new express.Router();

let bodyparser = require('body-parser');
// let urlparser = bodyparser.urlencoded({extended: false});
bodyparser.urlencoded({extended: false});

/**
 *
 * @apiGroup Employee
 *
 */

router.get('/template/company/:id', controller.findByCompanyId);
router.get('/template/:adminid', controller.findByAdminId);
router.post('/template/:adminid', controller.sendByAdminId);
router.post('/template', controller.create);
router.put('/template', controller.update);
router.delete('/template/:template_id', controller.delete);

router.get('/visitorList/:form_id', controller.submitted_form_findById);
router.get('/visitorList', controller.submitted_form_findByPatientInfo);
router.post('/visitorList', controller.submitted_form_create);

module.exports = router;
