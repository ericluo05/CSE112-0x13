'use strict';

let express = require('express');
let server;
let io = require('socket.io')();
// Constants for listening to Sockets
let CONNECTION = 'connection';
let VALIDATE_COMPANY_ID = 'validate_company_id';
let VISITOR_LIST_UPDATE = 'visitor_list_update';
let DISCONNECT = 'disconnect';
let REMOVE_VISITOR = 'remove_visitor';
let ADD_VISITOR = 'add_visitor';
let NOTIFY_ERROR = 'notify_error';

let VisitorListCtr = require('../routes/visitorList/visitorList.controller');
let Company = require('../models/Company');

/********** Socket IO Module **********/
/**
 * Socket IO Module 
 * @param {Object} ioIn
 * @return {Object} Returns server created.
 */
exports.createServer = function(ioIn) {
    io = ioIn;

    /*
     * This handles the 'connection' event, which is send when the user is
     * trying to connect a socket.
     *
     * Note that when the connection is established for that client,
     * the '_admin_id' needs to be set so that the client can be added to the
     * room and notified when changes are being made.
     */
    io.on(CONNECTION, function(socket) {
        console.log('SOCKET CONNECTED');
        /* companyId is required to connect to join right socket to listen to*/
        socket.on(VALIDATE_COMPANY_ID, function(data) {
            console.log(data);
            let companyId = data.company_id;
            Company.findOne({_id: companyId}, function(err, c) {
                if(err || !c)
                    return;
                else {
                    socket.join(companyId);
                    VisitorListCtr.getCompanyVisitorList(companyId, 
                    function(errMsg, result) {
                        if(errMsg)
                            exports.notifyError(companyId, {error: errMsg});
                        else {
                            exports.notifyNewList(companyId, result);
                        }
                    });
                }
            });
        });

        // requires the companyId to be sent
        socket.on(VISITOR_LIST_UPDATE, function(data) {
            let companyId = data.company_id;
            console.log('Visitor List Update' + data);
            VisitorListCtr.getCompanyVisitorList(companyId, 
            function(errMsg, result) {
                if(errMsg) {
                    exports.notifyError(companyId, {error: errMsg});
                } else
                    exports.notifyNewList(companyId, result);
            });
        });

        socket.on(DISCONNECT, function() {
            // console.log('user disconnected from ' + companyId);
        });

        // requires the companyId and visitorId to be sent
        socket.on(REMOVE_VISITOR, function(data) {
            console.log(data.company_id);
            let companyId = data.company_id;
            let visitorId = data.visitor_id;
            if(!companyId || !visitorId) return;
            VisitorListCtr.deleteVisitor(companyId, visitorId, 
            function(errMsg, result) {
                if(errMsg) {
                    console.log('error');
                    exports.notifyError(companyId, {error: errMsg});
                } else
                    exports.notifyNewList(companyId, result);
            });
        });

        // require the params to be set with info of the visitor
        socket.on(ADD_VISITOR, function(data) {
            console.log('ADDING VISITOR');
            console.log(data);
            console.log(data.company_id);
            let companyId = data.company_id;
            VisitorListCtr.create(data, function(errMsg, result) {
                if(errMsg) {
                    console.log('error');
                    exports.notifyError(companyId, {error: errMsg});
                } else {
                    exports.notifyNewList(companyId, result);
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
exports.notifyNewList = function(companyId, data) {
    io.to(companyId).emit(VISITOR_LIST_UPDATE, data);
};

exports.notifyError = function(companyId, data) {
    io.to(companyId).emit(NOTIFY_ERROR, data);
};

/*
 * Set up a custom namespace.
 *
 * On the client side get the socket as follows to robobetty:
 *   var socket = io('/visitorList');
 */
let nsp = io.of('/visitorList');

// To be used with authorization.
// io.set('authorization', socketioJwt.authorize({
//   secret: jwtSecret,
//   handshake: true
// }));
