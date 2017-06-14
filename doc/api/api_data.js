define({ "api": [
  {
    "type": "post",
    "url": "/api/appointments/",
    "title": "Create appt",
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
            "description": "<p>name of provider</p>"
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
          }
        ],
        "Error 400": [
          {
            "group": "Error 400",
            "optional": false,
            "field": "CouldNotSave",
            "description": "<p>failed connection</p>"
          },
          {
            "group": "Error 400",
            "optional": false,
            "field": "AlreadyCreated",
            "description": "<p>an appointment already exists at that time</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/appointment/index.js",
    "groupTitle": "Appointment",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>ID of the the appointment</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "first_name",
            "description": "<p>first name of person</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "last_name",
            "description": "<p>last name of person</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "phone_number",
            "description": "<p>phone number of person</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "date",
            "description": "<p>date of appointment</p>"
          },
          {
            "group": "Success 200",
            "type": "int",
            "optional": false,
            "field": "company_id",
            "description": "<p>id of the company that this appointment belongs to</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "provider_name",
            "description": "<p>name of provider</p>"
          }
        ]
      }
    }
  },
  {
    "type": "delete",
    "url": "/api/appointments/:id",
    "title": "Delete appt",
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
    "error": {
      "fields": {
        "Error 400": [
          {
            "group": "Error 400",
            "optional": false,
            "field": "CouldNotSave",
            "description": "<p>connection Error</p>"
          },
          {
            "group": "Error 400",
            "optional": false,
            "field": "CouldNotFind",
            "description": "<p>no such id</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/appointment/index.js",
    "groupTitle": "Appointment",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>ID of the the appointment</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "first_name",
            "description": "<p>first name of person</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "last_name",
            "description": "<p>last name of person</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "phone_number",
            "description": "<p>phone number of person</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "date",
            "description": "<p>date of appointment</p>"
          },
          {
            "group": "Success 200",
            "type": "int",
            "optional": false,
            "field": "company_id",
            "description": "<p>id of the company that this appointment belongs to</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "provider_name",
            "description": "<p>name of provider</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/api/appointments/:id",
    "title": "Get appt by id",
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
    "error": {
      "fields": {
        "Error 400": [
          {
            "group": "Error 400",
            "optional": false,
            "field": "CouldNotFind",
            "description": "<p>appointment does not exist</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/appointment/index.js",
    "groupTitle": "Appointment",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>ID of the the appointment</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "first_name",
            "description": "<p>first name of person</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "last_name",
            "description": "<p>last name of person</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "phone_number",
            "description": "<p>phone number of person</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "date",
            "description": "<p>date of appointment</p>"
          },
          {
            "group": "Success 200",
            "type": "int",
            "optional": false,
            "field": "company_id",
            "description": "<p>id of the company that this appointment belongs to</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "provider_name",
            "description": "<p>name of provider</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/api/appointments/company/:id",
    "title": "Get all",
    "description": "<p>This is for getting all existant appointments for a specific company. Look at appointment.controller.js getAll for more info</p>",
    "name": "AppointmentGetAll",
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
    "error": {
      "fields": {
        "Error 400": [
          {
            "group": "Error 400",
            "optional": false,
            "field": "CouldNotFind",
            "description": "<p>company doesn't exist</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/appointment/index.js",
    "groupTitle": "Appointment",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Appointment[]",
            "optional": false,
            "field": "Appointments",
            "description": "<p>Info of all appointments belonging to a particular company in <code>JSON</code> format</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Appointments._id",
            "description": "<p>ID of the the appointment</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Appointments.phone_number",
            "description": "<p>phone number of person</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "Appointments.date",
            "description": "<p>date of appointment</p>"
          },
          {
            "group": "Success 200",
            "type": "int",
            "optional": false,
            "field": "Appointments.company_id",
            "description": "<p>id of the company that this appointment belongs to</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Appointments.provider_name",
            "description": "<p>name of provider</p>"
          }
        ]
      }
    }
  },
  {
    "type": "put",
    "url": "/api/appointments/:id",
    "title": "Update appt",
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
            "optional": true,
            "field": "first_name",
            "description": "<p>first name of person</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "last_name",
            "description": "<p>last name of person</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "phone_number",
            "description": "<p>phone number of person</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": true,
            "field": "date",
            "description": "<p>date of appointment</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "provider_name",
            "description": "<p>name of provider</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 400": [
          {
            "group": "Error 400",
            "optional": false,
            "field": "CouldNotFind",
            "description": "<p>could not find appointment with that ID</p>"
          },
          {
            "group": "Error 400",
            "optional": false,
            "field": "CouldNotSave",
            "description": "<p>connection error</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/appointment/index.js",
    "groupTitle": "Appointment",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>ID of the the appointment</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "first_name",
            "description": "<p>first name of person</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "last_name",
            "description": "<p>last name of person</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "phone_number",
            "description": "<p>phone number of person</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "date",
            "description": "<p>date of appointment</p>"
          },
          {
            "group": "Success 200",
            "type": "int",
            "optional": false,
            "field": "company_id",
            "description": "<p>id of the company that this appointment belongs to</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "provider_name",
            "description": "<p>name of provider</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/api/companies",
    "title": "Create company",
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
        "content": "POST /api/companies HTTP/1.1\nHost: localhost\nContent-Type: application/x-www-form-urlencoded\nname=companyName\nemail=email@domain.com\nphone_number=5621234567",
        "type": "HTTP"
      }
    ],
    "error": {
      "fields": {
        "Error 400": [
          {
            "group": "Error 400",
            "optional": false,
            "field": "UniqueEmailNeeded",
            "description": "<p>email address is already used by a different company</p>"
          },
          {
            "group": "Error 400",
            "optional": false,
            "field": "CouldNotCreate",
            "description": "<p>failed to create the company</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/company/index.js",
    "groupTitle": "Company",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "_id",
            "description": "<p>ID of the company</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the company</p>"
          },
          {
            "group": "Success 200",
            "type": "time",
            "optional": false,
            "field": "paid_time",
            "description": "<p>Time in which the company last made a payment</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "phone_number",
            "description": "<p>Phone number of the company</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>Email fo the company</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "create_time",
            "description": "<p>time in which the company is created</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "sub_expiration",
            "description": "<p>time in which the subscription expires</p>"
          },
          {
            "group": "Success 200",
            "type": "int",
            "optional": false,
            "field": "num_months_subscribed",
            "description": "<p>number of months subscribed thus far</p>"
          },
          {
            "group": "Success 200",
            "type": "int",
            "optional": false,
            "field": "revenue",
            "description": "<p>total amount paid by this company thus far</p>"
          },
          {
            "group": "Success 200",
            "type": "int",
            "optional": false,
            "field": "num_employees",
            "description": "<p>number of registered employees</p>"
          }
        ]
      }
    }
  },
  {
    "type": "delete",
    "url": "/api/companies/:id",
    "title": "Delete company",
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
        "content": "DELETE /api/companies/id HTTP/1.1\nHost: localhost",
        "type": "HTTP"
      }
    ],
    "error": {
      "fields": {
        "Error 400": [
          {
            "group": "Error 400",
            "optional": false,
            "field": "CouldNotFind",
            "description": "<p>Invalid company id</p>"
          },
          {
            "group": "Error 400",
            "optional": false,
            "field": "CouldNotRemove",
            "description": "<p>Can't remove company</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/company/index.js",
    "groupTitle": "Company",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "_id",
            "description": "<p>ID of the company</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the company</p>"
          },
          {
            "group": "Success 200",
            "type": "time",
            "optional": false,
            "field": "paid_time",
            "description": "<p>Time in which the company last made a payment</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "phone_number",
            "description": "<p>Phone number of the company</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>Email fo the company</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "create_time",
            "description": "<p>time in which the company is created</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "sub_expiration",
            "description": "<p>time in which the subscription expires</p>"
          },
          {
            "group": "Success 200",
            "type": "int",
            "optional": false,
            "field": "num_months_subscribed",
            "description": "<p>number of months subscribed thus far</p>"
          },
          {
            "group": "Success 200",
            "type": "int",
            "optional": false,
            "field": "revenue",
            "description": "<p>total amount paid by this company thus far</p>"
          },
          {
            "group": "Success 200",
            "type": "int",
            "optional": false,
            "field": "num_employees",
            "description": "<p>number of registered employees</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/api/companies/",
    "title": "Get info of all companies",
    "description": "<p>This is used to acquire all companies public info</p>",
    "name": "CompanyGetAll",
    "group": "Company",
    "version": "0.0.0",
    "filename": "server/routes/company/index.js",
    "groupTitle": "Company",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Company[]",
            "optional": false,
            "field": "Companies",
            "description": "<p>Info of all companies in <code>JSON</code> format</p>"
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
            "type": "string",
            "optional": false,
            "field": "Companies.name",
            "description": "<p>Name of company</p>"
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
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "Companies.create_time",
            "description": "<ul> <li>time in which the company is created</li> </ul>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "Companies.sub_expiration",
            "description": "<ul> <li>time in which the subscription expires</li> </ul>"
          },
          {
            "group": "Success 200",
            "type": "int",
            "optional": false,
            "field": "Companies.num_months_subscribed",
            "description": "<ul> <li>number of months subscribed thus far</li> </ul>"
          },
          {
            "group": "Success 200",
            "type": "int",
            "optional": false,
            "field": "Companies.revenue:",
            "description": "<p>total amount paid by this company thus far</p>"
          },
          {
            "group": "Success 200",
            "type": "int",
            "optional": false,
            "field": "Companies.num_employees",
            "description": "<p>number of registered employees</p>"
          }
        ]
      }
    }
  },
  {
    "type": "put",
    "url": "/api/companies/:id",
    "title": "Update company info",
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
        "content": "PUT /api/companies/id HTTP/1.1\nHost: localhost\nContent-Type: application/x-www-form-urlencoded\nname=NewCompanyName",
        "type": "HTTP"
      }
    ],
    "error": {
      "fields": {
        "Error 400": [
          {
            "group": "Error 400",
            "optional": false,
            "field": "CouldNotFind",
            "description": "<p>wrong company ID</p>"
          },
          {
            "group": "Error 400",
            "optional": false,
            "field": "CouldNotSave",
            "description": "<p>unable to save updated info</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/company/index.js",
    "groupTitle": "Company",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "_id",
            "description": "<p>ID of the company</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the company</p>"
          },
          {
            "group": "Success 200",
            "type": "time",
            "optional": false,
            "field": "paid_time",
            "description": "<p>Time in which the company last made a payment</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "phone_number",
            "description": "<p>Phone number of the company</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>Email fo the company</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "create_time",
            "description": "<p>time in which the company is created</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "sub_expiration",
            "description": "<p>time in which the subscription expires</p>"
          },
          {
            "group": "Success 200",
            "type": "int",
            "optional": false,
            "field": "num_months_subscribed",
            "description": "<p>number of months subscribed thus far</p>"
          },
          {
            "group": "Success 200",
            "type": "int",
            "optional": false,
            "field": "revenue",
            "description": "<p>total amount paid by this company thus far</p>"
          },
          {
            "group": "Success 200",
            "type": "int",
            "optional": false,
            "field": "num_employees",
            "description": "<p>number of registered employees</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/api/companies/:id",
    "title": "Get company info",
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
        "content": "GET /api/companies/id HTTP/1.1\nHost: localhost",
        "type": "HTTP"
      },
      {
        "title": "Example usage:",
        "content": "curl http://localhost/api/companies/id",
        "type": "curl"
      }
    ],
    "error": {
      "fields": {
        "Error 400": [
          {
            "group": "Error 400",
            "optional": false,
            "field": "CouldNotFind",
            "description": "<p>can't find company with given id</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/company/index.js",
    "groupTitle": "Company",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "_id",
            "description": "<p>ID of the company</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the company</p>"
          },
          {
            "group": "Success 200",
            "type": "time",
            "optional": false,
            "field": "paid_time",
            "description": "<p>Time in which the company last made a payment</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "phone_number",
            "description": "<p>Phone number of the company</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>Email fo the company</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "create_time",
            "description": "<p>time in which the company is created</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "sub_expiration",
            "description": "<p>time in which the subscription expires</p>"
          },
          {
            "group": "Success 200",
            "type": "int",
            "optional": false,
            "field": "num_months_subscribed",
            "description": "<p>number of months subscribed thus far</p>"
          },
          {
            "group": "Success 200",
            "type": "int",
            "optional": false,
            "field": "revenue",
            "description": "<p>total amount paid by this company thus far</p>"
          },
          {
            "group": "Success 200",
            "type": "int",
            "optional": false,
            "field": "num_employees",
            "description": "<p>number of registered employees</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/api/companies/search/:match",
    "title": "Search Companies",
    "description": "<p>Search for companies that contains user-inputted string</p>",
    "examples": [
      {
        "title": "HTTP usage:",
        "content": "GET /api/companies/search/match HTTP/1.1\nHost: localhost",
        "type": "HTTP"
      },
      {
        "title": "curl usage:",
        "content": "curl -i http://localhost/api/companies/search/match",
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
    "error": {
      "fields": {
        "Error 400": [
          {
            "group": "Error 400",
            "optional": false,
            "field": "CouldNotSearch",
            "description": "<p>database error</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/company/index.js",
    "groupTitle": "Company",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Company[]",
            "optional": false,
            "field": "Companies",
            "description": "<p>Info of all companies in <code>JSON</code> format</p>"
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
            "type": "string",
            "optional": false,
            "field": "Companies.name",
            "description": "<p>Name of company</p>"
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
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "Companies.create_time",
            "description": "<ul> <li>time in which the company is created</li> </ul>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "Companies.sub_expiration",
            "description": "<ul> <li>time in which the subscription expires</li> </ul>"
          },
          {
            "group": "Success 200",
            "type": "int",
            "optional": false,
            "field": "Companies.num_months_subscribed",
            "description": "<ul> <li>number of months subscribed thus far</li> </ul>"
          },
          {
            "group": "Success 200",
            "type": "int",
            "optional": false,
            "field": "Companies.revenue:",
            "description": "<p>total amount paid by this company thus far</p>"
          },
          {
            "group": "Success 200",
            "type": "int",
            "optional": false,
            "field": "Companies.num_employees",
            "description": "<p>number of registered employees</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/api/employees/pwdchange/:id",
    "title": "Change Password",
    "description": "<p>Change password of an account</p>",
    "name": "EmployeeChangePassword",
    "group": "Employee",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the employee</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "currentpwd",
            "description": "<p>current password</p>"
          },
          {
            "group": "Parameter",
            "type": "strint",
            "optional": false,
            "field": "newpwd",
            "description": "<p>new password</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 400": [
          {
            "group": "Error 400",
            "optional": false,
            "field": "CanNotFind",
            "description": "<p>no employee of the same id can be found</p>"
          },
          {
            "group": "Error 400",
            "optional": false,
            "field": "MissingField",
            "description": "<p>missing param</p>"
          },
          {
            "group": "Error 400",
            "optional": false,
            "field": "IncorrectPassword",
            "description": "<p>invalid current password</p>"
          },
          {
            "group": "Error 400",
            "optional": false,
            "field": "CanNotChange",
            "description": "<p>can't change password</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/employee/index.js",
    "groupTitle": "Employee",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "_id",
            "description": "<p>ID of the employee</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "first_name",
            "description": "<p>first name of the employee</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "last_name",
            "description": "<p>last name of the employee</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the employee</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "phone_number",
            "description": "<p>phone number of the employee</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "role",
            "description": "<p>role of the employee, can be one of the following: <br> [c_admin: company admin]<br> [c_receptionist: company receptionist] <br> [c_employee: company employee] <br> [a_admin: app administrator]</p>"
          }
        ]
      }
    }
  },
  {
    "type": "delete",
    "url": "/api/employees/:id",
    "title": "Delete Employee",
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
    "error": {
      "fields": {
        "Error 400": [
          {
            "group": "Error 400",
            "optional": false,
            "field": "CanNotFind",
            "description": "<p>DNE error</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/employee/index.js",
    "groupTitle": "Employee",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "_id",
            "description": "<p>ID of the employee</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "first_name",
            "description": "<p>first name of the employee</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "last_name",
            "description": "<p>last name of the employee</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the employee</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "phone_number",
            "description": "<p>phone number of the employee</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "role",
            "description": "<p>role of the employee, can be one of the following: <br> [c_admin: company admin]<br> [c_receptionist: company receptionist] <br> [c_employee: company employee] <br> [a_admin: app administrator]</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/api/employees/company/:id",
    "title": "Get All Employees",
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
    "error": {
      "fields": {
        "Error 400": [
          {
            "group": "Error 400",
            "optional": false,
            "field": "CanNotFind",
            "description": "<p>there is not company with that id</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/employee/index.js",
    "groupTitle": "Employee",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Employee[]",
            "optional": false,
            "field": "Employees",
            "description": "<p>Info of all employees in given company in <code>JSON</code> format</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "Employees._id",
            "description": "<p>ID of the employee</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "Employees.first_name",
            "description": "<p>first name of the employee</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "Employees.last_name",
            "description": "<p>last name of the employee</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "Employees.email",
            "description": "<p>email of the employee</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "Employees.phone_number",
            "description": "<p>phone number of the employee</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "Employees.role",
            "description": "<p>role of the employee, can be one of the following: <br> [c_admin - company admin] <br> [c_receptionist: company receptionist] <br> [c_employee: company employee] <br> [a_admin: app administrator]</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/api/employees/:id",
    "title": "Get Employee by id",
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
    "error": {
      "fields": {
        "Error 400": [
          {
            "group": "Error 400",
            "optional": false,
            "field": "CanNotFind",
            "description": "<p>no employee with that id exists</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/employee/index.js",
    "groupTitle": "Employee",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "_id",
            "description": "<p>ID of the employee</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "first_name",
            "description": "<p>first name of the employee</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "last_name",
            "description": "<p>last name of the employee</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the employee</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "phone_number",
            "description": "<p>phone number of the employee</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "role",
            "description": "<p>role of the employee, can be one of the following: <br> [c_admin: company admin]<br> [c_receptionist: company receptionist] <br> [c_employee: company employee] <br> [a_admin: app administrator]</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/api/employees/",
    "title": "Insert Employee",
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
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": true,
            "field": "receive_sms",
            "description": "<p>receive email notification or not, default is false</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": true,
            "field": "receive_email",
            "description": "<p>receive sms notification or not, default is false</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 400": [
          {
            "group": "Error 400",
            "optional": false,
            "field": "CanNotSave",
            "description": "<p>failed to connect to db</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/employee/index.js",
    "groupTitle": "Employee",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "_id",
            "description": "<p>ID of the employee</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "first_name",
            "description": "<p>first name of the employee</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "last_name",
            "description": "<p>last name of the employee</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the employee</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "phone_number",
            "description": "<p>phone number of the employee</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "role",
            "description": "<p>role of the employee, can be one of the following: <br> [c_admin: company admin]<br> [c_receptionist: company receptionist] <br> [c_employee: company employee] <br> [a_admin: app administrator]</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/api/employees/login",
    "title": "Login",
    "description": "<p>used to login employee</p>",
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
    "error": {
      "fields": {
        "Error 400": [
          {
            "group": "Error 400",
            "optional": false,
            "field": "CanNotFind",
            "description": "<p>not employee has that email</p>"
          },
          {
            "group": "Error 400",
            "optional": false,
            "field": "IncorrectCredentials",
            "description": "<p>password does not match</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/employee/index.js",
    "groupTitle": "Employee",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "_id",
            "description": "<p>ID of the employee</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "first_name",
            "description": "<p>first name of the employee</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "last_name",
            "description": "<p>last name of the employee</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the employee</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "phone_number",
            "description": "<p>phone number of the employee</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "role",
            "description": "<p>role of the employee, can be one of the following: <br> [c_admin: company admin]<br> [c_receptionist: company receptionist] <br> [c_employee: company employee] <br> [a_admin: app administrator]</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/api/employees/resetPassword",
    "title": "Reset Password",
    "description": "<p>send email to employee with new password in the email</p>",
    "name": "EmployeeResetPassword",
    "group": "Employee",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email address of account to rest password for</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 400": [
          {
            "group": "Error 400",
            "optional": false,
            "field": "CanNotFind",
            "description": "<p>no employee has that email</p>"
          },
          {
            "group": "Error 400",
            "optional": false,
            "field": "CanNotReset",
            "description": "<p>can't reset password</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/employee/index.js",
    "groupTitle": "Employee",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "_id",
            "description": "<p>ID of the employee</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "first_name",
            "description": "<p>first name of the employee</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "last_name",
            "description": "<p>last name of the employee</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the employee</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "phone_number",
            "description": "<p>phone number of the employee</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "role",
            "description": "<p>role of the employee, can be one of the following: <br> [c_admin: company admin]<br> [c_receptionist: company receptionist] <br> [c_employee: company employee] <br> [a_admin: app administrator]</p>"
          }
        ]
      }
    }
  },
  {
    "type": "put",
    "url": "/api/employees/:id",
    "title": "Update Employee info",
    "description": "<p>This is for modifying an employee. Do not send values if you don't want them to be updated, password change is done through a separate api call, refer to @ChangePassword</p>",
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
            "field": "role",
            "description": "<p>employees role in the company</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": true,
            "field": "receive_email",
            "description": "<p>receive email notification or not</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": true,
            "field": "receive_sms",
            "description": "<p>receive sms notification or not</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 400": [
          {
            "group": "Error 400",
            "optional": false,
            "field": "CanNotFind",
            "description": "<p>error finding employee</p>"
          },
          {
            "group": "Error 400",
            "optional": false,
            "field": "CanNotSave",
            "description": "<p>can't save, check dup key</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/employee/index.js",
    "groupTitle": "Employee",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "_id",
            "description": "<p>ID of the employee</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "first_name",
            "description": "<p>first name of the employee</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "last_name",
            "description": "<p>last name of the employee</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the employee</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "phone_number",
            "description": "<p>phone number of the employee</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "role",
            "description": "<p>role of the employee, can be one of the following: <br> [c_admin: company admin]<br> [c_receptionist: company receptionist] <br> [c_employee: company employee] <br> [a_admin: app administrator]</p>"
          }
        ]
      }
    }
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
    "url": "/payment/subscription/:id",
    "title": "Make payment",
    "description": "<p>User will be charged for fee of 1 month and subscription length will be extended by 1 month as well</p>",
    "name": "CreateSubscription",
    "group": "Payment",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the company</p>"
          },
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
            "description": "<p>stripeToken associated with customer</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 204": [
          {
            "group": "Success 204",
            "optional": false,
            "field": "NoContent",
            "description": "<p>no content will be sent</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 400": [
          {
            "group": "Error 400",
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
    "url": "/:user_id/theme",
    "title": "CreateNewDefaultUserTheme",
    "name": "CreateNewDefaultUserTheme",
    "group": "Theme",
    "description": "<p>Creates a new user theme with defaults.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user_id",
            "description": "<p>The ID of the user that will get a new default theme.</p>"
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
            "field": "theme",
            "description": "<p>The theme of the user page, formatted as a JSON.</p>"
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
            "description": "<p>The JSONified error code.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/theme/index.js",
    "groupTitle": "Theme"
  },
  {
    "type": "put",
    "url": "/:user_id/theme",
    "title": "DeleteUserTheme",
    "name": "DeleteUserTheme",
    "group": "Theme",
    "description": "<p>Deletes the user's theme, when they unsubsctibe from the service.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user_id",
            "description": "<p>The ID of the user whose theme we want to change.</p>"
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
            "field": "msg",
            "description": "<p>&quot;OK&quot;</p>"
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
            "description": "<p>The JSONified error code.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/theme/index.js",
    "groupTitle": "Theme"
  },
  {
    "type": "get",
    "url": "/:user_id/theme",
    "title": "GetUserTheme",
    "name": "GetUserTheme",
    "group": "Theme",
    "description": "<p>Gets the theme corresponding to some user.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user_id",
            "description": "<p>The ID of the user whose theme we want to change.</p>"
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
            "field": "theme",
            "description": "<p>The theme of the user page, formatted as a JSON.</p>"
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
            "description": "<p>The JSONified error code.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/theme/index.js",
    "groupTitle": "Theme"
  },
  {
    "type": "put",
    "url": "/:user_id/theme",
    "title": "UpdateUserTheme",
    "name": "UpdateUserTheme",
    "group": "Theme",
    "description": "<p>Update the specific user's theme when they save their settings.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user_id",
            "description": "<p>The ID of the user whose theme we want to change.</p>"
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
            "field": "theme",
            "description": "<p>The theme of the new user page theme, formatted as a JSON.</p>"
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
            "description": "<p>The JSONified error code.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/theme/index.js",
    "groupTitle": "Theme"
  },
  {
    "type": "post",
    "url": "/",
    "title": "CreateNewVisitor",
    "name": "CreateNewVisitor",
    "group": "VisitorList",
    "description": "<p>Creates a new vistor when they check in.</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "JSON",
            "optional": false,
            "field": "result",
            "description": "<p>The result code upon deletion of the visitor.</p>"
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
            "field": "error_msg",
            "description": "<p>The JSONified error message.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/visitorList/index.js",
    "groupTitle": "VisitorList"
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
    "type": "delete",
    "url": "/company/:company_id/visitor/:visitor_id",
    "title": "DeleteVisitorByID",
    "name": "DeleteVisitorByID",
    "group": "VisitorList",
    "description": "<p>Deletes a specific visitor from a company's visitor list.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "company_id",
            "description": "<p>The ID of the company whose list we want to modify.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "visitor_id",
            "description": "<p>The ID of visitor from that company's visitor list.</p>"
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
            "description": "<p>The result code upon deletion of the visitor.</p>"
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
            "field": "error_msg",
            "description": "<p>The JSONified error message.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/visitorList/index.js",
    "groupTitle": "VisitorList"
  },
  {
    "type": "delete",
    "url": "/:id",
    "title": "DeleteVisitorListByID",
    "name": "DeleteVisitorListByID",
    "group": "VisitorList",
    "description": "<p>Deletes (clears) the specific visitor list.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The ID of the visitor list we want to clear.</p>"
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
            "description": "<p>The result code upon clearing.</p>"
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
            "field": "error_msg",
            "description": "<p>The JSONified error message.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/visitorList/index.js",
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
    "url": "/company/:id",
    "title": "GetCompanyByID",
    "name": "GetCompanyByID",
    "group": "VisitorList",
    "description": "<p>Gets a company's visitor list by their company ID.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The company's ID.</p>"
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
            "description": "<p>The result code upon deletion of the visitor.</p>"
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
            "field": "error_msg",
            "description": "<p>The JSONified error message.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/visitorList/index.js",
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
