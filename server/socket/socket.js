'use strict';

var express = require('express');
var server;
var io = require('socket.io')();
var exports = module.exports;

//Constants for listening to Sockets
var CONNECTION = "connection";
var VALIDATE_COMPANY_ID = "validate_company_id";
var VISITOR_LIST_UPDATE = "visitor_list_update";
var DISCONNECT = "disconnect";
var REMOVE_VISITOR = "remove_visitor";
var ADD_VISITOR = "add_visitor";
var NOTIFY_ERROR = "notify_error";

var VisitorListCtr = require('../routes/visitorList/visitorList.controller');
var Company = require('../models/Company');
/********** Socket IO Module **********/
exports.createServer = function(io_in) {
    io = io_in;

    /*
     * This handles the 'connection' event, which is send when the user is
     * trying to connect a socket.
     *
     * Note that when the connection is established for that client,
     * the '_admin_id' needs to be set so that the client can be added to the
     * room and notified when changes are being made.
     */
    io.on(CONNECTION, function (socket) {
        console.log("SOCKET CONNECTED");
        /* company_id is required to connect to join right socket to listen to*/
        socket.on(VALIDATE_COMPANY_ID, function(data){
            console.log(data);
            var company_id = data.company_id;
            Company.findOne({_id: company_id}, function(err, c){
                if(err || !c)
                    return;
                else {
                    socket.join(company_id);
                    VisitorListCtr.getCompanyVisitorList(company_id, function(err_msg, result){
                        if(err_msg)
                            exports.notifyError(company_id, {error: err_msg});
                        else {
                            exports.notifyNewList(company_id, result);
                        }

                    });
                }
            });
        });

        //requires the company_id to be sent
        socket.on(VISITOR_LIST_UPDATE, function(data) {
            var company_id = data.company_id;
            console.log("Visitor List Update" + data);
            VisitorListCtr.getCompanyVisitorList(company_id, function(err_msg, result){
                if(err_msg) {
                    exports.notifyError(company_id, {error: err_msg});
                }
                else
                    exports.notifyNewList(company_id, result);
            });
        });

        socket.on(DISCONNECT, function() {
            // console.log('user disconnected from ' + company_id);
        });

        //requires the company_id and visitor_id to be sent
        socket.on(REMOVE_VISITOR, function(data) {
            console.log(data.company_id);
            var company_id = data.company_id;
            var visitor_id = data.visitor_id;
            if(!company_id ||  !visitor_id) return;
            VisitorListCtr.deleteVisitor(company_id, visitor_id, function(err_msg, result){
                if(err_msg){
                    console.log("error");
                    exports.notifyError(company_id, {error: err_msg});
                }
                else
                    exports.notifyNewList(company_id, result);

            });
        });

        //require the params to be set with info of the visitor
        socket.on(ADD_VISITOR, function(data) {
            console.log("ADDING VISITOR");
            console.log(data);
            console.log(data.company_id);
            var company_id = data.company_id;
            VisitorListCtr.create(data, function(err_msg, result){
                if(err_msg){
                    console.log("error");
                    exports.notifyError(company_id, {error: err_msg});
                }
                else {
                    exports.notifyNewList(company_id, result);
                }
            });
        });

    });
    return server;
};
/*
 * A function that allows you to notify all clients that
 * the queue has been updated.
 *
 * The client side needs to be listening for the 'queue_updated' event. When
 * this event is triggered, the client side can retrieve the whole queue of
 * patients to reflect the changes.
 */
exports.notifyNewList = function(company_id, data) {
    io.to(company_id).emit(VISITOR_LIST_UPDATE, data);
};

exports.notifyError = function(company_id, data) {
    io.to(company_id).emit(NOTIFY_ERROR, data);
};

/*
 * Set up a custom namespace.
 *
 * On the client side get the socket as follows to robobetty:
 *   var socket = io('/visitorList');
 */
var nsp = io.of('/visitorList');

// To be used with authorization.
// io.set('authorization', socketioJwt.authorize({
//   secret: jwtSecret,
//   handshake: true
// }));