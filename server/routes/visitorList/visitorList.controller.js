/* eslint-disable camelcase */
'use strict';
/**
 *  Module that house all the API routes that pertains to forms
 * @module routes/visitorlist
 */
 let Email = require('../../notification/email');
 let SMS = require('../../notification/text');
 let Employee = require('../../models/Employee');
let VisitorList = require('../../models/VisitorList');
let Appointment = require('../../models/Appointment');

/* handles route for getting the Company's visitor list */
/**
 * @function create
 * @description  handler to create a theme
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.getCompanyVisitorListReq = function(req, res) {
    let company_id=req.params.id;
    exports.getCompanyVisitorList(company_id, function(err_msg, result) {
        if(err_msg) return res.status(400).json(err_msg);
        if(result == null) {
            result = new VisitorList();
            result.visitors = [];
            result.company_id=companyId;
            result.save(function(err) {
                return res.status(200).json(result);
            });
        }else {
            return res.status(200).json(result);
        }
    });
};


// This route will be called when a visitor checks in
/**
 * @function createReq
 * @description  handler to create a check in
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.createReq = function(req, res) {
    exports.create(req.body, function(err_msg, result) {
        if(err_msg) return res.status(400).json(err_msg);
        return res.status(200).json(result);
    });
};


/* handles route to delete visitor in the list*/
/**
 * @function deleteVisitorReq
 * @description  handler to create a theme
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.deleteVisitorReq = function(req, res) {
    let visitor_id=req.params.visitor_id;
    let company_id=req.params.company_id;
    exports.deleteVisitor(company_id, visitor_id, function(err_msg, result) {
        if(err_msg) return res.status(400).json(err_msg);
        return res.status(200).json(result);
    });
};


/**
 * @function deleteReq
 * @description  handler to clear visitor list
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.deleteReq = function(req, res) {
    let list_id=req.params.id;
    exports.delete(list_id, function(err_msg, result) {
        if(err_msg) return res.status(400).json(err_msg);
        return res.status(200).json(result);
    });
};


/**
 * @function getCompanyVisitorList
 * @description  handler to create a theme
 * @param {int} company_id - company id
 * @param {callback} callback - callback function
 * @return {callback} callback function
 */
exports.getCompanyVisitorList = function(company_id, callback) {
    if(!company_id)
        return callback({error: 'Please send company id.'}, null);
    VisitorList.findOne({company_id: company_id}, function(err, list) {
        if(err) return callback({error: 'Getting Visitor List'}, null);
        if(list==null) {
            list = new VisitorList();
            list.visitors=[];
            list.company_id = company_id;
        }
        list.save(function(err) {
            if(err)return callback({error: 'Error in saving'}, null);
            return callback(null, list);
        });
    });
};


/**
 * @function deleteVisitor
 * @description  handler to delete visitor from a list
 * @param {int} company_id - compnay id
 * @param {visitor_id} visitor_id -  visitor id
 * @param {callback} callback function
 * @return {callback} callback function
 */
exports.deleteVisitor = function(company_id, visitor_id, callback) {
    if(!company_id)
        return callback({error: 'Please send company id.'}, null);
    if(!visitor_id)
        return callback({error: 'Please send visitorList id.'}, null);
    VisitorList.findOneAndUpdate(
        {company_id: company_id},
        {$pull: {visitors: {_id: visitor_id}}},
        {safe: true, upsert: true, new: true}, function(err, data) {
            if(err) return callback({error: 'Can\'t update list'}, null);
            return callback(null, data);
        });
};


/**
 * @function delete
 * @description  Don't know what this function is doing
 * @param {array} list_id - don't know what this is
 * @param {callback} callback - callback function
 * @return {callback} callback function
 */
exports.delete = function(list_id, callback) {
    if(!list_id)
        return callback({error: 'Please send list id.'}, null);
    VisitorList.findOne({_id: list_id}, function(err, list) {
        if(err || list==null)
            return callback({error: 'Can\'t find company'}, null);
        list.visitors=[];
        list.save(function(err) {
            if(err)
                return callback({error: 'Can\'t save'}, null);
            return callback(null, list);
        });
    });
};


/**
 * @function create
 * @description  this is used by handler that creates visitor
 * @param {array} param - list of parameters
 * @param {callback} callback - callback function
 */
exports.create = function(param, callback) {
    // required fields
    let company_id = param.company_id;
    let first_name = param.first_name;
    let last_name = param.last_name;
    let phone_number = param.phone_number;
    let checkin_time = param.checkin_time;

    // optional dic var
    let additional_info = param.additional_info;

    // find all the appointments for this visitor
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    let tomorrow= new Date();
    tomorrow.setDate(today.getDate()+1);
    tomorrow.setHours(0, 0, 0, 0);

    let query=
    {
        company_id: company_id,
        first_name: first_name,
        last_name: last_name,
        phone_number: phone_number,
        date: {$gte: today, $lt: tomorrow},
    };

    Appointment.find(query, function(err, appointments) {
        let visitor =
        {
            company_id: company_id,
            last_name: last_name,
            first_name: first_name,
            phone_number: phone_number,
            checkin_time: checkin_time,
            additional_info: additional_info,
            appointments: appointments,
        };
        VisitorList.findOne(
            {company_id: company_id},
            function(err, list) {
                if(err)
                    return callback({error: 'an error occured while finding'}, null);
                if(list==null) {
                    list = new VisitorList();
                    list.visitors=[];
                    list.company_id = company_id;
                }
                list.visitors.push(visitor);
                list.save(function(err) {
                    if(err) return callback({error: 'error occured in saving'}, null);
                    emailEmployees(company_id, first_name + ' '+ last_name);
                    textEmployees(company_id, first_name + ' '+ last_name);
                    return callback(null, list);
                });
            }
        );
    });
};


/**
 * @function EmailEmployees
 * @description  email all employees of the company that a visitor checked in
 * @param {string} company_id - id of the company
 * @param {string} visitor_name - name of visitor
 */
function emailEmployees(company_id, visitor_name) {
   // console.log('email company %s about %s', company_id, visitor_name);
    Employee.find({company_id: company_id}, function(err, result) {
        if(err) {
            console.log('error while trying to find employees of company ' + company_id);
            return;
        }
       if(result) {
           Email.sendEmail(visitor_name, result, null);
       }
    });
}
/**
 * @function textEmployees
 * @description  email all employees of the company that a visitor checked in
 * @param {string} company_id - id of the company
 * @param {string} visitor_name - name of visitor
 */
function textEmployees(company_id, visitor_name) {
    Employee.find({company_id: company_id}, function(err, result) {
        if(err) {
            console.log('error while trying to find employees of company ' + company_id);
            return;
        }
        if(result) {
            SMS.sendText(visitor_name, result, null);
        }
    });
}
