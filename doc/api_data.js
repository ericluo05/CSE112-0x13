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
    "title": "Respond with whether the number is valid or not, also formats it",
    "name": "___",
    "group": "___",
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
            "type": "Boolean",
            "optional": false,
            "field": "textOutput",
            "description": "<p>whether bar is 'baz'</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/phone.js",
    "groupTitle": "___"
  }
] });
