var express = require('express');
var router = express.Router();
var phoneGeneral = require('../calls/phone_general');

/**
 * @api {get} /phone  Respond with whether the number is valid or not, also formats it
 * @apiName ???
 * @apiGroup ???
 *
 * @apiParam {String} cc countryCode without + in front .
 * @apiParam {String} number Phone number.
 *
 * @apiSuccess {Boolean} textOutput whether bar is 'baz'
 *
 */
router.get('/', function (req, res, next) {
    res.render('phone', { title: 'Team 0x13 ' });
});

router.post('/isValidPhone', function (req, res) {

    if (req.query.cc && req.query.number)
     {
         res.json(phoneGeneral.isValidPhoneNumber(req.query.cc, req.query.number));
     }
     else
     {
         res.json({'isValid': false, 'E.164 Format': 'NA'});
     }
});

/*
*   returns - if number is valid, {isValid : bool, Format: string}
*  if number is not valid {isValid: false}
*
*/

router.post('/format', function(req, res)
{
    if(req.query.cc && req.query.number)
        res.json(phoneGeneral.formatPhoneNumber(req.query.cc, req.query.number));
    else
      res.json({'isValid': false, 'Error': 'cc or number missing'});
});

module.exports = router;
