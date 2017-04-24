var express = require('express');
var router = express.Router();
var phoneGeneral = require('./phone_general');

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
    var phoneNumber = {
        country_code_0: req.query.country_code_0,
        country_code_1: req.query.country_code_1,
        number: req.query.number
    };

    if (req.query.country_code_1 && req.query.number)
     {
         res.json(isValidPhoneNumber(req.query.country_code_1, req.query.number));
     }
     else
     {
         res.json({'isValid': false, 'E.164 Format': 'NA'});
     }
});

router.post('/format', function(req, res)
{
    if(req.query.number)
        res.json({'E.164 Format': 'Some kind of format here'});
    else
        res.json({'E.164 Format': 'not available', 'Error': 'number is not present'});

});


/**
 * Parameters
* cc: country code
* number: phone number
 *
 * Returns
 * {bool} isValid  - phone number is valid or not
 * {string} E.164 Format  - correctly formatted phone number, or NA
**/
function isValidPhoneNumber(cc, number)
{
    if((typeof cc !==  'string') && (typeof number !== 'string'))
        return {'isValid': false, 'E.164 Format': 'NA', "Error": "CC or nubmer is not a string"};

    var i, length, c;
    for(i = 0, len = cc.length; i < len; ++i )
    {
       c = cc.charCodeAt(i);
       if(!(c > 47 && c < 58)) //contains non-alpha. char
          return {'isValid': false, 'E.164 Format': 'NA', "Error": "CC Contains invalid character"};
    }

    for(i = 0, len = number.length; i < len; ++i )
    {
       c = number.charCodeAt(i);
       if(!(c > 47 && c < 58)) //contains non-alpha. char
          return {'isValid': false, 'E.164 Format': 'NA', "Error": "Number Contains invalid character"};
    }
    
    /* retval format:
     * {  "isValid" : boolean,
     *    "E.164 Format" : "+?*", // Only when isValid
     *    "Error" : "*"           // Only when !isValid
     * }
     */
    var retval = phoneGeneral.isValidPhone(cc, number);
    // Format phone number if necessary here before returning
    return retval;

    /*
    var valid = 'N/A';
    var format = '+??? ??? ??? ????';
    if(cc === '1')
    {
        valid = phoneGeneral.handlePhone_US(number);
    }
    else if( cc === '86')
    {
        valid = phoneGeneral.handlePhone_China(number);
    }
    else if( cc === '52')
    {
        valid = phoneGeneral.handlePhone_Mexico(number);
    }
    else
    {
    	valid = phoneGeneral.handlePhone_General(number);
    }

    if(valid)
        return {'isValid': true, 'E.164 Format': phoneGeneral.formatPhoneNumber(cc, number)};
    else
        return {'isValid': false, 'E.164 Format': 'NA'};
    */

}

module.exports = router;
