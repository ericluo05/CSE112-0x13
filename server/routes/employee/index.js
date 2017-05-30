'use strict';

let express = require('express');
let controller = require('./employee.controller');

let router = new express.Router();


/**
 *
 * @api {get} api/employee/company/:id getAllEmployees
 * @apiDescription This is for getting all existant employees. Look at
 * employee.controller.js getAllEmployees for more info
 * @apiName EmployeeGetAll
 * @apiGroup Employee
 *
 * @apiParam {int} Company_id the id of our company
 * @apiSuccess {JSON} result all the employees in JSON format
 * @apiError CanNotFind there is not company with that id
 */

router.get('/company/:id', controller.getAllEmployees);

/**
 *
 * @api {get} /employee/:id getById
 * @apiDescription This is for getting 1 existant employees using ID. Look at
 * employee.controller.js getById for more info.
 * @apiName EmployeeGetById
 * @apiGroup Employee
 *
 * @apiParam {int} Employee_id
 * @apiSuccess {JSON} employee employee in JSON format
 * @apiError CanNotFind no employee with that id exists
 */

router.get('/:id', controller.getById);

/**
 *
 * @api {post} api/employee/ insert
 * @apiDescription This is for creating an employee. Look at
 * employee.controller.js insert for more info
 * @apiName EmployeeInsert
 * @apiGroup Employee
 *
 * @apiParam {string} first_name employees first name
 * @apiParam {string} last_name employees last name
 * @apiParam {string} email email tied to users account
 * @apiParam {string}  phone_number employees phone number
 * @apiParam {int}  company_id company for employee to be associated to
 * @apiParam {string}  password employees password. This is hashed then removed
 * @apiParam {string}  role employees role in the company
 * @apiSuccess {JSON} employee complete new employee in JSON format
 * @apiError CanNotSave failed to connect to db
 */
router.post('/', controller.insert);

/**
 *
 * @api {put} api/employee/:id update
 * @apiDescription This is for modifying an employee. Do not send values if you
 * don't want them to be updated. Look at employee.controller  for more info
 * @apiName EmployeeUpdate
 * @apiGroup Employee
 *
 * @apiParam {int} employee_id unique identifier for employee
 * @apiParam {string} first_name employees first name
 * @apiParam {string} last_name employees last name
 * @apiParam {string} email email tied to users account
 * @apiParam {string} phone_number employees phone number
 * @apiParam {string} password employees password. This is hashed then removed
 * @apiParam {string} role employees role in the company
 * @apiSuccess {JSON} employee the newly create employee in JSON format
 * @apiError CanNotUpdate caused by employee not existing I think
 * @apiError CanNotSave failed db connection
 */

router.put('/:id', controller.update);

/**
 *
 * @api {delete} api/employee/:id delete
 * @apiDescription This is for deleting an employee. Look at
 * employee.controller.js delete for more info
 * @apiName EmployeeDelete
 * @apiGroup Employee
 *
 * @apiParam {int} employee_id unique identifier for employee
 * @apiSuccess {JSON} employee the JSON of the employee that was just deleted
 * @apiError CanNotFind DNE error
 */

router.delete('/:id', controller.delete);

/**
 *
 * @api {post} /employee/login login
 * @apiDescription This is for login it returns an employee JSON. Look at
 * employee.controller.js login for more info
 * @apiName EmployeeLogin
 * @apiGroup Employee
 *
 * @apiParam {string} email employee's email
 * @apiParam {string} password employee's password
 * @apiSuccess {JSON} return employee JSON - the password
 * @apiError CanNotFind not employee has that email
 * @apiError IncorrectCredentials password does not match
 */

router.post('/login', controller.login);

module.exports = router;
