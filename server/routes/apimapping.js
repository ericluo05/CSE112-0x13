'use strict';
let api = require('../routes/theme');
let appointmentAPI = require('../routes/appointment');
let companiesAPI = require('../routes/company');
let employeeAPI = require('../routes/employee');
let formAPI = require('../routes/form');
let payment = require('../routes/payment');
let visitorListsAPI = require('../routes/visitorList');


module.exports = function(app) {
    app.use('/api', api);
    app.use('/api/appointments', appointmentAPI);
    app.use('/api/companies', companiesAPI);
    app.use('/api/employees', employeeAPI);
    app.use('/api/form', formAPI);
    app.use('/api/visitorLists', visitorListsAPI);
    app.use('/payment', payment);
};
