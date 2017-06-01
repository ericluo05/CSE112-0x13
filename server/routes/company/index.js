/* eslint-disable max-len */
'use strict';
let express = require('express');
let controller = require('./company.controller');
let router = new express.Router();


/**
 *
 * @api {post} /api/companies create
 * @apiDescription This is used for create a company account
 * @apiName CompanyCreate
 * @apiGroup Company
 *
 * @apiParam {string} email Email of the company to create
 * @apiParam {string} name Name of the company to create
 * @apiParam {string} phone_number Phone number of the company to create
 *
 * @apiExample {curl} Example usage:
 *       curl -X POST  -d {"email":"newEmail@email.com", "name":"companyName", "phone_number":"6261234567"} http://localhost/api/companies
 * @apiSuccess {string} _id ID of the company created
 * @apiSuccess {string} name Name of the company created
 * @apiSuccess {time} paid_time Time in which the company last made a payment (or created)
 * @apiSuccess {string} phone_number Phone number of the company just created
 * @apiSuccess {string} email Email fo the company just created
 * @apiError (Error 400) UniqueEmailNeeded  email address is already used by a different company
 * @apiError (Error 400) CouldNotCreate failed to create the company
 */
router.post('/', controller.create);

/**
 *
 * @api {get}  /api/companies/:id get
 * @apiDescription This is used for retrieving company info
 * @apiName GetCompanyInfo
 * @apiGroup Company
 *
 * @apiParam {string} id the id of he company you want info on
 *
 * @apiExample {curl} Example usage:
 *       curl http://localhost/api/companies/CompanyIDHere
 *
 * @apiSuccess {string} name Name of the company retrieved
 * @apiSuccess {string} _id ID of the company retrieved
 * @apiSuccess {time} paid_time Time in which the company last made a payment,
 *  or in current case, time in which the company is created using server time
 * @apiSuccess {string} phone_number Phone number of the company retrieved
 * @apiSuccess {string} email Email of the company retrieved
 *
 * @apiError (Error 400) CouldNotFind can't find company with given id
 */
router.get('/:id', controller.get);

/**
 *
 * @api {get} /api/companies/ getAll
 * @apiDescription This is used to acquire all companies public info
 * @apiName CompanyGetAll
 * @apiGroup Company
 *
 * @apiSuccess {Company[]} Companies All companies in JSON format
 * @apiSuccess {string} Companies.name Name of company
 * @apiSuccess {string} Companies._id id of company
 * @apiSuccess {time} Companies.paid_time Time in which the company last made a payment
 * @apiSuccess {string} Companies.phone_number the company's phone number
 * @apiSuccess {string} Companies.email the company's email
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
 * @apiParam {string} id the company's id
 * @apiParam {string} [email] only include if you want to update the company's email
 * @apiParam {string} [name] only include if you want to update the company's name
 * @apiParam {string} [phone_number] only include if you want to update the company's
 *               phone number
 * @apiExample {curl} Example usage:
 *              curl -X PUT  -d {"email":"newEmail@email.com"} http://localhost/api/companies/CompanyIDHere
 * @apiSuccess {string} _id ID of the company updated
 * @apiSuccess {string} name [new]Name of the company updated
 * @apiSuccess {time} paid_time Time in which the company last made a payment,
 *  or in current case, time in which the company is created using server time
 * @apiSuccess {string} phone_number [new]Phone number of the company updated
 * @apiSuccess {string} email [new]Email of the company updated
 *
 * @apiError (Error 400) CouldNotFind wrong company ID
 * @apiError (Error 400) CouldNotSave unable to save updated info
 *
 */
router.put('/:id', controller.update);


/**
 *
 * @api {delete} /api/companies/:id delete
 * @apiDescription deletes a comapny from company db
 * @apiName CompanyDelete
 * @apiGroup Company
 *
 * @apiParam {string} id id of the company to be deleted
 * @apiExample {curl} Example usage:
 *              curl -X DELETE  http://localhost/api/companies/CompanyIDHere
 * @apiSuccess {string} _id id of the company deleted
 * @apiSuccess {string} name Name of the company deleted
 * @apiSuccess {time} paid_time Time in which the company last made a payment,
 *  or in current case, time in which the company is created using server time
 * @apiSuccess {string} phone_number the company's phone number
 * @apiSuccess {string} email the company's email
 * @apiError (Error 400) CouldNotFind Invalid company id
 * @apiError (Error 400) CouldNotRemove Can't remove company
 */
router.delete('/:id', controller.delete);

/**
 *
 * @api {put} /api/companies/setting/:user resetCredentials
 * @apiDescription Change the credentials for a user in a company.
 * DON'T USE THIS, THIS IS BROKEN. STILL NEEDS TO BE FIX
 * @apiName CompanyResetCredentials
 * @apiGroup Company
 *
 * @apiParam {companyID} companyID the companiesID
 * @apiParam {string} email email of the person to reset
 * @apiParam {string} password new password
 *
 * @apiSuccess {JSON} companyInfo all the companies info in JSON format
 *
 * @apiError (Error 400) CouldNotFind wrong company ID
 * @apiError (Error 400) CouldNotSave a connection problem
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
 * @apiError (Error 400) CouldNotFind wrong company ID
 * @apiError (Error 400) CouldNotSave a connection problem
 */
router.get('/dur/:id', controller.getSubDuration);

/**
 *
 * @api {get} /api/companies/search/:match searchCompanies
 * @apiDescription Search for companies that contains user-inputted string
 * @apiExample {curl} Example usage:
 *              curl -i http://localhost/api/companies/search/TextToMatch
 * @apiName SearchForCompanies
 * @apiGroup Company
 *
 * @apiParam {string} match String to search for in companies
 *
 * @apiSuccess {Company[]} Companies Companies in JSON format
 * @apiSuccess {string} Companies.name Name of company
 * @apiSuccess {string} Companies._id id of company
 * @apiSuccess {time} Companies.paid_time Time in which the company last made a payment
 * @apiSuccess {string} Companies.phone_number the company's phone number
 * @apiSuccess {string} Companies.email the company's email
 * @apiError (Error 400) CouldNotSearch database error
 */
router.get('/search/:match', controller.searchCompanies);

module.exports = router;
