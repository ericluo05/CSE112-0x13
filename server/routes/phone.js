/* eslint-disable new-cap */
let express = require('express');
let router = express.Router();
let path = require('path');
let phoneGeneral = require('../lib/phone_general');
let nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'cse112team0x13@gmail.com',
        pass: 'team0x13',
    },
});

router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname+ './../../build/html/phone.html'));
});


/**
 * @api {post} /phone/isValidPhone PhoneValidator
 * @apiName phoneValid
 * @apiGroup PhoneApps
 *
 * @apiDescription Respond with whether the number is valid or not
 * , also formats it
 *
 * @apiParam {String} cc countryCode without + in front .
 * @apiParam {String} number Phone number.
 *
 * @apiSuccess {String} FormatedPhone a string that is the formatted
 * version of the passed in number
 * @apiSuccess {Boolean} isPhoneValid Whether the number is valid or not
 */

router.post('/isValidPhone', function(req, res) {
    let mailOptions = {
        from: '"Fred Foo 👻" <foo@blurdybloop.com>', // sender address
        to: 'eric_luo@ymail.com', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world ?', // plain text body
        html: '<b>Hello world ?</b>', // html body
    };
    transporter.sendMail(mailOptions, (error, info)=>{
       if(error) {
           console.log(error);

       }
       console.log('Message %s sent: %s', info.messageId, info.response);
    });
    res.send('Hi');
});


/**
 * @api {post} /phone/format PhoneFormatter
 * @apiName phoneFormat
 * @apiGroup PhoneApps
 *
 * @apiDescription Formats a number
 *
 * @apiParam {String} cc countryCode without + in front .
 * @apiParam {String} number Phone number.
 *
 * @apiSuccess {String} FormatedPhone a string that is the formatted
 *     version of the passed in number if isPhoneValid is false this
 *     returns an error.
 * @apiSuccess {Boolean} isPhoneValid Whether the number is valid or not.
 */

router.post('/format', function(req, res) {
    if(req.query.cc && req.query.number)
        res.json(phoneGeneral.formatPhoneNumber(req.query.cc,
            req.query.number));
    else
      res.json({'isValid': false, 'Error': 'cc or number missing'});
});

module.exports = router;
