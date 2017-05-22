/* eslint-disable max-len */
'use strict';

/* This module is meant to house all of the API
 * routes that pertain to forms
 */
let express = require('express');
new express.Router();

let SubmittedForm = require('../../models/form/SubmittedForm');
let mongoose = require('mongoose');
let TemplateForm = require('../../models/form/FormTemplate');

/** ******** FORM TEMPLATE ROUTES **********/
module.exports.template = {};

module.exports.template.findByCompanyId = function(req, res) {
  TemplateForm.findOne({'_admin_id': req.params.id}, function(err, template) {
    if(err)
      res.status(400).json(
          {error: 'There was an error finding the template form.'});
    else
      res.status(200).json(template);
  });
};

module.exports.template.findByAdminId = function(req, res) {
  TemplateForm.findOne({'_admin_id': req.params.adminid},
      function(err, template) {
    if(err)
      res.status(400).json(
          {error: 'There was an error finding the template form.'});
    else
      res.status(200).json(template);
  });
};

module.exports.template.sendByAdminId = function(req, res) {
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

module.exports.template.create = function(req, res) {
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


/* Accept PUT request at /form/template */
module.exports.template.update = function(req, res) {
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

/* accept DELETE request at /form/template/:template_id */
module.exports.template.delete = function(req, res) {
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

/** ******** PATIENT FORM ROUTES **********/
module.exports.submitted_form = {};

module.exports.submitted_form.findById = function(req, res) {
  SubmittedForm.findOne({'_id': req.params.form_id}, function(err, submittedForm) {
    if (err) {
      res.status(400).json({error: 'An error occured while finding visitorList form'});
      return;
    }
    res.status(200).json(submittedForm);
  });
};

module.exports.submitted_form.create = function(req, res) {
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

module.exports.submitted_form.findByPatientInfo = function(req, res) {
  let query = {};
  let firstName = req.query.firstName;
  let lastName = req.query.lastName;
  let patientEmail = req.query.patientEmail;


  if(!((firstName && lastName) || patientEmail)) {
    res.status(400).json({error: 'You must specify either both first and last name or email'});
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
