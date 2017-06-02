'use strict';

let express = require('express');
let controller = require('./employee.controller');

let router = new express.Router();


/**
 * @apiDefine EmployeeData
 * @apiSuccess {string} _id ID of the employee
 * @apiSuccess {string} first_name first name of the employee
 * @apiSuccess {string } last_name last name of the employee
 * @apiSuccess {string} email email of the employee
 * @apiSuccess {string} phone_number phone number of the employee
 * @apiSuccess {string} role role of the employee, can be one of the following: <br>
 *       [c_admin: company admin]<br>
 *       [c_receptionist: company receptionist] <br>
 *       [c_employee: company employee] <br>
 *       [a_admin: app administrator]
 */

/**
 * @apiDefine EmployeesData
 * @apiSuccess {Employee[]}Employees Info of all employees in given company
 *                  in <code>JSON</code> format
 * @apiSuccess {string} Employees._id ID of the employee
 * @apiSuccess {string} Employees.first_name first name of the employee
 * @apiSuccess {string } Employees.last_name last name of the employee
 * @apiSuccess {string} Employees.email email of the employee
 * @apiSuccess {string} Employees.phone_number phone number of the employee
 * @apiSuccess {string} Employees.role role of the employee,
 *         can be one of the following: <br>
 *       [c_admin - company admin] <br>
 *       [c_receptionist: company receptionist] <br>
 *       [c_employee: company employee] <br>
 *       [a_admin: app administrator]
 */


/**
 *
 * @api {get} api/employees/company/:id getAllEmployees
 * @apiDescription This is for getting all existent employees. Look at
 * employee.controller.js getAllEmployees for more info
 * @apiName EmployeeGetAll
 * @apiGroup Employee
 *
 * @apiParam {int} Company_id the id of our company
 * @apiUse EmployeesData
 * @apiError (Error 400) CanNotFind there is not company with that id
 */
router.get('/company/:id', controller.getAllEmployees);

/**
 *
 * @api {get} /employees/:id getById
 * @apiDescription This is for getting 1 existant employees using ID. Look at
 * employee.controller.js getById for more info.
 * @apiName EmployeeGetById
 * @apiGroup Employee
 *
 * @apiParam {int} Employee_id
 * @apiUse EmployeeData
 * @apiError (Error 400) CanNotFind no employee with that id exists
 */
router.get('/:id', controller.getById);

/**
 *
 * @api {post} api/employees/ insert
 * @apiDescription This is for creating an employee.
 *  Roles:
 *   c_admin: company admin
 *   c_receptionist: company receptionist
 *   c_employee: company employee
 *   a_admin: app administrator
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
 * @apiUse EmployeeData
 * @apiError (Error 400) CanNotSave failed to connect to db
 */
router.post('/', controller.insert);

/**
 *
 * @api {put} api/employees/:id update
 * @apiDescription This is for modifying an employee. Do not send values if you
 * don't want them to be updated. Look at employee.controller  for more info
 * @apiName EmployeeUpdate
 * @apiGroup Employee
 *
 * @apiParam {int} employee_id unique identifier for employee
 * @apiParam {string} [first_name] employees first name
 * @apiParam {string} [last_name] employees last name
 * @apiParam {string} [email] email tied to users account
 * @apiParam {string} [phone_number] employees phone number
 * @apiParam {string} [password] employees password. This is hashed then removed
 * @apiParam {string} [role] employees role in the company
 * @apiUse EmployeeData
 * @apiError (Error 400) CanNotUpdate caused by employee not existing I think
 * @apiError (Error 400) CanNotSave failed db connection
 */
router.put('/:id', controller.update);

/**
 *
 * @api {delete} api/employees/:id delete
 * @apiDescription This is for deleting an employee. Look at
 * employee.controller.js delete for more info
 * @apiName EmployeeDelete
 * @apiGroup Employee
 *
 * @apiParam {int} employee_id unique identifier for employee
 * @apiUse EmployeeData
 * @apiError (Error 400) CanNotFind DNE error
 */
router.delete('/:id', controller.delete);

/**
 *
 * @api {post} /employees/login login
 * @apiDescription This is for login it returns an employee JSON. Look at
 * employee.controller.js login for more info
 * @apiName EmployeeLogin
 * @apiGroup Employee
 *
 * @apiParam {string} email employee's email
 * @apiParam {string} password employee's password
 * @apiUse EmployeeData
 * @apiError (Error 400) CanNotFind not employee has that email
 * @apiError (Error 400) IncorrectCredentials password does not match
 */
router.post('/login', controller.login);

module.exports = router;
