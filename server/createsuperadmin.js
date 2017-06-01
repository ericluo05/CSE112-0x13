'use strict';
let Employee = require('./models/Employee');
let Company = require('./models/Company');
let EmissaryCompanyID = 0;
createEmissaryCompany();
setTimeout(createSuperAdminAcc, 3000);
/**
 * @private
 * @function createEmissaryCompany
 * @description  create emissary company if one doesn't exist
 */
function createEmissaryCompany() {
    Company.findOne({name: 'Emissary'}, function(err, result) {
        if(err ) {
           return console.log('Error trying to create Emissary' +
               ' Company: ' + err.code);
        }
        if(!result) {
            console.log('No company named "Emissary" found, creating one');
            let company = new Company();
            company.email = 'support@emissary.com';
            company.name = 'Emissary';
            company.phone_number = '9119119110';
            company.paid_time=new Date();
            company.save(function(err, c) {
                if(err)
                    console.log('error: unable to create/save Emissary company');
                if(c)
                    EmissaryCompanyID = c._id;
            });
        } else{
            EmissaryCompanyID = result._id;
        }
    });
}


/**
 * @private
 * @function createSuperAdminAcc
 * @description  create dummy super admin account peter@emissary.com if one doesn't exist
 */
function createSuperAdminAcc() {
     Employee.findOne({email: 'peter@emissary.com'}, function(err, result) {
        if(err) {
            return console.log('Error trying to find super-admin' +
                ' account: ' + err.message);
        }
        if(!result) {
            console.log('No SuperAdminAcc "peter@emissary.com" found, creating one');
            let superadmin = new Employee();
            superadmin.first_name = 'Peter';
            superadmin.last_name = 'Venkman';
            superadmin.email = 'peter@emissary.com';
            superadmin.phone_number = '5621234567';
            if(EmissaryCompanyID ===0) {
                console.log('Can\'t find EmissaryCompanyID, this shouldn\'t show up');
            }
            superadmin.company_id = EmissaryCompanyID;
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
