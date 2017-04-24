var data_g = require('./PhoneData.json');

function handleError(msg) {
  return {  "isValid" : false, "Error" : msg  };
}

function handleSuccess(countries, fmt) {
  return { "isValid" : true, "E.164 Format" : fmt["E.164"] };
  //return {  "Valid" : true, "Countries" : countries, "Format" : fmt };
}

function regexCheck(N, Suffix) {
  for (var i = 0; i < N.length; ++i)
    if (Suffix[i] !== "?")
      if (Suffix[i] !== N[i])
          return false;
  return true;
}

function isValidPhone(CC, PN) {
  // If CC and PN are together, separate them

  // Check if can handle given CC
  if (!(CC in data_g))
    return handleError("Unable to find info with Country Code: " + CC);

  // ------------------------------CASE 1------------------------------
  // PN shared by all countries with CC
  // result = checkSA(PN, data_g[CC]["Special_All"]);
  // if (result)
  //  return result;

  // ------------------------------CASE 2------------------------------
  // PN shared by some countries with CC
  // result = checkSS(PN, data_g[CC]["Special_Some"]);
  // if (result)
  //  return result;

  // ------------------------------CASE 3------------------------------
  // Use length of PN and data from CC to determine validity
  result = checkVL(PN, data_g[CC]);
  if (result)
    return result;

  return handleError(data_g[CC]["Error"]);
  
}

/**
 * Parameters
 * PN : Phone Number
 * data : Dictionary that contains information that can check PN
 *
 * Usage: Check PN by first checking if its length is valid, then check
 *        further by using data on its length
 * 
 * Returns
 * {bool} "isValid": validity of PN
 * {string} "E.164 Format" : E.164 Format of PN (Unformatted PN)
 * {String} "Error" : Errors
 **/
function checkVL(PN, data) {
  var PN_Length = PN.length.toString();
  console.log(data["Valid_Length"]===["10"]);

  // Check if data contain matching length
  if (data["Valid_Length"].indexOf(PN_Length) < 0)
    return null;

  // Only check PN_Length
  var data_l = data[PN_Length];

  // Check each countries
  for (var index_c in data_l["Countries"]) {
    var country = data_l["Countries"][index_c];
    var data_c = data_l[country];
    
    // Check all possibilities of PN_Length in current country
    for (index_a in data_c["Areas"]) {
      var area = data_c["Areas"][index_a];
      var data_a = data_c[area];

      // Separate prefix and suffix of input PN
      var prefixLength = data_a["Prefix_Length"];
      var PNPrefix = PN.substring(0,prefixLength);
      var PNSuffix = PN.substring(prefixLength);

      // Check if Prefix matches
      var prefixMatch = false;
      if (data_a["Prefix"].indexOf(PNPrefix) >= 0)
        prefixMatch = true;
      else {
        for (var index_pR in data_a["Prefix_Regex"]) {
          var prefixRegex = data_a["Prefix_Regex"][index_pR];
          if (regexCheck(PNPrefix, prefixRegex)) {
            prefixMatch = true;
            break;
          }
        }
      }

      // Check if Suffix matches
      if (prefixMatch) {
        if (data_a["Suffix"].indexOf(PNSuffix) >= 0)
          return handleSuccess([country], data_a["Display_Format"]);
        for (var index_s in data_a["Suffix_Regex"]) {
          var suffix = data_a["Suffix_Regex"][index_s];
          if (regexCheck(PNSuffix, suffix))
            return handleSuccess([country],data_a["Display_Format"]);
          return handleError("Error: Invalid digits in " + PNSuffix);
        }
      }
      
      // Check Error
      if ("Error" in data_a)
        return handleError(data_a["Error"]);
    }
    // Check Error
    if ("Error" in data_c)
      return handleError(data_c["Error"]);
  }
  // Check Error
  if ("Error" in data_l)
    return handleError(data_l["Error"]);
}

// FROM PHONE.JS------------

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

// uses the general handler
function handlePhone_China(number)
{
    var result = isValidPhone("86", number);
    return result["Valid"];
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
    for (var i = 0; i < MEX_AREA_CODE.length; ++i)
    {
        if (MEX_AREA_CODE[i].length === firstThree.legnth) {
            if (MEX_AREA_CODE[i].localeCompare(firstThree) == 0)
                return true;
        } else
            if (MEX_AREA_CODE[i].localeCompare(firstTwo) == 0)
                return true;
    }
    return false;
}

// currently using isValidPhone to handle general case
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
  if (number.length === 11)
    return '+?? ???????????';
  return '+?? ??? ???????';

  //return '+??? ??? ??? ????';
}

module.exports = {isValidPhone, 
                  handlePhone_US,
                  handlePhone_Mexico,
                  handlePhone_China,
                  handlePhone_General,
                  formatPhoneNumber
                  };
