'use strict';
/**
 *  Module that house all the API routes that pertains to forms
 * @module routes/form
 */
let SubmittedForm = require('../../models/form/SubmittedForm');
let mongoose = require('mongoose');
let TemplateForm = require('../../models/form/FormTemplate');

/**
 * @function findByCompanyId
 * @description  handler to find form with company id
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.findByCompanyId = function(req, res) {
  TemplateForm.findOne({'_admin_id': req.params.id}, function(err, template) {
    if(err)
      res.status(400).json(
          {error: 'There was an error finding the template form.'});
    else
      res.status(200).json(template);
  });
};

/**
 * @function findByAdminId
 * @description  handler to find form with admin id
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.findByAdminId = function(req, res) {
  TemplateForm.findOne({'_admin_id': req.params.adminid},
      function(err, template) {
    if(err)
      res.status(400).json(
          {error: 'There was an error finding the template form.'});
    else
      res.status(200).json(template);
  });
};

/**
 * @function sendByAdminId
 * @description  handler to find template form with admin id
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.sendByAdminId = function(req, res) {
  TemplateForm.findOne({'_admin_id': req.params.adminid},
      function(err, template) {
    if(err)
      res.status(400).json({
          error: 'There was an error finding the template form.'});
    else if(!template) {// if doesn't exist
      createWithAdminId(req, res);
    } else{
      updateWithAdminId(req, res);
    }
  });
};

/**
 * @function create
 * @description  handler to create a new template form
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.create = function(req, res) {
  let newTemplate = new TemplateForm();
  newTemplate._admin_id = new mongoose.Types.ObjectId(req.body._admin_id);
  newTemplate.template = req.body.template;

  newTemplate.save(function(err, template) {
    if(err)
        res.status(400).json(err);
    else
      res.status(200).json(template);
  });
};

/**
 * @function update
 * @description  handler to update template form
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.update = function(req, res) {
    let update = {template: req.body.template};
    let options = {new: true};

    TemplateForm.findOneAndUpdate({_id: req.body.template_id}, update, options,
      function(err, template) {
          if(err)
            res.status(400).json({error: 'There was an error updating a template.'});
          else
            res.status(200).json(template);
      });
};

/**
 * @function delete
 * @description  handler to find delete template form
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.delete = function(req, res) {
    /* Get id param from request */
    let templateID = req.params.template_id;

    if(!templateID) {
      res.status(400).json({error: 'need a template id'});
      return;
    }

    TemplateForm.findOneAndRemove({_id: templateID}, function(err, result) {
      if(err) {
        res.status(400).json({error: 'There was problem removing the form template'});
        return;
      }
      res.status(200).json(result);
    });
};


/**
 * @function submitted_form_findById
 * @description  handler to find submitted form with  id
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.submitted_form_findById = function(req, res) {
  SubmittedForm.findOne({'_id': req.params.form_id}, function(err, submittedForm) {
    if (err) {
      res.status(400).json({error: 'An error occured while finding visitorList form'});
      return;
    }
    res.status(200).json(submittedForm);
  });
};

/**
 * @function submitted_form_create
 * @description  handler to create submitted form
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
module.exports.submitted_form_create = function(req, res) {
  let form = new SubmittedForm();
  form.form = req.body.form;
  form._admin_id = req.body._admin_id;
  form.firstName = req.body.firstName;
  form.lastName = req.body.lastName;
  form.patientEmail = req.body.patientEmail;
  form.date = new Date();
  form.save(function(err, savedForm) {
    if (err) {
      res.status(400).json({error: 'An error occured while saving the submitted form'});
    }
    res.status(200).json(savedForm);
  });
};

/**
 * @function submitted_form_findByPatientInfo
 * @description  handler to find form with company id
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
module.exports.submitted_form_findByPatientInfo = function(req, res) {
  let query = {};
  let firstName = req.query.firstName;
  let lastName = req.query.lastName;
  let patientEmail = req.query.patientEmail;


  if(!((firstName && lastName) || patientEmail)) {
    res.status(400).json({error: 'You must specify either both ' +
    'first and last name or email'});
    return;
  }
  if(firstName) query.firstName = firstName;
  if(lastName) query.lastName = lastName;
  if(patientEmail) query.patientEmail = patientEmail;

  if(req.query.mostRecent == 'true') {
    SubmittedForm.findOne(query).sort('-date').exec(function(err, submittedForm) {
      if (err) {
        res.status(400).json({error: 'An error occured while finding visitorList form'});
        return;
      }
      res.status(200).json(submittedForm);
    });
  } else {
      SubmittedForm.findOne(query, function(err, submittedForms) {
      if (err) {
        res.status(400).json({error: 'An error occured while finding visitorList forms'});
        return;
      }
      res.status(200).json(submittedForms);
    });
  }
};


/*
 // not used, even though it makes sense for only allowing
 // admin to create form
 function createWithAdminId(req, res) {
 let newTemplate = new TemplateForm();
 newTemplate._admin_id = req.params.adminid;
 newTemplate.template = req.body.template;

 newTemplate.save(function(err, template) {
 if(err)
 return res.status(400).json(err);
 else
 return res.status(200).json(template);
 });
 }

 // not used, even though it makes sense for only allowing
 // admin to update form
 function updateWithAdminId(req, res) {
 let update = {template: req.body.template};

 TemplateForm.findOneAndUpdate({_admin_id: req.params.adminid}, update,
 function(err, template) {
 if(err)
 return res.status(400).json(
 {error: 'There was an error updating a template.'});
 else
 return res.status(200).json(template);
 });
 }
 */
