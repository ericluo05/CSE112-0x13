'use strict';
/**
 *  Module that house all the API routes that pertains to employee/user
 * @module routes/employee
 */
let Employee = require('../../models/Employee');

/**
* @function login
* @description  handler to login as an employee
* @param {Object} req - request object
* @param {Object} res - response object
*/
exports.login = function(req, res) {
    Employee.findOne({email: req.body.email}, function(err, e) {
        if(err || !e) {
          return res.status(400).send({error: 'Can not Find'});
        }
        if(!e.validPassword(req.body.password))
          return res.status(400).send({error: 'Incorrect Credentials'});
        let employeeJSON=e.toJSON();
        delete employeeJSON.password;
        return res.status(200).json(employeeJSON);
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
        if(err) {
            return res.status(400).send({error: 'Can not Find'});
        }
        return res.status(200).json(result);
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
      if(err) {
          return res.status(400).json({error: 'Can not Find'});
      } else {
          console.log(employee);
          return res.status(200).json(employee);
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
    employee.email = req.body.email,
    employee.phone_number = req.body.phone_number,
    employee.company_id = req.body.company_id,
    employee.password = employee.generateHash(req.body.password),
    employee.role = req.body.role;

    employee.save(function(err, e) {
        if(err) {
            return res.status(400).json({error: 'Can not Save'});
        }
        let employeeJSON=e.toJSON();
        delete employeeJSON.password;
        return res.status(200).json(employeeJSON);
    });
};

/**
 * @function update
 * @description  handler to update an employee
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.update = function(req, res) {
    Employee.findById(req.params.id, function(err, employee) {
        if(err)
            return res.status(400).json({error: 'Can not Update'});

        employee.first_name = req.body.first_name || employee.first_name;
        employee.last_name = req.body.last_name || employee.last_name;
        employee.email = req.body.email || employee.email;
        employee.phone_number = req.body.phone_number || employee.phone_number;
        employee.password = employee.generateHash(req.body.password)
            || employee.password;
        employee.role = req.body.role || employee.role;

        employee.save(function(err) {
            console.log(err);
            if(err)
                return res.status(400).json({error: 'Can not Save'});
            let employeeJSON=employee.toJSON();
            delete employeeJSON.password;
            return res.status(200).send(employeeJSON);
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
  Employee.findById(req.params.id, function(err, employee) {
    return employee.remove(function(err) {
      if(err) {
        res.status(400).json({error: 'Can not Find'});
      } else {
          let employeeJSON=employee.toJSON();
          delete employeeJSON.password;
          return res.status(200).send(employeeJSON);
      }
    });
  });
};
