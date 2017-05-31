'use strict';
let Employee = require('./models/Employee');
let Company = require('./models/Company');

createEmissaryCompany();
setTimeout(createSuperAdminAcc, 3000);
/**
 * @private
 * @function createEmissaryCompany
 * @description  create emissary company
 */
function createEmissaryCompany() {
    Company.findOne({name: 'Emissary'}, function(err, result) {
        if(!result) {
            console.log('No Emissary Company found, creating one');
            let company = new Company();
            company.email = 'support@emissary.com';
            company.name = 'Emissary';
            company.phone_number = '9119119110';
            company.paid_time=new Date();
            company.save(function(err, c) {
                if(err) {
                    console.log('error: unable to create/save Emissary company');
                }
                console.log(c);
            });
        }
    });
}


/**
 * @private
 * @function createSuperAdminAcc
 * @description  create dummy super admin account peter@emissary.com
 */
function createSuperAdminAcc() {
    Company.findOne({name: 'Emissary'}, function(err, result) {
        let superadmin = new Employee();
        superadmin.first_name = 'Peter';
        superadmin.last_name = 'Venkman';
        superadmin.email = 'peter@emissary.com';
        superadmin.phone_number = '5621234567';
        superadmin.company_id = result._id;
        superadmin.password = superadmin.generateHash('admin');
        superadmin.role = 'a_admin';
        superadmin.save(function(err, e) {
            if (err) {
                console.log('error: unable to register superadmin account');
            }
            console.log('Result: '+e);
        });
    });
}
