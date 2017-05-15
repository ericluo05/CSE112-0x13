'use strict';

//Import Resources and Libs

var Email = require('../../notification/email');
var TextModel = require('../../notification/text');

var VisitorList = require('../../models/VisitorList');
var Employee = require('../../models/Employee');
var Appointment = require('../../models/Appointment');

/* handles route for getting the Company's visitor list */
exports.getCompanyVisitorListReq = function(req, res){
    var companyId=req.params.id;
    exports.getCompanyVisitorList(company_id, function(errMsg, result){
        if(errMsg) return res.status(400).json(errMsg);
        if(result == null){
            result = new VisitorList();
            result.visitors = [];
            result.company_id=companyId;
            result.save(function(err){
                return res.status(200).json(result);
            });
        }else {
            return res.status(200).json(result);
        }
    });
}


/* logic for getting the Company's visitor list */
exports.getCompanyVisitorList = function(companyId, callback){
    console.log('company id is ' + companyId);
    if(!companyId)
        return callback({error: "Please send company id."}, null);
    VisitorList.findOne({company_id: company_id}, function(err, list){
        if(err) return callback({error: "Getting Visitor List"}, null);
        if(list==null) {
            list = new VisitorList();
            list.visitors=[];
            list.company_id = companyId;
        }
        list.save(function(err){
            if(err)return callback({error: "Error in saving"}, null);
            return callback(null, list);
        });
    });
}

/* handles route to delete visitor in the list*/
exports.deleteVisitorReq = function(req, res){
    var visitorId=req.params.visitor_id;
    var companyId=req.params.company_id;
    exports.deleteVisitor(companyId, visitorId, function(errMsg, result){
        if(errMsg)  return res.status(400).json(errMsg);
        return res.status(200).json(result);
    });
}

/* logic for deleting the visitor in the list */
exports.deleteVisitor = function(companyId, visitorId, callback){
    if(!companyId)
        return callback({error: "Please send company id."}, null);
    if(!visitorId)
        return callback({error: "Please send visitorList id."}, null);
    VisitorList.findOneAndUpdate(
        {company_id: company_id},
        {$pull: {visitors:{_id:visitor_id}}},
        {safe: true, upsert: true, new:true}, function(err, data){
            if(err) return callback({error: "Can't update list"}, null);
            return callback(null, data);
        });
}

/* clear the list */
exports.deleteReq = function(req, res){
    var listId=req.params.id;
    exports.delete(listId, function(errMsg, result){
        if(errMsg)  return res.status(400).json(errMsg);
        return res.status(200).json(result);
    });
}

exports.delete = function(listId, callback){
    if(!listId)
        return callback({error: "Please send list id."}, null);
    VisitorList.findOne({_id: listId}, function(err, list){
        if(err || list==null) 
            return callback({error: "Can't find company"}, null);
        list.visitors=[];
        list.save(function(err){
            if(err) return callback({error: "Can't save"}, null);
            return callback(null, list);
        });
    });
}
// This route will be called when a visitor checks in
exports.createReq = function(req, res) {
    exports.create(req.body, function(errMsg, result){
        if(errMsg)  return res.status(400).json(errMsg);
        return res.status(200).json(result);
    });
}

exports.create = function(param, callback){
    //required fields
    var companyId = param.company_id;
    var firstName = param.first_name;
    var lastName = param.last_name;
    var phoneNumber = param.phone_number;
    var checkinTime = param.checkin_time;

    //optional dic var
    var additionalInfo = param.additional_info;

    // find all the appointments for this visitor
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var tomorrow= new Date();
    tomorrow.setDate(today.getDate()+1);
    tomorrow.setHours(0, 0, 0, 0);

    var query=
    {
        company_id: companyId,
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
        date: {$gte:today, $lt: tomorrow}
    };

    Appointment.find(query, function(err, appointments){
        var visitor =
        {
            company_id: companyId,
            last_name: lastName,
            first_name: firstName,
            phone_number: phoneNumber,
            checkin_time: checkinTime,
            additional_info: additionalInfo,
            appointments: appointments
        };
        VisitorList.findOne(
            {company_id: companyId},
            function(err, list) {
                if(err)
                    return callback({error: "an error occured while finding"}, 
                                    null);
                if(list==null) {
                    list = new VisitorList();
                    list.visitors=[];
                    list.company_id = companyId;
                }
                list.visitors.push(visitor);
                list.save(function(err){
                    if(err) return callback({error: "an error in saving"}, 
                                            null);
                    return callback(null, list);
                    /*Employee.find({company : req.body.company_id},
                     function(err, employees) {
                     var i = 0;
                     var respond = function() {
                     i++;
                     if(i == employees.length) {
                     res.status(200).json(list);
                     }
                     };

                     Email.sendEmail(req.body.name, employees, 
                                     function(){respond();});
                     TextModel.sendText(req.body.name, employees, 
                                        function(){respond();});
                     }
                     );*/
                });
            }
        );
    });
}

