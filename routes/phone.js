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
   /* if (req.query.cc && req.query.number)
    {
        res.json(isValidPhoneNumber(req.query.cc, req.query.number));
    }
    else
    {
        res.json({'isValid': 'false', 'E.164 Format': 'NA', 'Error': 'CC or Number not provided'});
    }*/
    res.json({'OS': process.platform});
});

/**
 * Parameters
* cc: country code
* number: phone number
 *
 * Returns
 * {string} isValid  - phone number is valid or not
 * {string} E.164 Format  - correctly formatted phone number, or NA
**/
function isValidPhoneNumber(cc, number)
{
    if((typeof cc !==  'string') && (typeof number !== 'string'))
        return {'isValid': 'false', 'E.164 Format': 'NA', 'Error': 'Data type error'};

    //note: don't parse cc to int, because parseInt has undesired parsing behaviors
    var valid = 'maybe';
    if(cc === '1')
    {
        valid = handlePhone_US(number);
    }
    else if( cc === '86')
    {
        valid = handlePhone_China(number);
    }
    else if( cc === '52')
    {
        valid = handlePhone_Mexico(number);
    }

    return {'isValid': valid, 'E.164 Format': '+??? ??? ??? ????'};
}

/**
 * cc: country code
 * number: phone number
 **/
function formatPhoneNumber(cc, number)
{

    return '+??? ??? ??? ????';
}

function handlePhone_US(number)
{
    return false;
}

function handlePhone_China(number)
{
    return false;
}


function handlePhone_Mexico(number)
{
    return false;
}

module.exports = router;

