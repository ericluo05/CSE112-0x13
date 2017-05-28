define({ "api": [
  {
    "type": "post",
    "url": "/appointment/",
    "title": "create",
    "description": "<p>This is used for Creating an appointment. Look at appointment.controller.js create for more info</p>",
    "name": "AppointmentCreate",
    "group": "Appointment",
    "version": "0.0.0",
    "filename": "server/routes/appointment/index.js",
    "groupTitle": "Appointment"
  },
  {
    "type": "get",
    "url": "/appointment/company/:id",
    "title": "getAll",
    "description": "<p>This is for getting all existant appointments. Look at appointment.controller.js getAll for more info</p>",
    "name": "AppointmentCreate",
    "group": "Appointment",
    "version": "0.0.0",
    "filename": "server/routes/appointment/index.js",
    "groupTitle": "Appointment"
  },
  {
    "type": "delete",
    "url": "/appointment/:id",
    "title": "delete",
    "description": "<p>This is used for deleting an appointment. Look at appointment.controller.js delete for more info</p>",
    "name": "AppointmentDelete",
    "group": "Appointment",
    "version": "0.0.0",
    "filename": "server/routes/appointment/index.js",
    "groupTitle": "Appointment"
  },
  {
    "type": "get",
    "url": "/appointment/",
    "title": "get",
    "description": "<p>This is used for looking up existant appointments. Look at appointment.controller.js get for more info</p>",
    "name": "AppointmentGet",
    "group": "Appointment",
    "version": "0.0.0",
    "filename": "server/routes/appointment/index.js",
    "groupTitle": "Appointment"
  },
  {
    "type": "put",
    "url": "/appointment/:id",
    "title": "update",
    "description": "<p>This is used for updating an appointment. Look at appointment.controller.js update for more info</p>",
    "name": "AppointmentUpdate",
    "group": "Appointment",
    "version": "0.0.0",
    "filename": "server/routes/appointment/index.js",
    "groupTitle": "Appointment"
  },
  {
    "type": "post",
    "url": "/company/",
    "title": "create",
    "description": "<p>This is used for user sign up. Account creation.</p>",
    "name": "CompanyCreate",
    "group": "Company",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "FormInfo",
            "optional": false,
            "field": "email",
            "description": "<p>,name,phone_number,paid_time</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "JSON",
            "optional": false,
            "field": "companyInfo",
            "description": "<p>the company Info in JSON format should be what was passed in in JSON Format</p>"
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
            "field": "CouldnotSave",
            "description": "<p>failed to save to server</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/company/index.js",
    "groupTitle": "Company"
  },
  {
    "type": "delete",
    "url": "/company/:id",
    "title": "delete",
    "description": "<p>deletes a comapny from company db</p>",
    "name": "CompanyDelete",
    "group": "Company",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "companyID",
            "optional": false,
            "field": "ID",
            "description": "<p>the companies ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "JSON",
            "optional": false,
            "field": "companyInfo",
            "description": "<p>the companies info in JSON format</p>"
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
            "field": "CouldNotFind",
            "description": "<p>wrong company ID</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "CouldnotSave",
            "description": "<p>a connection problem</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/company/index.js",
    "groupTitle": "Company"
  },
  {
    "type": "get",
    "url": "/company/:id",
    "title": "get",
    "description": "<p>This is used for user login</p>",
    "name": "CompanyGet",
    "group": "Company",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "companyID",
            "optional": false,
            "field": "companyID",
            "description": "<p>the id of he company you want info on</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "JSON",
            "optional": false,
            "field": "companyInfo",
            "description": "<p>the companies info in JSON format</p>"
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
            "field": "CouldnotSave",
            "description": "<p>failed connection</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "CouldnotFind",
            "description": "<p>company does not exist</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/company/index.js",
    "groupTitle": "Company"
  },
  {
    "type": "get",
    "url": "/company/",
    "title": "getAll",
    "description": "<p>This is used to acquire all companies public info</p>",
    "name": "CompanyGetAll",
    "group": "Company",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "JSON",
            "optional": false,
            "field": "companyInfo",
            "description": "<p>all the companies info in JSON format</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/company/index.js",
    "groupTitle": "Company"
  },
  {
    "type": "put",
    "url": "/company/setting/:user",
    "title": "resetCredentials",
    "description": "<p>Change the info for a user in a company</p>",
    "name": "CompanyResetCredentials",
    "group": "Company",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "companyID",
            "optional": false,
            "field": "companyID",
            "description": "<p>the companiesID</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>Users associated email</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>password</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "JSON",
            "optional": false,
            "field": "companyInfo",
            "description": "<p>all the companies info in JSON format</p>"
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
            "field": "CouldNotFind",
            "description": "<p>wrong company ID</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "CouldnotSave",
            "description": "<p>a connection problem</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/company/index.js",
    "groupTitle": "Company"
  },
  {
    "type": "put",
    "url": "/company/:id",
    "title": "update",
    "description": "<p>Change the info for a company</p>",
    "name": "CompanyUpdate",
    "group": "Company",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "companyID",
            "optional": false,
            "field": "ID",
            "description": "<p>the companies ID</p>"
          },
          {
            "group": "Parameter",
            "type": "formFields",
            "optional": false,
            "field": "email",
            "description": "<p>,name,phone_number only specify them if you want to change them</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "JSON",
            "optional": false,
            "field": "companyInfo",
            "description": "<p>the companies info in JSON format</p>"
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
            "field": "CouldNotFind",
            "description": "<p>wrong company ID</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "CouldnotSave",
            "description": "<p>a connection problem</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/company/index.js",
    "groupTitle": "Company"
  },
  {
    "group": "Employee",
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "server/routes/form/index.js",
    "groupTitle": "Employee",
    "name": ""
  },
  {
    "type": "delete",
    "url": "/employee/:id",
    "title": "delete",
    "description": "<p>This is for deleting an employee. Look at employee.controller.js delete for more info</p>",
    "name": "EmployeeDelete",
    "group": "Employee",
    "version": "0.0.0",
    "filename": "server/routes/employee/index.js",
    "groupTitle": "Employee"
  },
  {
    "type": "get",
    "url": "/employee/company/:id",
    "title": "getAllEmployees",
    "description": "<p>This is for getting all existant employees. Look at employee.controller.js getAllEmployees for more info</p>",
    "name": "EmployeeGetAll",
    "group": "Employee",
    "version": "0.0.0",
    "filename": "server/routes/employee/index.js",
    "groupTitle": "Employee"
  },
  {
    "type": "get",
    "url": "/employee/:id",
    "title": "getById",
    "description": "<p>This is for getting 1 existant employees using ID. Look at employee.controller.js getById for more info</p>",
    "name": "EmployeeGetById",
    "group": "Employee",
    "version": "0.0.0",
    "filename": "server/routes/employee/index.js",
    "groupTitle": "Employee"
  },
  {
    "type": "post",
    "url": "/employee/",
    "title": "insert",
    "description": "<p>This is for creating an employee. Look at employee.controller.js insert for more info</p>",
    "name": "EmployeeInsert",
    "group": "Employee",
    "version": "0.0.0",
    "filename": "server/routes/employee/index.js",
    "groupTitle": "Employee"
  },
  {
    "type": "post",
    "url": "/employee/login",
    "title": "login",
    "description": "<p>This is for login it returns an employee JSON. Look at employee.controller.js login for more info</p>",
    "name": "EmployeeLogin",
    "group": "Employee",
    "version": "0.0.0",
    "filename": "server/routes/employee/index.js",
    "groupTitle": "Employee"
  },
  {
    "type": "put",
    "url": "/employee/:id",
    "title": "update",
    "description": "<p>This is for modifying an employee. Look at employee.controller.js update for more info</p>",
    "name": "EmployeeUpdate",
    "group": "Employee",
    "version": "0.0.0",
    "filename": "server/routes/employee/index.js",
    "groupTitle": "Employee"
  },
  {
    "type": "post",
    "url": "/phone/format",
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
    "filename": "server/routes/phone.js",
    "groupTitle": "PhoneApps"
  },
  {
    "type": "post",
    "url": "/phone/isValidPhone",
    "title": "PhoneValidator",
    "name": "phoneValid",
    "group": "PhoneApps",
    "description": "<p>Respond with whether the number is valid or not , also formats it</p>",
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
    "filename": "server/routes/phone.js",
    "groupTitle": "PhoneApps"
  }
] });
