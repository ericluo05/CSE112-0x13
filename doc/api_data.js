define({ "api": [
  {
    "type": "get",
    "url": "/foo?bar",
    "title": "fooMethod",
    "name": "bar",
    "group": "Foo",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "bar",
            "description": "<p>just some input.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "textOutput",
            "description": "<p>whether bar is 'baz'</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/foo.js",
    "groupTitle": "Foo"
  },
  {
    "type": "get",
    "url": "/phone",
    "title": "PhoneFormatter",
    "name": "phoneFormat",
    "group": "PhoneApps",
    "description": "<p>Formats a number</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "cc",
            "description": "<p>countryCode without + in front .</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "number",
            "description": "<p>Phone number.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "FormatedPhone",
            "description": "<p>a string that is the formatted version of the passed in number if isPhoneValid is false this returns an error.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "isPhoneValid",
            "description": "<p>Whether the number is valid or not.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/phone.js",
    "groupTitle": "PhoneApps"
  },
  {
    "type": "get",
    "url": "/phone",
    "title": "PhoneValidator",
    "name": "phoneValid",
    "group": "PhoneApps",
    "description": "<p>Respond with whether the number is valid or not, also formats it</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "cc",
            "description": "<p>countryCode without + in front .</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "number",
            "description": "<p>Phone number.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "FormatedPhone",
            "description": "<p>a string that is the formatted version of the passed in number</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "isPhoneValid",
            "description": "<p>Whether the number is valid or not</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/phone.js",
    "groupTitle": "PhoneApps"
  }
] });
