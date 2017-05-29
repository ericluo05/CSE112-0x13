
let Employee = require('./models/Employee');
let Company = require('./models/Company');

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
        });
        Employee.findOne({email: 'peter@emissary.com'}, function(err, result) {
            if (err) {
                console.log('no superadmin acc found, creating one. ' +
                    'acc: peter@emissary.com, pw:admin');
            }
            if(!result) {
                let emissaryID = 0;
                Company.findOne({name: 'Emissary'}, function(err, result) {
                    emissaryID = result._id;
                    let superadmin = new Employee();
                    superadmin.first_name = 'Peter';
                    superadmin.last_name = '???';
                    superadmin.email = 'peter@emissary.com',
                        superadmin.phone_number = '5621234567',
                        Company.findOne({name: 'Emissary'}, function(err, result) {
                            console.log(result._id);
                        });
                    superadmin.company_id = emissaryID,
                        superadmin.password = superadmin.generateHash('admin'),
                        superadmin.role = 'a_admin';
                    superadmin.save(function(err, e) {
                        if (err) {
                            console.log('error: unable to register superadmin account');
                        }
                    });
                });
            }
        });
    }
});