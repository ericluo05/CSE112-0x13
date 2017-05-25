'use strict';

let express = require('express');
let controller = require('./company.controller');

let router = new express.Router();

/**
 *
 * @api {post} /company/ create
 * @apiDescription This is used for user sign up. Account creation.
 * @apiName CompanyCreate
 * @apiGroup Company
 *
 * @apiParam {FormInfo} email,name,phone_number,paid_time
 * @apiSuccess {JSON} companyInfo the company Info in JSON format should
                                  be what was passed in in JSON Format
 * @apiError CouldnotSave failed to save to server
 */
router.post('/', 			controller.template.create);

/**
 *
 * @api {get}  /company/:id get
 * @apiDescription This is used for user login
 * @apiName CompanyGet
 * @apiGroup Company
 *
 * @apiParam {companyID} companyID the id of he company you want info on
 * @apiSuccess {JSON} companyInfo the companies info in JSON format
 * @apiError CouldnotSave failed connection
 * @apiError CouldnotFind company does not exist
 */
router.get('/:id', 			controller.template.get);

/**
 *
 * @api {get} /company/ getAll
 * @apiDescription This is used to acquire all companies public info
 * @apiName CompanyGetAll
 * @apiGroup Company
 *
 * @apiSuccess {JSON} companyInfo all the companies info in JSON format
 *
 */
router.get('/', 			controller.template.getAll);

/**
 *
 * @api {put} /company/:id update
 * @apiDescription Change the info for a company
 * @apiName CompanyUpdate
 * @apiGroup Company
 *
 * @apiParam {companyID} ID the companies ID
 * @apiParam {formFields} email,name,phone_number only specify them
 * if you want to change them
 * @apiSuccess {JSON} companyInfo the companies info in JSON format
 * @apiError CouldNotFind wrong company ID
 * @apiError CouldnotSave a connection problem
 */
router.put('/:id', controller.template.update);

/**
 *
 * @api {delete} /company/:id delete
 * @apiDescription deletes a comapny from company db
 * @apiName CompanyDelete
 * @apiGroup Company
 *
 * @apiParam {companyID} ID the companies ID
 * @apiSuccess {JSON} companyInfo the companies info in JSON format
 * @apiError CouldNotFind wrong company ID
 * @apiError CouldnotSave a connection problem
 */
router.delete('/:id', controller.template.delete);

/**
 *
 * @api {put} /company/setting/:user resetCredentials
 * @apiDescription Change the info for a user in a company
 * @apiName CompanyResetCredentials
 * @apiGroup Company
 *
 * @apiParam {companyID} companyID the companiesID
 * @apiParam {string} email Users associated email
 * @apiParam {string} password password
 * @apiSuccess {JSON} companyInfo all the companies info in JSON format
 * @apiError CouldNotFind wrong company ID
 * @apiError CouldnotSave a connection problem
 */
router.put('/setting/:user', 	controller.template.resetCredentials);

module.exports = router;
