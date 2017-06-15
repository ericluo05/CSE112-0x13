'use strict';
let Employee = require('./models/Employee');
let Company = require('./models/Company');
let CompanyID = 0;
createMainCompany();
setTimeout(createSuperAdminAcc, 3000);
/**
 * @private
 * @function createMainCompany
 * @description  create main company (Appt-o-matic if one doesn't exist
 */
function createMainCompany() {
    Company.findOne({email: 'support@apptomatic.com'}, function(err, result) {
        if(err ) {
           return console.log('Error trying to create App-o-matic' +
               ' Company: ' + err.code);
        }
        if(!result) {
            console.log('No company with email "support@apptomatic.com" found,' +
                ' creating one');
            let company = new Company();
            company.email = 'support@apptomatic.com';
            company.name = 'App-o-matic';
            company.phone_number = '9119119110';
            company.paid_time=new Date();
            company.save(function(err, c) {
                if(err)
                    console.log('error: unable to create/save Appt-o-matic company');
                if(c)
                    CompanyID = c._id;
            });
        } else{
            CompanyID = result._id;
        }
    });
}


/**
 * @private
 * @function createSuperAdminAcc
 * @description  create dummy super admin account peter@apptomatic.com
 * if one doesn't exist
 */
function createSuperAdminAcc() {
     Employee.findOne({email: 'peter@apptomatic.com'}, function(err, result) {
        if(err) {
            return console.log('Error trying to find super-admin' +
                ' account - error code: ' + err.code);
        }
        if(!result) {
            console.log('No SuperAdminAcc "peter@apptomatic.com" found, creating one');
            let superadmin = new Employee();
            superadmin.first_name = 'Peter';
            superadmin.last_name = 'Venkman';
            superadmin.email = 'peter@apptomatic.com';
            superadmin.phone_number = '5621234567';
            if(CompanyID ===0) {
                console.log('Can\'t find appt-o-matic CompanyID,' +
                    ' this shouldn\'t show up');
            }
            superadmin.company_id = CompanyID;
            superadmin.password = superadmin.generateHash('admin');
            superadmin.role = 'a_admin';
            superadmin.save(function(err, e) {
                if (err) {
                    console.log('Error unable to register superadmin account: '+err.code);
                }
            });
        }
    });
}
