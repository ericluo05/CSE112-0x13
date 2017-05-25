'use strict';

let express = require('express');
let controller = require('./employee.controller');

let router = express.Router();


/**
 *
 * @api {get} /employee/company/:id getAllEmployees
 * @apiDescription This is for getting all existant employees. Look at
 * employee.controller.js getAllEmployees for more info
 * @apiName EmployeeGetAll
 * @apiGroup Employee
 *
 */

router.get('/company/:id', controller.getAllEmployees);

/**
 *
 * @api {get} /employee/:id getById
 * @apiDescription This is for getting 1 existant employees using ID. Look at
 * employee.controller.js getById for more info
 * @apiName EmployeeGetById
 * @apiGroup Employee
 *
 */

router.get('/:id', controller.getById);

/**
 *
 * @api {post} /employee/ insert
 * @apiDescription This is for creating an employee. Look at
 * employee.controller.js insert for more info
 * @apiName EmployeeInsert
 * @apiGroup Employee
 *
 */
router.post('/', controller.insert);

/**
 *
 * @api {put} /employee/:id update
 * @apiDescription This is for modifying an employee. Look at
 * employee.controller.js update for more info
 * @apiName EmployeeUpdate
 * @apiGroup Employee
 *
 */

router.put('/:id', controller.update);

/**
 *
 * @api {delete} /employee/:id delete
 * @apiDescription This is for deleting an employee. Look at
 * employee.controller.js delete for more info
 * @apiName EmployeeDelete
 * @apiGroup Employee
 *
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
 */

router.post('/login', controller.login);

module.exports = router;
