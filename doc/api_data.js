define({ "api": [
  {
    "type": "get",
    "url": "/foo?bar",
    "title": "",
    "name": "FooTest",
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
  }
] });
