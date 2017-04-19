define({ "api": [
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "doc/main.js",
    "group": "C__Users_nicolas_LAMA_SOLET_Desktop_GitHub_CSE112_0x13_doc_main_js",
    "groupTitle": "C__Users_nicolas_LAMA_SOLET_Desktop_GitHub_CSE112_0x13_doc_main_js",
    "name": ""
  },
  {
    "type": "get",
    "url": "/object/:functionCall",
    "title": "functionName",
    "description": "<p>Description/the purpose of the function.</p>",
    "name": "uniqueNameTagForFunctionThisDoesNotShowUpOnThePage",
    "group": "ObjectNameorWhatThisMethodIsAPartOf",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Type",
            "optional": false,
            "field": "paramterName",
            "description": "<p>description of the variable</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "paramInt",
            "description": "<p>an example variable.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Type",
            "optional": false,
            "field": "returnVar",
            "description": "<p>variable or thing that is returned from function</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NameOfError",
            "description": "<p>how the error occurs.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "doc/Documenation Style Guide.js",
    "groupTitle": "ObjectNameorWhatThisMethodIsAPartOf"
  }
] });
