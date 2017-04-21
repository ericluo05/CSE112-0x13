var express = require('express');
var fooAPI = require('../calls/fooAPI')
var router = express.Router();

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
router.get('/', function(req, res, next)
{
    if (req.query.cc && req.query.number)
    {
        res.json(isValidPhoneNumber(req.query.cc, req.query.number));
    }
    else
    {
        res.json({'Error': 'CC or Number not provided'});
    }



});

/**
 * Parameters
* cc: country code
* number: phone number
 *
 * Returns
 * {boolean} isValid  - phone number is valid or not
 * {boolean} E.164 Format  - correctly formatted phone number, or NA
**/
function isValidPhoneNumber(cc, number)
{

    return {'isValid': 'maybe?', 'E.164 Format': '+??? ??? ??? ????'};
}

/**
 * cc: country code
 * number: phone number
 **/
function formatPhoneNumber(cc, number)
{

}

module.exports = router;

