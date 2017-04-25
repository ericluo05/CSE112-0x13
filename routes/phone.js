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
    var phoneNumber = {
        country_code_0: req.query.country_code_0,
        country_code_1: req.query.country_code_1,
        number: req.query.number
    };

    if (req.query.country_code_1 && req.query.number)
     {
         res.json(phoneGeneral.isValidPhoneNumber(req.query.country_code_1, req.query.number));
     }
     else
     {
         res.json({'isValid': false, 'E.164 Format': 'NA'});
     }
});

router.post('/format', function(req, res)
{
    if(req.query.cc && req.query.number)
    {
        res.json(phoneGeneral.formatPhoneNumber(req.query.cc,
                                                req.query.number));
    }
    else
        res.json({
          'E.164 Format': 'not available',
          'Error': 'number is not present'
        });

});


module.exports = router;
