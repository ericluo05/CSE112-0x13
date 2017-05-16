'use strict';
let express = require('express');
let router = new express.Router();
let path = require('path');

let htmlPath = path.join(__dirname, '../../build/html/');

router.get('/', function(req, res, next) {
   res.sendFile(path.join(htmlPath, 'index.html'));
});


router.get('/settings', function(req, res) {
  res.sendFile(path.join(htmlPath, 'settings.html'));
});

router.get('/admin-companies', function(req, res) {
  res.sendFile(path.join(htmlPath, 'admin-companies.html'));
});

router.get('/admin-dashboard', function(req, res) {
  res.sendFile(path.join(htmlPath, 'dmin-dashboard.html'));
});

router.get('/analytics_raw', function(req, res) {
  res.sendFile(path.join(htmlPath, 'analytics_raw.html'));
});

router.get('/appointments', function(req, res) {
  res.sendFile(path.join(htmlPath, 'appointments.html'));
});

// router.get('/appointments', function(req, res) {
//     res.sendFile(path.join(__dirname, '../../build/emissary/assets/views/appointments.html'));
// });
router.get('/checkin', function(req, res) {
  res.sendFile(path.join(htmlPath, 'checkin.html'));
});

router.get('/employees', function(req, res) {
  res.sendFile(path.join(htmlPath, 'employees.html'));
});

router.get('/forgot-password', function(req, res) {
  res.sendFile(path.join(htmlPath, 'forgot-password.html'));
});

router.get('/form-builder', function(req, res) {
  res.sendFile(path.join(htmlPath, 'form-builder.html'));
});



router.get('/login', function(req, res) {
  res.sendFile(path.join(htmlPath, 'login.html'));
});

router.get('/signup', function(req, res) {
  res.sendFile(path.join(htmlPath, 'signup.html'));
});

router.get('/visitors', function(req, res) {
  res.sendFile(path.join(htmlPath, 'visitors.html'));
});

router.get('/404', function(req, res) {
  res.sendFile(path.join(htmlPath, '404.html'));
});

router.get('/admin-settings', function(req, res) {
  res.sendFile(path.join(htmlPath, 'admin-settings.html'));
});

router.get('/index', function(req, res) {
    res.sendFile(path.join(htmlPath, 'index.html'));
});

module.exports = router;
