'use strict';

let express = require('express');
let controller = require('./form.controller');

let router = new express.Router();

let bodyparser = require('body-parser');
// let urlparser = bodyparser.urlencoded({extended: false});
bodyparser.urlencoded({
    extended: false
});

/**
 * @api {get} /template/company/:id getTemplateByCompanyId
 * @apiDescription This is used for finding a form for a company by its ID.
 * @apiName FindFormByCompanyId
 * @apiGroup Form
 * @apiParam {id} CompanyID the ID of the company we want to see.
 * @apiSuccess {JSON} form the form containing the particular public company info in JSON format.
 * @apiError {JSON} error There was an error finding the template form.
 */
router.get('/template/company/:id', controller.findByCompanyId);

/**
 * @api {get} /template/:adminid getTemplateByAdminId
 * @apiDescription This is used for finding a form for a particular admin by their adminID
 * @apiName FindFormByAdminId
 * @apiGroup Form
 * @apiParam {adminid} AdminID the ID of the company we want to see.
 * @apiSuccess {JSON} form the templated form for a specific admin.
 * @apiError {JSON} error There was an error finding the template form.
 */
router.get('/template/:adminid', controller.findByAdminId);

/**
 * @api {post} /template/:adminid postTemplateByAdminId
 * @apiDescription This is used for submitting a new form template for a particular admin.
 * @apiName PostTemplateByAdminId
 * @apiGroup Form
 * @apiParam {adminid} AdminID the ID of the admin this new form pertains to.
 * @apiSuccess The template, if not existing, is created. Else, it is updated.
 * @apiError {JSON} error There was an error finding the template form.
 */
router.post('/template/:adminid', controller.sendByAdminId);

/**
 * @api {post} /template postTemplate
 * @apiDescription This call to create a new template with a random adminID.
 * @apiName PostTemplate
 * @apiGroup Form
 * @apiSuccess {JSON} successJson resultant JSON form of the newly created template.
 * @apiError {JSON} errorJson Error from Mongoose as a JSON.
 */
router.post('/template', controller.create);

/**
 * @api {put} /template putTemplate
 * @apiDescription This call updates the template.
 * @apiName PutTemplate
 * @apiGroup Form
 * @apiSuccess {JSON} json resultant JSON form of the updated form.
 * @apiError {JSON} error There was problem removing the form template.
 */
router.put('/template', controller.update);

/**
 * @api {delete} /template/:template_id deleteTemplateByTemplateId
 * @apiDescription This is used to delete a particular template.
 * @apiName DeleteTemplateByTemplateId
 * @apiGroup Form
 * @apiParam {template_id} TemplateID the ID of the template we want to delete.
 * @apiSuccess {JSON} A success code from the TemplateForm.findOneAndRemove() call, in JSON format.
 * @apiError {JSON} error Need a template id.
 * @apiError {JSON} error There was problem removing the form template.
 */
router.delete('/template/:template_id', controller.delete);

/**
 * @api {get} /visitorList/:form_id getVisitorListByFormId
 * @apiDescription This is used to get the visitor list with a specific form ID.
 * @apiName GetVisitorListByFormId
 * @apiGroup VisitorList
 * @apiParam {form_id} FormId the form ID containg the visitor list we want to see.
 * @apiSuccess {JSON} SubmittedForm The form containing the visitor list.
 * @apiError {JSON} error An error occured while finding visitorList form
 */
router.get('/visitorList/:form_id', controller.submitted_form_findById);

  let firstName = req.query.firstName;
  let lastName = req.query.lastName;
  let patientEmail = req.query.patientEmail;
/**
 * @api {get} /visitorList getVisitorListByPatientInfo
 * @apiDescription This is used to get a visitor list by patient info.
 * @apiName GetVisitorList
 * @apiGroup VisitorList
 * @apiParam {String} firstName The patient's first name.
 * @apiParam {String} lastName The patient's last name.
 * @apiParam {String} patientEmail The patient's email.
 * @apiSuccess {JSON} SubmittedForm The form containing the visitor list for the particular patient.
 * @apiError {JSON} error An error occured while finding visitorList form
 */
router.get('/visitorList', controller.submitted_form_findByPatientInfo);

/**
 * @api {post} /visitorList postVisitorList
 * @apiDescription This is used to create a new visitor list.
 * @apiName PostVisitorList
 * @apiGroup VisitorList
 * @apiSuccess {JSON} SubmittedForm The newly created form containing the visitor list.
 * @apiError {JSON} error An error occured while finding visitorList form
 */
router.post('/visitorList', controller.submitted_form_create);

module.exports = router;
