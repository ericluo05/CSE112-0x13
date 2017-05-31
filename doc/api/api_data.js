define({ "api": [
  {
    "type": "post",
    "url": "api/appointment/",
    "title": "create",
    "description": "<p>This is used for Creating an appointment. Look at appointment.controller.js create for more info</p>",
    "name": "AppointmentCreate",
    "group": "Appointment",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "first_name",
            "description": "<p>first name of person</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "last_name",
            "description": "<p>last name of person</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone_number",
            "description": "<p>phone number of person</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "date",
            "description": "<p>date of appointment</p>"
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "company_id",
            "description": "<p>id of the company that this appointment belongs to</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "provider_name",
            "description": "<p>Don't know</p>"
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
            "field": "appointment",
            "description": "<p>the newly created appointment</p>"
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
            "description": "<p>no company exists with that company ID</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "CouldNotSave",
            "description": "<p>failed connection</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AlreadyCreated",
            "description": "<p>an appointment already exists at that time</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/appointment/index.js",
    "groupTitle": "Appointment"
  },
  {
    "type": "get",
    "url": "/appointment/company/:id",
    "title": "getAll",
    "description": "<p>This is for getting all existant appointments for a specific company. Look at appointment.controller.js getAll for more info</p>",
    "name": "AppointmentCreate",
    "group": "Appointment",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "id",
            "description": "<p>the ID for a company</p>"
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
            "field": "allAppointments",
            "description": "<p>The set of all appointments for a company</p>"
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
            "description": "<p>company doesn't exist</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/appointment/index.js",
    "groupTitle": "Appointment"
  },
  {
    "type": "delete",
    "url": "api/appointment/:id",
    "title": "delete",
    "description": "<p>This is used for deleting an appointment. Look at appointment.controller.js delete for more info</p>",
    "name": "AppointmentDelete",
    "group": "Appointment",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "id",
            "description": "<p>the ID for an appointment</p>"
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
            "field": "appointment",
            "description": "<p>JSON for the appointment you just deleted</p>"
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
            "field": "CouldNotSave",
            "description": "<p>connection Error</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "CouldNotFind",
            "description": "<p>no such id</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/appointment/index.js",
    "groupTitle": "Appointment"
  },
  {
    "type": "get",
    "url": "api/appointment/:id",
    "title": "get",
    "description": "<p>This is used for looking up existant appointments. Look at appointment.controller.js get for more info</p>",
    "name": "AppointmentGet",
    "group": "Appointment",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "id",
            "description": "<p>the ID of the appointment you seek</p>"
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
            "field": "appointment",
            "description": "<p>the appointment with that id</p>"
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
            "description": "<p>appointment does not exist</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/appointment/index.js",
    "groupTitle": "Appointment"
  },
  {
    "type": "put",
    "url": "api/appointment/:id",
    "title": "update",
    "description": "<p>This is used for updating an appointment. Look at appointment.controller.js update for more info</p>",
    "name": "AppointmentUpdate",
    "group": "Appointment",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "id",
            "description": "<p>the ID for an appointment</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "first_name",
            "description": "<p>first name of person</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "last_name",
            "description": "<p>last name of person</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone_number",
            "description": "<p>phone number of person</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "date",
            "description": "<p>date of appointment</p>"
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "company_id",
            "description": "<p>id of the company that this appointment belongs to</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "provider_name",
            "description": "<p>Don't know</p>"
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
            "field": "appointment",
            "description": "<p>the new updated appointment</p>"
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
            "description": "<p>could not find appointment with that ID</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "CouldNotSave",
            "description": "<p>connection error</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/appointment/index.js",
    "groupTitle": "Appointment"
  },
  {
    "type": "post",
    "url": "/api/companies",
    "title": "create",
    "description": "<p>This is used for create a company account</p>",
    "name": "CompanyCreate",
    "group": "Company",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the company to create</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the company to create</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "phone_number",
            "description": "<p>Phone number of the company to create</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -X POST  -d {\"email\":\"newEmail@email.com\", \"name\":\"companyName\", \"phone_number\":\"6261234567\"} http://localhost/api/companies",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "_id",
            "description": "<p>ID of the company created</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the company created</p>"
          },
          {
            "group": "Success 200",
            "type": "time",
            "optional": false,
            "field": "paid_time",
            "description": "<p>Time in which the company last made a payment (or created)</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "phone_number",
            "description": "<p>Phone number of the company just created</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>Email fo the company just created</p>"
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
            "field": "CouldNotCreate",
            "description": "<p>failed to create the company</p>"
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
    "url": "/api/companies/:id",
    "title": "delete",
    "description": "<p>deletes a comapny from company db</p>",
    "name": "CompanyDelete",
    "group": "Company",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>id of the company to be deleted</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -X DELETE  http://localhost/api/companies/CompanyIDHere",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "_id",
            "description": "<p>id of the company deleted</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the company deleted</p>"
          },
          {
            "group": "Success 200",
            "type": "time",
            "optional": false,
            "field": "paid_time",
            "description": "<p>Time in which the company last made a payment, or in current case, time in which the company is created using server time</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "phone_number",
            "description": "<p>the company's phone number</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>the company's email</p>"
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
            "description": "<p>Invalid company id</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "CouldNotRemove",
            "description": "<p>Can't remove company</p>"
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
    "url": "/api/companies/",
    "title": "getAll",
    "description": "<p>This is used to acquire all companies public info</p>",
    "name": "CompanyGetAll",
    "group": "Company",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Company[]",
            "optional": false,
            "field": "Companies",
            "description": "<p>All companies in JSON format</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "Companies.name",
            "description": "<p>Name of company</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "Companies._id",
            "description": "<p>id of company</p>"
          },
          {
            "group": "Success 200",
            "type": "time",
            "optional": false,
            "field": "Companies.paid_time",
            "description": "<p>Time in which the company last made a payment</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "Companies.phone_number",
            "description": "<p>the company's phone number</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "Companies.email",
            "description": "<p>the company's email</p>"
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
    "url": "/api/companies/dur/:id",
    "title": "getSubDuration",
    "description": "<p>Get user subscription duration for admin panel</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost/api/companies/dur/IDhere123456",
        "type": "curl"
      }
    ],
    "name": "CompanyGetSubDuration",
    "group": "Company",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
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
            "field": "companyPrivateInfo",
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
            "field": "CouldNotSave",
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
    "url": "/api/companies/setting/:user",
    "title": "resetCredentials",
    "description": "<p>Change the credentials for a user in a company. DON'T USE THIS, THIS IS BROKEN. STILL NEEDS TO BE FIX</p>",
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
            "description": "<p>email of the person to reset</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>new password</p>"
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
            "field": "CouldNotSave",
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
    "url": "/api/companies/:id",
    "title": "update",
    "description": "<p>Change the info for a company</p>",
    "name": "CompanyUpdate",
    "group": "Company",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>the company's id</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "email",
            "description": "<p>only include if you want to update the company's email</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "name",
            "description": "<p>only include if you want to update the company's name</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "phone_number",
            "description": "<p>only include if you want to update the company's phone number</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -X PUT  -d {\"email\":\"newEmail@email.com\"} http://localhost/api/companies/CompanyIDHere",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "_id",
            "description": "<p>ID of the company updated</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p>[new]Name of the company updated</p>"
          },
          {
            "group": "Success 200",
            "type": "time",
            "optional": false,
            "field": "paid_time",
            "description": "<p>Time in which the company last made a payment, or in current case, time in which the company is created using server time</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "phone_number",
            "description": "<p>[new]Phone number of the company updated</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>[new]Email of the company updated</p>"
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
            "field": "CouldNotSave",
            "description": "<p>unable to save updated info</p>"
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
    "url": "/api/companies/:id",
    "title": "get",
    "description": "<p>This is used for retrieving company info</p>",
    "name": "GetCompanyInfo",
    "group": "Company",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>the id of he company you want info on</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl http://localhost/api/companies/CompanyIDHere",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the company retrieved</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "_id",
            "description": "<p>ID of the company retrieved</p>"
          },
          {
            "group": "Success 200",
            "type": "time",
            "optional": false,
            "field": "paid_time",
            "description": "<p>Time in which the company last made a payment, or in current case, time in which the company is created using server time</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "phone_number",
            "description": "<p>Phone number of the company retrieved</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the company retrieved</p>"
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
            "description": "<p>can't find company with given id</p>"
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
    "url": "/api/companies/search/:match",
    "title": "searchCompanies",
    "description": "<p>Search for companies that contains user-inputted string</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost/api/companies/search/TextToMatch",
        "type": "curl"
      }
    ],
    "name": "SearchForCompanies",
    "group": "Company",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "match",
            "description": "<p>String to search for in companies</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Company[]",
            "optional": false,
            "field": "Companies",
            "description": "<p>Companies in JSON format</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "Companies.name",
            "description": "<p>Name of company</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "Companies._id",
            "description": "<p>id of company</p>"
          },
          {
            "group": "Success 200",
            "type": "time",
            "optional": false,
            "field": "Companies.paid_time",
            "description": "<p>Time in which the company last made a payment</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "Companies.phone_number",
            "description": "<p>the company's phone number</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "Companies.email",
            "description": "<p>the company's email</p>"
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
            "field": "CouldNotSearch",
            "description": "<p>database error</p>"
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
    "url": "api/employees/:id",
    "title": "delete",
    "description": "<p>This is for deleting an employee. Look at employee.controller.js delete for more info</p>",
    "name": "EmployeeDelete",
    "group": "Employee",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "employee_id",
            "description": "<p>unique identifier for employee</p>"
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
            "field": "employee",
            "description": "<p>the JSON of the employee that was just deleted</p>"
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
            "field": "CanNotFind",
            "description": "<p>DNE error</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/employee/index.js",
    "groupTitle": "Employee"
  },
  {
    "type": "get",
    "url": "api/employees/company/:id",
    "title": "getAllEmployees",
    "description": "<p>This is for getting all existent employees. Look at employee.controller.js getAllEmployees for more info</p>",
    "name": "EmployeeGetAll",
    "group": "Employee",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "Company_id",
            "description": "<p>the id of our company</p>"
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
            "field": "result",
            "description": "<p>all the employees in JSON format</p>"
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
            "field": "CanNotFind",
            "description": "<p>there is not company with that id</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/employee/index.js",
    "groupTitle": "Employee"
  },
  {
    "type": "get",
    "url": "/employees/:id",
    "title": "getById",
    "description": "<p>This is for getting 1 existant employees using ID. Look at employee.controller.js getById for more info.</p>",
    "name": "EmployeeGetById",
    "group": "Employee",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "Employee_id",
            "description": ""
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
            "field": "employee",
            "description": "<p>employee in JSON format</p>"
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
            "field": "CanNotFind",
            "description": "<p>no employee with that id exists</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/employee/index.js",
    "groupTitle": "Employee"
  },
  {
    "type": "post",
    "url": "api/employees/",
    "title": "insert",
    "description": "<p>This is for creating an employee. Roles: c_admin: company admin c_receptionist: company receptionist c_employee: company employee a_admin: app administrator</p>",
    "name": "EmployeeInsert",
    "group": "Employee",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "first_name",
            "description": "<p>employees first name</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "last_name",
            "description": "<p>employees last name</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email tied to users account</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "phone_number",
            "description": "<p>employees phone number</p>"
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "company_id",
            "description": "<p>company for employee to be associated to</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>employees password. This is hashed then removed</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "role",
            "description": "<p>employees role in the company</p>"
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
            "field": "employee",
            "description": "<p>complete new employee in JSON format</p>"
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
            "field": "CanNotSave",
            "description": "<p>failed to connect to db</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/employee/index.js",
    "groupTitle": "Employee"
  },
  {
    "type": "post",
    "url": "/employees/login",
    "title": "login",
    "description": "<p>This is for login it returns an employee JSON. Look at employee.controller.js login for more info</p>",
    "name": "EmployeeLogin",
    "group": "Employee",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>employee's email</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>employee's password</p>"
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
            "field": "return",
            "description": "<p>employee JSON - the password</p>"
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
            "field": "CanNotFind",
            "description": "<p>not employee has that email</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "IncorrectCredentials",
            "description": "<p>password does not match</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/employee/index.js",
    "groupTitle": "Employee"
  },
  {
    "type": "put",
    "url": "api/employees/:id",
    "title": "update",
    "description": "<p>This is for modifying an employee. Do not send values if you don't want them to be updated. Look at employee.controller  for more info</p>",
    "name": "EmployeeUpdate",
    "group": "Employee",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "employee_id",
            "description": "<p>unique identifier for employee</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "first_name",
            "description": "<p>employees first name</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "last_name",
            "description": "<p>employees last name</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "email",
            "description": "<p>email tied to users account</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "phone_number",
            "description": "<p>employees phone number</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "password",
            "description": "<p>employees password. This is hashed then removed</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "role",
            "description": "<p>employees role in the company</p>"
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
            "field": "employee",
            "description": "<p>the newly create employee in JSON format</p>"
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
            "field": "CanNotUpdate",
            "description": "<p>caused by employee not existing I think</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "CanNotSave",
            "description": "<p>failed db connection</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/employee/index.js",
    "groupTitle": "Employee"
  },
  {
    "type": "post",
    "url": "/template",
    "title": "createTemplate",
    "description": "<p>This call to create a new template with a random adminID.</p>",
    "name": "CreateTemplate",
    "group": "Form",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Schema.Types.ObjectId",
            "optional": false,
            "field": "_admin_id",
            "description": "<p>object id of company schema</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "template",
            "description": "<p>If I could tell you what this is I'd be a god</p>"
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
            "field": "successJson",
            "description": "<p>resultant JSON form of the newly created template.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "JSON",
            "optional": false,
            "field": "errorJson",
            "description": "<p>Error from Mongoose as a JSON.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/form/index.js",
    "groupTitle": "Form"
  },
  {
    "type": "post",
    "url": "/template/:adminid",
    "title": "createTemplateByAdminId",
    "description": "<p>This is used for submitting a new form template for a particular admin.</p>",
    "name": "CreateTemplateByAdminId",
    "group": "Form",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "adminid",
            "optional": false,
            "field": "AdminID",
            "description": "<p>the ID of the admin this new form pertains to.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "The",
            "description": "<p>template, if not existing, is created. Else, it is updated.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "JSON",
            "optional": false,
            "field": "error",
            "description": "<p>There was an error finding the template form.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/form/index.js",
    "groupTitle": "Form"
  },
  {
    "type": "delete",
    "url": "/template/:template_id",
    "title": "deleteTemplateByTemplateId",
    "description": "<p>This is used to delete a particular template.</p>",
    "name": "DeleteTemplateByTemplateId",
    "group": "Form",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "template_id",
            "optional": false,
            "field": "TemplateID",
            "description": "<p>the ID of the template we want to delete.</p>"
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
            "field": "A",
            "description": "<p>success code from the TemplateForm.findOneAndRemove() call, in JSON format.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "JSON",
            "optional": false,
            "field": "error",
            "description": "<p>Need a template id.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/form/index.js",
    "groupTitle": "Form"
  },
  {
    "type": "get",
    "url": "/template/:adminid",
    "title": "getTemplateByAdminId",
    "description": "<p>This is used for finding a form for a particular admin by their adminID</p>",
    "name": "FindFormByAdminId",
    "group": "Form",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "adminid",
            "optional": false,
            "field": "AdminID",
            "description": "<p>the ID of the company we want to see.</p>"
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
            "field": "form",
            "description": "<p>the templated form for a specific admin.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "JSON",
            "optional": false,
            "field": "error",
            "description": "<p>There was an error finding the template form.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/form/index.js",
    "groupTitle": "Form"
  },
  {
    "type": "get",
    "url": "/template/company/:id",
    "title": "getTemplateByCompanyId",
    "description": "<p>This is used for finding a form for a company by its ID.</p>",
    "name": "FindFormByCompanyId",
    "group": "Form",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "CompanyID",
            "description": "<p>the ID of the company we want to see.</p>"
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
            "field": "form",
            "description": "<p>the form containing the particular public company info in JSON format.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "JSON",
            "optional": false,
            "field": "error",
            "description": "<p>There was an error finding the template form.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/form/index.js",
    "groupTitle": "Form"
  },
  {
    "type": "put",
    "url": "/template",
    "title": "updateTemplate",
    "description": "<p>This call updates the template.</p>",
    "name": "UpdateTemplate",
    "group": "Form",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "template_id",
            "description": "<p>id of the template you want to modify</p>"
          },
          {
            "group": "Parameter",
            "type": "template",
            "optional": false,
            "field": "template",
            "description": "<p>what you want your new template to look like</p>"
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
            "field": "json",
            "description": "<p>resultant JSON form of the updated form.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "JSON",
            "optional": false,
            "field": "error",
            "description": "<p>There was problem removing the form template.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/form/index.js",
    "groupTitle": "Form"
  },
  {
    "type": "post",
    "url": "/payment/subscription",
    "title": "CreateSubscription",
    "description": "<p>This is used to create a new Service Subscription.</p>",
    "name": "PaymentcreateSubscription",
    "group": "Payment",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "stripeEmail",
            "description": "<p>the email for subscriber</p>"
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "stripeToken",
            "description": "<p>dunno</p>"
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
            "field": "CouldNotCreate",
            "description": "<p>failed to create because of any reason</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/payment/index.js",
    "groupTitle": "Payment"
  },
  {
    "type": "get",
    "url": "/payment/subscription/:id",
    "title": "getSubscription",
    "description": "<p>This is used to verify whether a company has a subscription and get that subscription</p>",
    "name": "PaymentgetSubscription",
    "group": "Payment",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "company_id",
            "description": "<p>identifier for a company</p>"
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
            "field": "subscription",
            "description": "<p>all the info about the subscription in JSON</p>"
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
            "description": "<p>does not have a sub or company does not exist</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/payment/index.js",
    "groupTitle": "Payment"
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
  },
  {
    "type": "post",
    "url": "/visitorList",
    "title": "CreateVisitorList",
    "description": "<p>This is used to create a new visitor list.</p>",
    "name": "CreateVisitorList",
    "group": "VisitorList",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "object",
            "optional": false,
            "field": "form",
            "description": "<p>the form you are submitting</p>"
          },
          {
            "group": "Parameter",
            "type": "Schema.Types.ObjectId",
            "optional": false,
            "field": "_admin_id",
            "description": "<p>object id of company schema</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "firstName",
            "description": "<p>patients first name</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "lastName",
            "description": "<p>patients last name</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "patientEmail",
            "description": "<p>patients email</p>"
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
            "field": "SubmittedForm",
            "description": "<p>The newly created form containing the visitor list.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "JSON",
            "optional": false,
            "field": "error",
            "description": "<p>An error occured while finding visitorList form</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/form/index.js",
    "groupTitle": "VisitorList"
  },
  {
    "type": "get",
    "url": "/visitorList",
    "title": "getAllVisitorLists",
    "description": "<p>This is used to get a visitor list by patient info.</p>",
    "name": "GetAllVisitorLists",
    "group": "VisitorList",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "first_name",
            "description": "<p>patient fn</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "last_name",
            "description": "<p>patient ln</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>patient email</p>"
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
            "field": "SubmittedForm",
            "description": "<p>The form containing the visitor lists.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "JSON",
            "optional": false,
            "field": "error",
            "description": "<p>An error occured while finding visitorList form</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/form/index.js",
    "groupTitle": "VisitorList"
  },
  {
    "type": "get",
    "url": "/visitorList/:form_id",
    "title": "getVisitorListByFormId",
    "description": "<p>This is used to get the visitor list with a specific form ID.</p>",
    "name": "GetVisitorListByFormId",
    "group": "VisitorList",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "form_id",
            "optional": false,
            "field": "FormId",
            "description": "<p>the form ID containg the visitor list we want to see.</p>"
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
            "field": "SubmittedForm",
            "description": "<p>The form containing the visitor list.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "JSON",
            "optional": false,
            "field": "error",
            "description": "<p>An error occured while finding visitorList form</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/form/index.js",
    "groupTitle": "VisitorList"
  }
] });
