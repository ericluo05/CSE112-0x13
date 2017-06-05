/* eslint-disable no-unused-vars */
'use strict';
/**
 *  Module that house all the API routes that pertains to company
 * @module routes/company
 */
let Company = require('../../models/Company');

/**
 * @function create
 * @description  handler to sign up a user
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.create = function(req, res) {
    let company = new Company();

    // require provided info
    company.email = req.body.email;
    company.name = req.body.name;
    company.phone_number = req.body.phone_number;
    company.paid_time=new Date();

    company.save(function(err, c) {
        if(err) {
            if(err.code == 11000)
                return res.status(400).json({eror: 'Unique Email Needed'});
            return res.status(400).json({error: 'Could Not Create'});
        }
        return res.status(200).json(showCompanyPublicInfo(c));
    });
};

/**
 * @function getAll
 * @description  handler to get all companies
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.getAll = function(req, res) {
    Company.find({},
        {
            credit_card_number: false,
            expiration_date: false,
        }
        , function(err, result) {
            if(err) {
                return res.status(400).json(err);
            }
            return res.status(200).json(result);
        });
};

/**
 * @function get
 * @description  handler to find a company
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.get = function(req, res) {
    Company.findOne({_id: req.params.id}, function(err, company) {
        if(err || !company) {
            return res.status(400).json({error: 'Could not find'});
        }
        return res.status(200).json(showCompanyPublicInfo(company));
    });
};


/**
 * @function update
 * @description  handler to update the company info
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.update = function(req, res) {
    Company.findOne({_id: req.params.id}, function(err, c) {
        if(err || !c)
            return res.status(400).json({error: 'Could not save'});

        // update email
        if (req.body.email)
            c.email = req.body.email.trim();

        // update company name
        if (req.body.name)
            c.name = req.body.name.trim();

        // update company's phone number
        if (req.body.phone_number)
            c.phone_number = req.body.phone_number.trim();

        c.save(function(err) {
            if(err) {
                return res.status(400).json({error: 'Could not save'});
            }
            return res.status(200).json(showCompanyPublicInfo(c));
        });
    });
};

/**
 * @function delete
 * @description handler to delete company
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.delete = function(req, res) {
    Company.findById(req.params.id, function(err, c) {
        if(err)
            res.status(400).json({error: 'CouldNotFind'});
        c.remove(function(err) {
            if(err) {
                res.status(400).json({error: 'Could not remove'});
            } else {
                return res.status(200).json(showCompanyPublicInfo(c));
            }
        });
    });
};

/**
 * @function resetCredentials
 * @description  handler to resets a user's credentials
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.resetCredentials = function(req, res) {
    // TODO: This is broken, mixing company and employee,
    // when company doesn't contain validPassword/generateHash method

    Company.findOne({email: req.params.user}, function(err, c) {
        if(err || !c)
            return res.status(400).json({error: 'Could not find'});


        // if the user is found but the password is wrong
        if(!c.validPassword(req.body.password))
            return res.status(400).send('loginMessage', 'Oops! Wrong password');

        // update password
        if (req.body.newpassword !== undefined)
            c.password = c.generateHash(req.body.newpassword);

        // update email
        if (req.body.newemail !== undefined)
            c.email = req.body.newemail;

        // update company name
        if (req.body.new_company_name !== undefined)
            c.company_name = req.body.new_company_name;

        // update company's phone number
        if (req.body.new_company_phone_number !== undefined)
            c.company_phone_number = req.body.new_company_phone_number;

        c.save(function(err) {
            if(err) {
                res.status(400).send({error: 'Could not save'});
            }
        });
        return res.status(200).json(showCompanyPublicInfo(c));
    });
};


/**
 * @typedef {Object} CompanyInfo
 * @property {int} _id id of the company
 * @property {string} name name of the company
 * @property {string} email email of the company
 * @property {string} phone_number phone number of the company
 * @property {string} paid_time time when the company made payment
 * @property {Date} create_time - time in which the company is created
 * @property {Date} sub_expiration - time in which the subscription expires
 * @property {Number} num_months_subscribed - number of months the company is subscribed
 * @property {Number} revenue: total amount paid by this company thus far, include
 *             payments for subscriptions for future months, it is probably better
 *             to not allow advanced payment as it can lead to "bogus" sale/data
 *             in case of cancellation
 * @property {Number} num_employees number of registered employees
 */

/**
 * @private
 * @function showCompanyPublicInfo
 * @description convert company info into array
 * @param {Object} c - company object
 * @return {CompanyInfo} company info object
 */
function showCompanyPublicInfo(c) {
    return {
        _id: c._id,
        name: c.name,
        email: c.email,
        phone_number: c.phone_number,
        paid_time: c.paid_time,
        create_time: c.create_time,
        sub_expiration: c.sub_expiration,
        num_months_subscribed: c.num_months_subscribed,
        revenue: c.revenue,
        num_employees: c.num_employees,
    };
}

/**
 * @function searchCompanies
 * @description search company given string to match
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.searchCompanies = function(req, res) {
    let regexToSearch = new RegExp('.*'+req.params.match.trim()+'.*');
    Company.find({name: regexToSearch}, function(error, result) {
        if(error)
            return res.status(400).json({error: 'Could Not Search '});
        return res.json(result);
    });
};

/**
 * @private
 * @function showCompanyPrivateInfo
 * @description convert company info into array
 * @param {Object} c - company object
 * @return {CompanyInfoAdmin} company info object
 */
function showCompanyPrivateInfo(c) {
    return {
        _id: c._id,
        name: c.name,
        email: c.email,
        phone_number: c.phone_number,
        created: c.created,
        paid_time: c.paid_time,
    };
}


