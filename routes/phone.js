var express = require('express');
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
    res.render('phone', { title: 'Team 0x13' });
    // if (req.query.cc && req.query.number)
    // {
    //     res.json(isValidPhoneNumber(req.query.cc, req.query.number));
    // }
    // else
    // {
    //     res.json({'isValid': 'false', 'E.164 Format': 'NA', 'Error': 'CC or Number not provided'});
    // }
});

router.post('/phone',function (req,res) {
    var phoneNumber = {
        country_code_0: req.body.country_code_0,
        country_code_1: req.body.country_code_1,
        number: req.body.number
    }

    // console.log(phoneNumber);
    process.stdout.write(phoneNumber);
    
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
    else
    {
    	valid = handlePhone_General(number);

    }

    return {'isValid': valid, 'E.164 Format': '+??? ??? ??? ????'};
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


function handlePhone_General(number)
{
	return false;
}


/**
 * cc: country code
 * number: phone number
 **/
function formatPhoneNumber(cc, number)
{

    return '+??? ??? ??? ????';
}

module.exports = router;
