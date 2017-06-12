'use strict';
/**
 *  Module that house all the API routes that pertains to employee/user
 * @module routes/employee
 */
let Employee = require('../../models/Employee');
let Company = require('../../models/Company');
let Email = require('../../notification/email');
/**
 * @typedef{Object} Employee
 * @property {string} first_name employees first name
 * @property {string} last_name employees last name
 * @property {string} email email tied to users account
 * @property {string}  phone_number employees phone number
 * @property {int}  company_id company for employee to be associated to
 * @property {string}  password employees password. This is hashed then removed
 * @property {string}  role employees role in the company, can be of
 *       [c_admin - company admin]
 *       [c_receptionist: compay receptionist]
 *       [c_employee: company employee]
 *       [a_admin: app administrator]
 * @property {boolean} receive_sms opt-out option to receive sms when visitor checks in
 * @property {boolean} receive_email opt-out option to receive email
 *                            when visitor checks in
 * @property {boolean} receive_email
 */


/**
 * @function login
 * @description  handler to login as an employee
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.login = function(req, res) {
    Employee.findOne({email: req.body.email}, function(err, employee) {
        if (err || !employee) {
            return res.status(400).send({error: 'Can not Find'});
        }
        if (!employee.validPassword(req.body.password))
            return res.status(400).send({error: 'Incorrect Credentials'});
        res.status(200).send(showEmployeePublicInfo(employee));
    });
};

/**
 * @function getAllEmployees
 * @description  handler to get all employees of a company
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.getAllEmployees = function(req, res) {
    Employee.find({company_id: req.params.id}, {password: 0}, function(err, result) {
        if (err)
            res.status(400).send({error: 'Can not Find'});
        else
            res.status(200).send(result);
    });
};

/**
 * @function getById
 * @description  handler to get employee with given id
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.getById = function(req, res) {
    Employee.findById(req.params.id, {password: 0}, function(err, employee) {
        if (err) {
             res.status(400).send({error: 'Can not Find'});
        } else {
             res.status(200).send(showEmployeePublicInfo(employee));
        }
    });
};

/**
 * @function insert
 * @description  handler to create a new employee
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.insert = function(req, res) {
    let employee = new Employee();
    employee.first_name = req.body.first_name;
    employee.last_name = req.body.last_name;
    employee.email = req.body.email;
    employee.phone_number = req.body.phone_number;
    employee.company_id = req.body.company_id;
    employee.password = employee.generateHash(req.body.password);
    employee.role = req.body.role;
    if(req.body.receive_sms)
        employee.receive_sms = req.body.receive_sms;
    if(req.body.receive_email)
        employee.receive_email = req.body.receive_email;
    // chain the promises to create the employee and updating company employee count
    createEmployeePromise(employee)
        .then(updateCompanyEmployeeCount)
        .then(function(result) {
            res.status(result.statusCode).send(result.body);
        })
        .catch(function(error) {
            res.status(error.statusCode).send(error.body);
        });
};
/**
 * @private
 * @function createEmployeePromise
 * @description create employee in the data base
 * @param {EmployeeSchema} employee - Employee schema to be saved
 * @return {Promise} promised to be chained to increment employee count
 *   of the company.
 *   Reject: { statusCode: 4xx, body: {error: 'error message'} }
 *   Resolve: { action 'create', body: employeeData }
 */
function createEmployeePromise(employee) {
    let promise = new Promise(function(resolve, reject) {
        employee.save(function(err, e) {
            if (err) {
                reject({statusCode: 400, body: {error: 'Can not create'}});
            } else {
                resolve({action: 'create', body: e});
            }
        });
    });
    return promise;
}

/**
 * @private
 * @function updateCompanyEmployeeCount
 * @description update company employeeCount, this method is intended to be
 * be used as chained promise after createEmployeePromise
 * @param {Object} actionAndEmployeeData - Employee schema to be saved
 * @param {string} actionAndEmployeeData.action - create/delete, create will +1,
 *      delete will -1 from employee count
 * @param {Employee} actionAndEmployeeData.body - data of the employee
 * @return {Promise} a promise that can be chained to extract correspoin
 *  Reject: { statusCode: 4xx, body: {error: 'error message'} }
 *  Resolve: { statusCode: 2xx, body: EmployeeData }
 */
function updateCompanyEmployeeCount(actionAndEmployeeData) {
    let promise = new Promise(function(resolve, reject) {
        let action = actionAndEmployeeData.action;
        let employee = actionAndEmployeeData.body;
        Company.findOne({_id: employee.company_id}, function(err, c) {
            if (err) {
                reject({statusCode: 400, body: {error: 'Could not save'}});
            }
            if(action === 'create')
                 c.num_employees = c.num_employees + 1;
            else if(action === 'delete')
                c.num_employees = c.num_employees - 1;
            c.save(function(err) {
                if (err) {
                    reject({statusCode: 400, body: {error: 'Could not increment Count'}});
                }
                resolve({statusCode: 200, body: showEmployeePublicInfo(employee)});
            });
        });
    });
    return promise;
}

/**
 * @function update
 * @description  handler to update an employee
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.update = function(req, res) {
    Employee.findById(req.params.id, function(err, employee) {
        if (err)
            return res.status(400).json({error: 'Can not find'});

        employee.first_name = req.body.first_name || employee.first_name;
        employee.last_name = req.body.last_name || employee.last_name;
        employee.email = req.body.email || employee.email;
        employee.phone_number = req.body.phone_number || employee.phone_number;
        employee.role = req.body.role || employee.role;
        if(req.body.receive_sms)
              employee.receive_sms = req.body.receive_sms;
        if(req.body.receive_email)
              employee.receive_email = req.body.receive_email;
        employee.save(function(err) {
            if (err)
                return res.status(400).json({error: 'Can not save'});
            res.status(200).send(showEmployeePublicInfo(employee));
        });
    });
};

/**
 * @function delete
 * @description  handler to delete an employee
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.delete = function(req, res) {
    let deletePromise = new Promise(function(resolve, reject) {
        Employee.findById(req.params.id, function(err, employee) {
            if(err || !employee) {
                reject({statusCode: 400, body: {error: 'Can not find'}});
            } else{
                employee.remove(function(err, e) {
                    if (err) {
                        reject({statusCode: 400, body: {error: 'Can not delete'}});
                    } else {
                        resolve({action: 'delete', body: e});
                    }
                });
            }
        });
    });

    deletePromise
        .then(updateCompanyEmployeeCount)
        .then(function(result) {
            res.status(result.statusCode).send(result.body);
        })
        .catch(function(error) {
            res.status(error.statusCode).send(error.body);
        });
};

/**
 * @function resetPassword
 * @description  handler to reset password and sent new password to email
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.resetPassword = function(req, res) {
    Employee.findOne({email: req.body.email}, function(err, employee) {
        if (err || !employee) {
            return res.status(400).send({error: 'Can not find'});
        }
        let newPassword = randomString(6);
        employee.password = employee.generateHash(newPassword);
        employee.save(function(err) {
            if (err)
                return res.status(400).json({error: 'Can not reset'});
            Email.sendNewPassword(employee.email, newPassword);
            res.status(200).send(showEmployeePublicInfo(employee));
        });
    });
};

/**
 * @function randomString
 * @description  generate random string using [A-Z][a-Z][0-9]
 * @param {int} len - length of generated string
 * @return {String} generated random string
 */
function randomString(len) {
    let charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
    for (let i = 0; i < len; i++) {
        let randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz, randomPoz+1);
    }
    return randomString;
}

/**
 * @function changePassword
 * @description  handler to reset password and sent new password to email
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @return {Object} res - error response
 */
exports.changePassword = function(req, res) {
    let currentPassword = req.body.currentpwd;
    let newPassword = req.body.newpwd;
    if(!currentPassword || !newPassword)
        return res.status(400).json({error: 'Missing field'});

    Employee.findById(req.params.id, function(err, employee) {
        if (err || !employee)
            return res.status(400).send({error: 'Can not find'});

        if(!employee.validPassword(currentPassword))
            return res.status(400).send({error: 'Incorrect password'});

        employee.password = employee.generateHash(newPassword);
        employee.save(function(err) {
            if (err)
                return res.status(400).send({error: 'Can not change'});
            res.status(200).send(showEmployeePublicInfo(employee));
        });
    });
};

/**
 * @private
 * @function showEmployeePublicInfo
 * @description remove password field before sending out the json
 * @param {Object} employee - employee object
 * @return {EmployeeInfo} Employee info object
 */
function showEmployeePublicInfo(employee) {
    let employeeJSON = employee.toJSON();
    delete employeeJSON.password;
    return employeeJSON;
}


