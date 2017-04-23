import json

with open("PhoneData.json", 'r') as f:
  data_g = json.load(f)

def handleError(msg):
  return {  "Valid" : False,
            "Error" : msg
         }

def handleSuccess(countries, fmt):
  return {  "Valid" : True,
            "Countries" : countries,
            "Format" : fmt
         }

def regexCheck(N, Suffix):
  for i in range(len(N)):
    if Suffix[i] != "?":
      if Suffix[i] != N[i]:
        return False
  return True

# Check Special_All section
def checkSA(PN, data):
  PN_Length = str(len(PN))

  # Check if data contain matching length
  if not PN_Length in data["Valid_Length"]:
    return None

  Countries = data["Countries"]

  # only check same length
  data_l = data[PN_Length]
  
  # Check all possibilities of PN_Length
  for area in data_l["Areas"]:
    data_a = data_l[area]

    # Separate prefix and suffix of input PN
    prefixLength = data_a["Prefix_Length"]
    PNPrefix = PN[:prefixLength]
    PNSuffix = PN[prefixLength:]

    # Check if Prefix matches
    prefixMatch = False
    if PNPrefix in data_a["Prefix"]:
      prefixMatch = True
    else:
      for prefixRegex in data_a["Prefix_Regex"]:
        if regexCheck(PNPrefix, prefixRegex):
          prefixMatch = True
          break

    # Check if Suffix matches
    if prefixMatch:
      if PNSuffix in data_a["Suffix"]:
        return handleSuccess(Countries,data_a["Display_Format"])
      for suffix in data_a["Suffix_Regex"]:
        if regexCheck(PNSuffix, suffix):
          return handleSuccess(Countries,data_a["Display_Format"])
      return handleError("Error: Invalid digit in {}".format(PNSuffix))

    # Check error
    if "Error" in data_a.keys():
      return handleError(data_a["Error"])
  if "Error" in data_l.keys():
    return handleError(data_l["Error"])

  return None

# Check Special_Some section
def checkSS(PN, data):
  PN_Length = str(len(PN))

  # Check if data contain matching length
  if not PN_Length in data["Valid_Length"]:
    return None

  # only check same length
  data_l = data[PN_Length]
  
  # Check all possibilities of PN_Length in country
  for area in data_l["Areas"]:
    data_a = data_l[area]

    Countries = data_a["Countries"]

    # Separate prefix and suffix of input PN
    prefixLength = data_a["Prefix_Length"]
    PNPrefix = PN[:prefixLength]
    PNSuffix = PN[prefixLength:]

    # Check if Prefix matches
    prefixMatch = False
    if PNPrefix in data_a["Prefix"]:
      prefixMatch = True
    else:
      for prefixRegex in data_a["Prefix_Regex"]:
        if regexCheck(PNPrefix, prefixRegex):
          prefixMatch = True
          break

    # Check if Suffix matches
    if prefixMatch:
      if PNSuffix in data_a["Suffix"]:
        return handleSuccess(Countries,data_a["Display_Format"])
      for suffix in data_a["Suffix_Regex"]:
        if regexCheck(PNSuffix, suffix):
          return handleSuccess(Countries,data_a["Display_Format"])
      return handleError("Error: Invalid digit in {}".format(PNSuffix))

    # Check error
    if "Error" in data_a.keys():
      return handleError(data_a["Error"])
  if "Error" in data_l.keys():
    return handleError(data_l["Error"])

  return None

# Check Valid_Length section
def checkVL(PN, data):
  PN_Length = str(len(PN))

  # Check if data contain matching length
  if not PN_Length in data["Valid_Length"]:
    return None

  # only check same length
  data_l = data[PN_Length]
  
  # Check each countries
  for country in data_l["Countries"]:
    data_c = data_l[country]

    # Check all possibilities of PN_Length in country
    for area in data_c["Areas"]:
      data_a = data_c[area]

      # Separate prefix and suffix of input PN
      prefixLength = data_a["Prefix_Length"]
      PNPrefix = PN[:prefixLength]
      PNSuffix = PN[prefixLength:]

      # Check if Prefix matches
      prefixMatch = False
      if PNPrefix in data_a["Prefix"]:
        prefixMatch = True
      else:
        for prefixRegex in data_a["Prefix_Regex"]:
          if regexCheck(PNPrefix, prefixRegex):
            prefixMatch = True
            break

      # Check if Suffix matches
      if prefixMatch:
        if PNSuffix in data_a["Suffix"]:
          return handleSuccess([country],data_a["Display_Format"])
        for suffix in data_a["Suffix_Regex"]:
          if regexCheck(PNSuffix, suffix):
            return handleSuccess([country],data_a["Display_Format"])
        return handleError("Error: Invalid digits in {}".format(PNSuffix))

      # Check error
      if "Error" in data_a.keys():
        return handleError(data_a["Error"])
    if "Error" in data_c.keys():
      return handleError(data_c["Error"])
  if "Error" in data_l.keys():
    return handleError(data_l["Error"])

  return None

def isValidPhone(CC, PN):
  result = { "Valid" : True }
  PN_Length = str(len(PN))

  # If CC and PN are together, separate them

  # Check if can handle given CC
  if not CC in data_g.keys():
    return handleError("Unable to find info with Country Code: {}".format(CC))

  # copy of data for given CC
  data = data_g[CC]

  # ------------------------------CASE 1------------------------------
  # Commonalities all countries with CC share
  result = checkSA(PN, data["Special_All"])
  if result:
    return result

  # ------------------------------CASE 2------------------------------
  # Commonalities only some countries with CC share
  result = checkSS(PN, data["Special_Some"])
  if result:
    return result

  # ------------------------------CASE 3------------------------------
  # Unique number for each country with CC
  result = checkVL(PN, data)
  if result:
    return result

  return handleError(data["Error"])
