'use strict';
let express = require('express');
let controller = require('./company.controller');
let router = new express.Router();

/**
 *
 * @api {post} /api/companies/create
 * @apiDescription This is used for user sign up. Account creation.
 * @apiName CompanyCreate
 * @apiGroup Company
 *
 * @apiParam {FormInfo} email,name,phone_number,paid_time
 * @apiSuccess {JSON} companyInfo the company Info in JSON format should
                                  be what was passed in in JSON Format
 * @apiError CouldnotSave failed to save to server
 */
router.post('/', controller.create);

/**
 *
 * @api {get}  /api/companies/:id get
 * @apiDescription This is used for user login
 * @apiName CompanyGet
 * @apiGroup Company
 *
 * @apiParam {companyID} companyID the id of he company you want info on
 * @apiSuccess {JSON} companyInfo the companies info in JSON format
 * @apiError CouldnotSave failed connection
 * @apiError CouldnotFind company does not exist
 */
router.get('/:id', controller.get);

/**
 *
 * @api {get} /api/companies/ getAll
 * @apiDescription This is used to acquire all companies public info
 * @apiName CompanyGetAll
 * @apiGroup Company
 *
 * @apiSuccess {JSON} companyInfo all the companies info in JSON format
 *
 */
router.get('/', controller.getAll);

/**
 *
 * @api {put} /api/companies/:id update
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
router.put('/:id', controller.update);

/**
 *
 * @api {delete} /api/companies/:id delete
 * @apiDescription deletes a comapny from company db
 * @apiName CompanyDelete
 * @apiGroup Company
 *
 * @apiParam {companyID} ID the companies ID
 * @apiSuccess {JSON} companyInfo the companies info in JSON format
 * @apiError CouldNotFind wrong company ID
 * @apiError CouldnotSave a connection problem
 */
router.delete('/:id', controller.delete);

/**
 *
 * @api {put} /api/companies/setting/:user resetCredentials
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
router.put('/setting/:user', controller.resetCredentials);

/**
 *
 * @api {get} /api/companies/dur/:id getSubDuration
 * @apiDescription Get user subscription duration for admin panel
 * @apiExample {curl} Example usage:
 *              curl -i http://localhost/api/companies/dur/IDhere123456
 * @apiName CompanyGetSubDuration
 * @apiGroup Company
 *
 * @apiParam {string} ID the companies ID
 * @apiSuccess {JSON} companyPrivateInfo the companies info in JSON format
 * @apiError CouldNotFind wrong company ID
 * @apiError CouldnotSave a connection problem
 */
router.get('/dur/:id', controller.getSubDuration);

/**
 *
 * @api {get} /api/companies/search/:match searchCompanies
 * @apiDescription Search for companies that contains user-inputted string
 * @apiExample {curl} Example usage:
 *               This will search for all companies whose name has 'Emis' in it
 *              curl -i http://localhost/api/companies/search/Emis
 * @apiName SearchForCompanies
 * @apiGroup Company
 *
 * @apiParam {string} match String to search for in companies
 * @apiSuccess {Company[]} Companies Companies in JSON format
 * @apiSuccess {string} Companies.name Name of company
 * @apiSuccess {string} Companies._id id of company
 * @apiSuccess {time} Companies.paid_time Time in which the company last made a payment
 * @apiSuccess {string} Companies.phone_number the company's phone number
 * @apiSuccess {string} Companies.email the company's email
 * @apiSuccess {uhh} Companies._v No idea what this is for
 * @apiError CouldNotSearch database error
 */
router.get('/search/:match', controller.searchCompanies);

module.exports = router;
