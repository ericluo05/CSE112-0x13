'use strict';
// these are used only in production environment
if(process.env.NODE_ENV === 'production') {
// eslint-disable-next-line no-unused-vars
    let newrelic = require('newrelic');
};
let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let config = require('./config/config')[process.env.NODE_ENV || 'development'];
let staticSiteMapping = require('./routes/staticmapping');
let apiMapping = require('./routes/apimapping');
let app = express();
// slack notification is done on client side currently.. not safe
// let slack = require('slack-notify')('https://hooks.slack.com/services/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');

// connect to MongoDB
mongoose.connect(config.mongoDBUrl);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
    console.log('Connected to a mongo database at ' + config.mongoDBUrl);
});
let Employee = require('./models/Employee');
let Company = require('./models/Company');
Company.findOne({name: 'Emissary'}, function(err, result) {
    if (err) {
        console.log(err);
    }
    if(!result) {
        console.log('No Emissary Company found, creating one');
        let company = new Company();
        company.email = 'support@emissary.com';
        company.name = 'Emissary';
        company.phone_number = '9119119110';
        company.paid_time=new Date();
        company.save(function(err, c) {
            if(err) {
                console.log('error: unable to create/save Emissary company');
            }
        });
    }
    Employee.findOne({email: 'peter@emissary.com'}, function(err, result) {
        if (err) {
            console.log('no superadmin acc found, creating one. ' +
                'acc: peter@emissary.com, pw:admin');
        }
        if(!result) {
            let emissaryID = 0;
            Company.findOne({name: 'Emissary'}, function(err, result) {
                emissaryID = result._id;
                let superadmin = new Employee();
                superadmin.first_name = 'Peter';
                superadmin.last_name = '???';
                superadmin.email = 'peter@emissary.com',
                    superadmin.phone_number = '5621234567',
                    Company.findOne({name: 'Emissary'}, function(err, result) {
                        console.log(result._id);
                    });
                superadmin.company_id = emissaryID,
                    superadmin.password = superadmin.generateHash('admin'),
                    superadmin.role = 'a_admin';
                superadmin.save(function(err, e) {
                    if (err) {
                        console.log('error: unable to register superadmin account');
                        console.log(err);
                    }
                });
            });
        }
    });
});


Employee.findOne({email: 'peter@emissary.com'},  function(err, result) {
   console.log(result);
});


// view engine setup
app.set('views', path.join(__dirname + '/../build/views'));
app.set('view engine', 'ejs');




// these are not used in production environment
if(process.env.NODE_ENV !== 'production') {
    app.use(logger('dev'));
};


// uncomment after placing your favicon in /public
app.use(favicon(__dirname + './../build/images/favicon.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/../build')));

app.use('/phone', require('./routes/phone'));


// map request to properly query when user tries to access .html files
app.use(function(req, res, next) {
    if (req.path.substr(-5) == '.html' && req.path.length > 1) {
        let query = req.url.slice(req.path.length);
        res.redirect(301, req.path.slice(0, -5) + query);
    } else {
        next();
    }
});

// map static site routing and api routings
app.use('/', staticSiteMapping);
apiMapping(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

console.log('Express server listening on port %d in %s mode',
    app.get('port') || 3000, app.get('env'));


module.exports = app;
