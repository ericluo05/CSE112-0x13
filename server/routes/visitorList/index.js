'use strict';

let express = require('express');
let controller = require('./visitorList.controller');

let router = new express.Router();

/**
 * @api {post} / CreateNewVisitor
 * @apiName CreateNewVisitor
 * @apiGroup VisitorList
 * @apiDescription Creates a new vistor when they check in.
 * @apiSuccess {JSON} result The result code upon deletion of the visitor.
 * @apiFailure {JSON} error_msg The JSONified error message.
 */
router.post('/', controller.createReq);

/**
 * @api {get} /company/:id GetCompanyByID
 * @apiName GetCompanyByID
 * @apiGroup VisitorList
 * @apiDescription Gets a company's visitor list by their company ID.
 * @apiParam {String} id The company's ID.
 * @apiSuccess {JSON} result The result code upon deletion of the visitor.
 * @apiFailure {JSON} error_msg The JSONified error message.
 */
router.get('/company/:id', controller.getCompanyVisitorListReq);

/**
 * @api {delete} /company/:company_id/visitor/:visitor_id DeleteVisitorByID
 * @apiName DeleteVisitorByID
 * @apiGroup VisitorList
 * @apiDescription Deletes a specific visitor from a company's visitor list.
 * @apiParam {String} company_id The ID of the company whose list we want to modify.
 * @apiParam {String} visitor_id The ID of visitor from that company's visitor list.
 * @apiSuccess {JSON} result The result code upon deletion of the visitor.
 * @apiFailure {JSON} error_msg The JSONified error message.
 */
router.delete('/company/:company_id/visitor/:visitor_id',
    controller.deleteVisitorReq);

/**
 * @api {delete} /:id DeleteVisitorListByID
 * @apiName DeleteVisitorListByID
 * @apiGroup VisitorList
 * @apiDescription Deletes (clears) the specific visitor list.
 * @apiParam {String} id The ID of the visitor list we want to clear.
 * @apiSuccess {JSON} result The result code upon clearing.
 * @apiFailure {JSON} error_msg The JSONified error message.
 */
router.delete('/:id', controller.deleteReq);

module.exports = router;
