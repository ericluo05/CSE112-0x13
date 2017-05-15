'use strict';
let express = require('express');
let router = express.Router();
let path = require('path');


router.get('/', function(req, res, next) {
   res.sendFile(path.join(__dirname, '../../build/html/index.html'));
});


router.get('/settings', function(req, res) {
  res.sendFile(path.join(__dirname, '../../build/html/settings.html'));
});

router.get('/admin-companies', function(req, res) {
  res.sendFile(path.join(__dirname, '../../build/html/admin-companies.html'));
});

router.get('/admin-dashboard', function(req, res) {
  res.sendFile(path.join(__dirname, '../../build/html/admin-dashboard.html'));
});

router.get('/analytics_raw', function(req, res) {
  res.sendFile(path.join(__dirname, '../../build/html/analytics_raw.html'));
});

router.get('/appointments', function(req, res) {
  res.sendFile(path.join(__dirname, '../../build/html/appointments.html'));
});

// router.get('/appointments', function(req, res) {
//     res.sendFile(path.join(__dirname, '../../build/emissary/assets/views/appointments.html'));
// });
router.get('/checkin', function(req, res) {
  res.sendFile(path.join(__dirname, '../../build/html/checkin.html'));
});

router.get('/employees', function(req, res) {
  res.sendFile(path.join(__dirname, '../../build/html/employees.html'));
});

router.get('/forgot-password', function(req, res) {
  res.sendFile(path.join(__dirname, '../../build/html/forgot-password.html'));
});

router.get('/form-builder', function(req, res) {
  res.sendFile(path.join(__dirname, '../../build/html/form-builder.html'));
});



router.get('/login', function(req, res) {
  res.sendFile(path.join(__dirname, '../../build/html/login.html'));
});

router.get('/signup', function(req, res) {
  res.sendFile(path.join(__dirname, '../../build/html/signup.html'));
});

router.get('/visitors', function(req, res) {
  res.sendFile(path.join(__dirname, '../../build/html/visitors.html'));
});

router.get('/404', function(req, res) {
  res.sendFile(path.join(__dirname, '../../build/html/404.html'));
});

router.get('/admin-settings', function(req, res) {
  res.sendFile(path.join(__dirname, '../../build/html/admin-settings.html'));
});

router.get('/index', function(req, res) {
    res.sendFile(path.join(__dirname, '../../build/html/index3.html'));
});

module.exports = router;
