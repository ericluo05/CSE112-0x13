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
    res.render('phone', { title: 'Team 0x13 ' });
});

router.post('/isValidPhone',function (req,res) {
    var phoneNumber = {
        country_code_0: req.body.country_code_0,
        country_code_1: req.body.country_code_1,
        number: req.body.number
    }

    if (req.body.country_code_1 && req.body.number)
     {
         res.json(isValidPhoneNumber(req.body.country_code_1, req.body.number));
     }
     else
     {
         res.json({'isValid': 'false', 'E.164 Format': 'NA'});
     }
});

router.post('/format', function(req, res, next)
{
    res.json({'E.164 Format': 'Some kind of format here'});
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
        return {'isValid': 'false', 'E.164 Format': 'NA', "Error": "CC or nubmer is not a string"};

    var i, length, c;
    for(i = 0, len = cc.length; i < len; ++i )
    {
       c = cc.charCodeAt(i);
       if(!(c > 47 && c < 58)) //contains non-alpha. char
          return {'isValid': 'false', 'E.164 Format': 'NA', "Error": "CC Contains invalid character"};
    }

    for(i = 0, len = number.length; i < len; ++i )
    {
       c = number.charCodeAt(i);
       if(!(c > 47 && c < 58)) //contains non-alpha. char
          return {'isValid': 'false4', 'E.164 Format': 'NA', "Error": "Number Contains invalid character"};
    }

    var valid = 'N/A';
    var format = '+??? ??? ??? ????';
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

    if(valid)
        return {'isValid': true, 'E.164 Format': formatPhoneNumber(cc, number)};
    else
        return {'isValid': false, 'E.164 Format': 'NA'};

}

var US_AREA_CODE = [201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 223, 224, 225, 226, 228, 229, 231, 234, 236, 239, 240, 242, 246, 248, 250, 251, 252, 253, 254, 256, 260, 262, 264, 267, 268, 269, 270, 272, 276, 278, 281, 283, 284, 289, 301, 302, 303, 304, 305, 306, 307, 308, 309, 310, 311, 312, 313, 314, 315, 316, 317, 318, 319, 320, 321, 323, 325, 330, 331, 334, 336, 337, 339, 340, 341, 343, 345, 346, 347, 351, 352, 360, 361, 365, 369, 380, 385, 386, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 419, 423, 424, 425, 430, 431, 432, 434, 435, 437, 438, 440, 441, 442, 443, 450, 456, 458, 464, 469, 470, 473, 475, 478, 479, 480, 481, 484, 500, 501, 502, 503, 504, 505, 506, 507, 508, 509, 510, 511, 512, 513, 514, 515, 516, 517, 518, 519, 520, 530, 539, 540, 541, 548, 551, 555, 557, 559, 561, 562, 563, 564, 567, 570, 571, 573, 574, 575, 579, 580, 581, 585, 586, 587, 600, 601, 602, 603, 604, 605, 606, 607, 608, 609, 610, 611, 612, 613, 614, 615, 616, 617, 618, 619, 620, 623, 626, 627, 628, 629, 630, 631, 636, 639, 641, 646, 647, 649, 650, 651, 657, 660, 661, 662, 664, 669, 670, 671, 678, 679, 681, 682, 684, 689, 700, 701, 702, 703, 704, 705, 706, 707, 708, 709, 710, 711, 712, 713, 714, 715, 716, 717, 718, 719, 720, 721, 724, 725, 727, 731, 732, 734, 737, 740, 743, 747, 754, 757, 758, 760, 762, 763, 764, 765, 767, 769, 770, 772, 773, 774, 775, 778, 779, 780, 781, 782, 784, 785, 786, 787, 800, 801, 802, 803, 804, 805, 806, 807, 808, 809, 810, 811, 812, 813, 814, 815, 816, 817, 818, 819, 822, 825, 828, 829, 830, 831, 832, 833, 835, 843, 844, 845, 847, 848, 849, 850, 855, 856, 857, 858, 859, 860, 862, 863, 864, 865, 866, 867, 868, 869, 870, 872, 873, 876, 877, 878, 880, 881, 882, 888, 898, 900, 901, 902, 903, 904, 905, 906, 907, 908, 909, 910, 911, 912, 913, 914, 915, 916, 917, 918, 919, 920, 925, 927, 928, 929, 931, 935, 936, 937, 939, 940, 941, 947, 949, 951, 952, 954, 956, 957, 959, 970, 971, 972, 973, 975, 976, 978, 979, 980, 984, 985, 989];


//input number is a string that contains only 0-9 , checking that it contains non digit chars is done in isValidPhone
function handlePhone_US(number)
{
    if( number.length !== 10)
       return false;
    var areaCode = number.substring(0,3);
    areaCode = parseInt(areaCode, 10);
    if(US_AREA_CODE.indexOf(areaCode) === -1)
       return false;
    else
       return true;
}

function handlePhone_China(number)
{
    return false;
}

/**
 * Parameters
 * number: phone number
 *
 * Returns
 * {string} isValid  - phone number is valid or not
**/
function handlePhone_Mexico(number)
{
    var MEX_AREA_CODE = ['55', '81', '33', '656', '614', '999', '222', '442', '449', '664', '844', '833', '686', '667', '722', '998', '871', '744', '444', '833', '477', '961', '662', '229', '443'];
    var DIGIT_AFTER_PREFIX = 10;
    var firstTwo = number.substring(0, 2);
    var firstThree = number.substring(0, 3);
    if (number.length != DIGIT_AFTER_PREFIX)
        return false;
    for (int i = 0; i < MEX_AREA_CODE.length; ++i)
    {
        if (MEX_AREA_CODE[i].length === firstThree.legnth)
            if (MEX_AREA_CODE[i] === firstThree)
                return true;
        else 
            if (MEX_AREA_CODE[i] === firstTwo)
                return true;
    } 
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
