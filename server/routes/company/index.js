'use strict';
let express = require('express');
let controller = require('./company.controller');
let router = new express.Router();

/**
 * @apiDefine CompanyData
 * @apiSuccess {string} _id ID of the company
 * @apiSuccess {string} name Name of the company
 * @apiSuccess {time} paid_time Time in which the company last made a payment
 * @apiSuccess {string} phone_number Phone number of the company
 * @apiSuccess {string} email Email fo the company
 * @apiSuccess {Date} create_time  time in which the company is created
 * @apiSuccess {Date} sub_expiration  time in which the subscription expires
 * @apiSuccess {int} num_months_subscribed  number of months subscribed thus far
 * @apiSuccess {int} revenue total amount paid by this company thus far
 * @apiSuccess {int} num_employees number of registered employees
 */

/**
 * @apiDefine CompaniesData
 * @apiSuccess {Company[]} Companies Info of all companies in <code>JSON</code> format
 * @apiSuccess {string} Companies._id id of company
 * @apiSuccess {string} Companies.name Name of company
 * @apiSuccess {time} Companies.paid_time Time in which the company last made a payment
 * @apiSuccess {string} Companies.phone_number the company's phone number
 * @apiSuccess {string} Companies.email the company's email
 * @apiSuccess {Date} Companies.create_time - time in which the company is created
 * @apiSuccess {Date} Companies.sub_expiration - time in which the subscription expires
 * @apiSuccess {int} Companies.num_months_subscribed - number of months subscribed
 *                                      thus far
 * @apiSuccess {int} Companies.revenue: total amount paid by this company thus far
 * @apiSuccess {int} Companies.num_employees number of registered employees
 */

/**
 *
 * @api {post} /api/companies Create company
 * @apiDescription This is used for create a company account
 * @apiName CompanyCreate
 * @apiGroup Company
 * @apiParam {string} email Email of the company to create
 * @apiParam {string} name Name of the company to create
 * @apiParam {string} phone_number Phone number of the company to create
 * @apiExample {HTTP} Example usage:
 *       POST /api/companies HTTP/1.1
 *       Host: localhost
 *       Content-Type: application/x-www-form-urlencoded
 *       name=companyName
 *       email=email@domain.com
 *       phone_number=5621234567
 * @apiUse CompanyData
 * @apiError (Error 400) UniqueEmailNeeded  email address is already used
 *              by a different company
 * @apiError (Error 400) CouldNotCreate failed to create the company
 */
router.post('/', controller.create);

/**
 *
 * @api {get}  /api/companies/:id Get company info
 * @apiDescription This is used for retrieving company info
 * @apiName GetCompanyInfo
 * @apiGroup Company
 * @apiParam {string} id the id of he company you want info on
 * @apiExample {HTTP} Example usage:
 *       GET /api/companies/id HTTP/1.1
 *       Host: localhost
 * @apiExample {curl} Example usage:
 *       curl http://localhost/api/companies/id
 * @apiUse CompanyData
 * @apiError (Error 400) CouldNotFind can't find company with given id
 */
router.get('/:id', controller.get);

/**
 *
 * @api {get} /api/companies/ Get info of all companies
 * @apiDescription This is used to acquire all companies public info
 * @apiName CompanyGetAll
 * @apiGroup Company
 * @apiUse CompaniesData
 *
 */
router.get('/', controller.getAll);

/**
 *
 * @api {put} /api/companies/:id Update company info
 * @apiDescription Change the info for a company
 * @apiName CompanyUpdate
 * @apiGroup Company
 *
 * @apiParam {string} id the company's id
 * @apiParam {string} [email] only include if you want to update the company's email
 * @apiParam {string} [name] only include if you want to update the company's name
 * @apiParam {string} [phone_number] only include if you want to update the company's
 *               phone number
 * @apiExample {HTTP} Example usage:
 *       PUT /api/companies/id HTTP/1.1
 *       Host: localhost
 *       Content-Type: application/x-www-form-urlencoded
 *       name=NewCompanyName
 * @apiUse CompanyData
 * @apiError (Error 400) CouldNotFind wrong company ID
 * @apiError (Error 400) CouldNotSave unable to save updated info
 *
 */
router.put('/:id', controller.update);


/**
 *
 * @api {delete} /api/companies/:id Delete company
 * @apiDescription deletes a comapny from company db
 * @apiName CompanyDelete
 * @apiGroup Company
 *
 * @apiParam {string} id id of the company to be deleted
 * @apiExample {HTTP} Example usage:
 *       DELETE /api/companies/id HTTP/1.1
 *       Host: localhost
 * @apiUse CompanyData
 * @apiError (Error 400) CouldNotFind Invalid company id
 * @apiError (Error 400) CouldNotRemove Can't remove company
 */
router.delete('/:id', controller.delete);

/**
 *
 * @api {put} /api/companies/setting/:user Reset Credentials
 * @apiDescription Change the credentials for a user in a company.
 * DON'T USE THIS, THIS IS BROKEN. STILL NEEDS TO BE FIX
 * @apiName CompanyResetCredentials
 * @apiGroup Company
 *
 * @apiParam {companyID} companyID the companiesID
 * @apiParam {string} email email of the person to reset
 * @apiParam {string} password new password
 *
 * @apiUse CompanyData
 *
 * @apiError (Error 400) CouldNotFind wrong company ID
 * @apiError (Error 400) CouldNotSave a connection problem
 */
router.put('/setting/:user', controller.resetCredentials);

/**
 *
 * @api {get} /api/companies/search/:match Search Companies
 * @apiDescription Search for companies that contains user-inputted string
 * @apiExample {HTTP} HTTP usage:
 *       GET /api/companies/search/match HTTP/1.1
 *       Host: localhost
 * @apiExample {curl} curl usage:
 *              curl -i http://localhost/api/companies/search/match
 * @apiName SearchForCompanies
 * @apiGroup Company
 *
 * @apiParam {string} match String to search for in companies
 *
 * @apiUse CompaniesData
 * @apiError (Error 400) CouldNotSearch database error
 */
router.get('/search/:match', controller.searchCompanies);

module.exports = router;
