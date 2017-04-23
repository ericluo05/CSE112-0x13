import json

with open("CC_52.json", 'r') as f:
  data_g = json.load(f)

with open("CC_1.json", 'r') as f:
  tmp = json.load(f)
  data_g["1"] = tmp["1"]

def handleError(msg):
  return {  "Valid" : False,
            "Error" : msg
         }

def handleSuccess(fmt):
  return {  "Valid" : True,
            "Format" : fmt
         }

def suffixCheck(N, Suffix):
  for i in range(len(N)):
    if Suffix[i] != "?":
      if Suffix[i] != N[i]:
        return False
  return True

def isValidPhone(CC, PN):
  result = { "Valid" : True }
  PN_Length = str(len(PN))

  # If CC and PN are together, separate them

  # Check if can handle given CC
  if not CC in data_g.keys():
    return handleError("Unable to find info with Country Code: {}".format(CC))

  # copy of data for given CC
  data = data_g[CC]

  # Case 1  --------------------------------------------------------------------
  # Commonalities some countries with CC share
  allCountries = data["Countries"]
  specialAll = data["Special_All"]
  
  print(PN_Length)
  # Length match
  if PN_Length in specialAll["Valid_Length"]:
    print("Length exist in Special_All")

    # iterate all special cases
    for caseName in specialAll["Cases"]:
      print("Iterating through special case")
      specialCase = specialAll[caseName]
      
      if PN_Length == specialCase["Valid_Length"]:
        print("Matching length")
        if PN in specialCase["Number"]:
          print("Matching number")
          return handleSuccess(specialCase["Display_Format"])
        # exhaust possibilities
        if "Error" in specialCase.keys():
          return handleError(specialCase["Error"])

    # exhaust possibilities
    if "Error" in specialAll.keys():
      return handleError(specialAll["Error"])


  # Case 2  --------------------------------------------------------------------
  # Commonalities some countries with CC share
  specialSome = data["Special_Some"]
  
  # Length match
  if PN_Length in specialSome["Valid_Length"]:
    print("Length exist in Special_Some")

    # iterate all special cases
    for caseName in specialSome["Cases"]:
      print("Iterating through special case")
      specialCase = specialSome[caseName]
      
      if PN_Length == specialCase["Valid_Length"]:
        print("Matching length")
        if PN in specialCase["Number"]:
          print("Matching number")
          return handleSuccess(specialCase["Display_Format"])
        # exhaust possibilities
        if "Error" in specialCase.keys():
          return handleError(specialCase["Error"])

    # exhaust possibilities
    if "Error" in specialSome.keys():
      return handleError(specialSome["Error"])


  # Case 3  --------------------------------------------------------------------
  # Valid length

  # check for invalid length
  if not PN_Length in data["Valid_Length"]:
    return handleError("Invalid length")

  # only check same length
  data_l = data[PN_Length]
  
  for country in data_l["Countries"]:
    data_c = data_l[country]
    for area in data_c["Areas"]:
      data_a = data_c[area]
      areaCodeLength = data_a["Area_Code_Length"]
      PNAreaCode = PN[:areaCodeLength]
      PNSuffix = PN[areaCodeLength]
      if PNAreaCode in data_a["Area_Code"]:
        if suffixCheck(PNSuffix, data_a["Suffix"]):
          return handleSuccess(data_a["Display_Format"])
        return handleError("Error in some digits")

  if "Error" in data_l.keys():
    return handleError(data_l["Error"])

  if "Error" in data.keys():
    return handleError(data["Error"])
  print("EOF")
