var data_g = require('./PhoneData.json');

function handleError(msg) {
  return {  "Valid" : false, "Error" : msg  }
}

function handleSuccess(countries, fmt) {
  return {  "Valid" : true, "Countries" : countries, "Format" : fmt }
}

function regexCheck(N, Suffix) {
  for (var i = 0; i < N.length; ++i)
    if (Suffix[i] !== "?")
      if (Suffix[i] !== N[i])
          return false;
  return true;
}

var isValidPhone = function(CC, PN) {
  // If CC and PN are together, separate them

  // Check if can handle given CC
  if (!(CC in data_g))
    return handleError("Unable to find info with Country Code: " + CC);

  // ------------------------------CASE 1------------------------------
  // result = checkSA(PN, data_g[CC]["Special_All"]);
  // if (result)
  //  return result;

  // ------------------------------CASE 2------------------------------
  // result = checkSS(PN, data_g[CC]["Special_Some"]);
  // if (result)
  //  return result;

  // ------------------------------CASE 3------------------------------
  result = checkVL(PN, data_g[CC]);
  if (result)
    return result;

  return handleError(data_g[CC]["Error"]);
  
};
/*
console.log(isValidPhone("1","5109999999")); 
*/


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

module.exports.isValidPhone = isValidPhone;
