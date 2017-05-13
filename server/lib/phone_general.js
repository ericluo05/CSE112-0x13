let data_g = require('../data/PhoneData.json');

function handleError(msg) {
  return {'isValid': false, 'Error': msg};
}

function handleSuccess(countries, fmt) {
  return {'isValid': true, 'Format': fmt['Domestic']['Normal']};
  // return {  "Valid" : true, "Countries" : countries, "Format" : fmt };
}

function regexCheck(N, Suffix) {
  for (let i = 0; i < N.length; ++i)
    if (Suffix[i] !== '?')
      if (Suffix[i] !== N[i])
          return false;
  return true;
}

function isValidPhone(CC, PN) {
  // If CC and PN are together, separate them

  // Check if can handle given CC
  if (!(CC in data_g))
    return handleError('Unable to find info with Country Code: ' + CC);

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

  return handleError(data_g[CC]['Error']);
}

/**
 * @function checkVL
* @description Usage: Check PN by first checking if its length is valid, then check
 *        further by using data on its length
 * @param {string} PN Phone Number
 * @param {string} data Dictionary that contains information that can check PN
 * @return {Boolean} "isValid": validity of PN
 * @return {String} "E.164 Format" : E.164 Format of PN (Unformatted PN)
 * @return {String} "Error" : Errors
 **/
function checkVL(PN, data) {
  let PN_Length = PN.length.toString();

  // Check if data contain matching length
  if (data['Valid_Length'].indexOf(PN_Length) < 0)
    return null;

  // Only check PN_Length
  let data_l = data[PN_Length];

  // Check each countries
  for (let index_c in data_l['Countries']) {
    let country = data_l['Countries'][index_c];
    let data_c = data_l[country];

    // Check all possibilities of PN_Length in current country
    for (index_a in data_c['Areas']) {
      let area = data_c['Areas'][index_a];
      let data_a = data_c[area];

      // Separate prefix and suffix of input PN
      let prefixLength = data_a['Prefix_Length'];
      let PNPrefix = PN.substring(0, prefixLength);
      let PNSuffix = PN.substring(prefixLength);

      // Check if Prefix matches
      let prefixMatch = false;
      if (data_a['Prefix'].indexOf(PNPrefix) >= 0)
        prefixMatch = true;
      else {
        for (let index_pR in data_a['Prefix_Regex']) {
          let prefixRegex = data_a['Prefix_Regex'][index_pR];
          if (regexCheck(PNPrefix, prefixRegex)) {
            prefixMatch = true;
            break;
          }
        }
      }

      // Check if Suffix matches
      if (prefixMatch) {
        if (data_a['Suffix'].indexOf(PNSuffix) >= 0)
          return handleSuccess([country], data_a['Display_Format']);
        for (let index_s in data_a['Suffix_Regex']) {
          let suffix = data_a['Suffix_Regex'][index_s];
          if (regexCheck(PNSuffix, suffix))
            return handleSuccess([country], data_a['Display_Format']);
         // return handleError("Error: Invalid digits in " + PNSuffix);
        }
      }

      // Check Error
     // if ("Error" in data_a)
     //   return handleError(data_a["Error"]);
    }
    // Check Error
    if ('Error' in data_c)
      return handleError(data_c['Error']);
  }
  // Check Error
  if ('Error' in data_l)
    return handleError(data_l['Error']);
}

/**
 * @function formatPhoneNumber
 * @description formats a phone number
 * @param {String} cc Country Code
 * @param {String} number phone number
 * @return {Boolean} "isValid": validity of PN
 * @return {String} "Format" : formatted number
 **/
function formatPhoneNumber(cc, number) {
    let validJSON = isValidPhone(cc, number);
    if ( validJSON.isValid ) {
        let formattedNumber = validJSON['Format'];
        let i = 0;
        for (let j = 0; j < formattedNumber.length; ++j) {
            if (formattedNumber[j] != '?')
                continue;
            formattedNumber = formattedNumber.substr(0, j) + number[i]
                + formattedNumber.substr(j+1);
            ++i;
        }
        validJSON['Format'] = formattedNumber;
        return validJSON;
    }
    return {'isValid': false};
}

module.exports = {isValidPhone: isValidPhone, formatPhoneNumber: formatPhoneNumber};
