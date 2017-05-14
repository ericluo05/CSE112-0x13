'use strict';

var express = require('express');
var controller = require('./form.controller');

var router = express.Router();

var bodyparser = require('body-parser');
var urlparser = bodyparser.urlencoded({extended: false});

router.get('/template/company/:id', controller.template.findByCompanyId);
router.get('/template/:adminid',controller.template.findByAdminId);
router.post('/template/:adminid',controller.template.sendByAdminId);
router.post('/template', controller.template.create);
router.put('/template', controller.template.update);
router.delete('/template/:template_id', controller.template.delete);

router.get('/visitorList/:form_id', controller.submitted_form.findById);
router.get('/visitorList', controller.submitted_form.findByPatientInfo);
router.post('/visitorList', controller.submitted_form.create);

module.exports = router;