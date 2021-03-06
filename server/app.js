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
let messagesMapping = require('./routes/messagesMapping');
let app = express();
// let slack = require('slack-notify')('channel url here');

// view engine setup
app.set('views', path.join(__dirname + '/../dist/views'));
app.set('view engine', 'ejs');


// these are not used in production environment
if(process.env.NODE_ENV !== 'production' && (process.env.NODE_ENV !== 'test')) {
    app.use(logger('dev'));
};


// uncomment after placing your favicon in /public
app.use(favicon(__dirname + './../dist/images/favicon.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/../dist')));

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

// Use messages for Smooch Omni-channel integration
app.use('/messages', messagesMapping);

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

// connect to MongoDB
mongoose.connect(config.mongoDBUrl);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
    console.log('Connected to a mongo database at ' + config.mongoDBUrl);
    require('./createsuperadmin');
});

module.exports = app;
