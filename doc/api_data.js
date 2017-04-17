define({ "api": [
  {
    "type": "get",
    "url": "/foo",
    "title": "checks if input is baz",
    "name": "Foo_Check",
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
            "field": "parameter",
            "description": "<p>is 'baz'</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/foo.js",
    "group": "C__Users_eric__Desktop_CSE112_0x13_routes_foo_js",
    "groupTitle": "C__Users_eric__Desktop_CSE112_0x13_routes_foo_js"
  }
] });
