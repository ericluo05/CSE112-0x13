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
 *        [c_admin - company admin] <br>
 *        [c_receptionist: company receptionist] <br>
 *        [c_employee: company employee] <br>
 *        [a_admin: app administrator]
 */


/**
 *
 * @api {get} /api/employees/company/:id Get All Employees
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
 * @api {get} /api/employees/:id Get Employee by id
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
 * @api {post} /api/employees/ Insert Employee
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
 * @apiParam {boolean} [receive_sms] receive email notification or not,
 *                                    default is false
 * @apiParam {boolean} [receive_email] receive sms notification or not,
 *                                    default is false
 * @apiUse EmployeeData
 * @apiError (Error 400) CanNotSave failed to connect to db
 */
router.post('/', controller.insert);

/**
 *
 * @api {put} /api/employees/:id Update Employee info
 * @apiDescription This is for modifying an employee. Do not send values if you
 * don't want them to be updated,
 * password change is done through a separate api call, refer to @ChangePassword
 * @apiName EmployeeUpdate
 * @apiGroup Employee
 *
 * @apiParam {int} employee_id unique identifier for employee
 * @apiParam {string} [first_name] employees first name
 * @apiParam {string} [last_name] employees last name
 * @apiParam {string} [email] email tied to users account
 * @apiParam {string} [phone_number] employees phone number
 * @apiParam {string} [role] employees role in the company
 * @apiParam {boolean} [receive_email] receive email notification or not
 * @apiParam {boolean} [receive_sms] receive sms notification or not
 * @apiUse EmployeeData
 * @apiError (Error 400) CanNotFind error finding employee
 * @apiError (Error 400) CanNotSave can't save, check dup key
 */
router.put('/:id', controller.update);

/**
 *
 * @api {delete} /api/employees/:id Delete Employee
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
 * @api {post} /api/employees/login Login
 * @apiDescription used to login employee
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

/**
 *
 * @api {post} /api/employees/resetPassword Reset Password
 * @apiDescription send email to employee with new password in the email
 * @apiName EmployeeResetPassword
 * @apiGroup Employee
 *
 * @apiParam {string} email email address of account to rest password for
 * @apiUse EmployeeData
 * @apiError (Error 400) CanNotFind no employee has that email
 * @apiError (Error 400) CanNotReset can't reset password
 */
router.post('/resetPassword', controller.resetPassword);

/**
 *
 * @api {post} /api/employees/pwdchange/:id Change Password
 * @apiDescription Change password of an account
 * @apiName EmployeeChangePassword
 * @apiGroup Employee
 *
 * @apiParam {string} id Id of the employee
 * @apiParam {string} currentpwd current password
 * @apiParam {strint} newpwd  new password
 * @apiUse EmployeeData
 * @apiError (Error 400) CanNotFind no employee of the same id can be found
 * @apiError (Error 400) MissingField missing param
 * @apiError (Error 400) IncorrectPassword invalid current password
 * @apiError (Error 400) CanNotChange can't change password
 */
router.post('/pwdchange/:id', controller.changePassword);


module.exports = router;
