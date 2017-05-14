'use strict';

/*
 * This module is meant to house all of the API
 * routes that pertain to theme settings
 */
var express = require('express');
var router = express.Router();
var controller = require('./theme.controller');

/* need this to enable cross origin resource sharing.If disabled, we might
 * not need this later. This is just to get the example to work
 * when front end is served from a something other than our app server.
 */
var cors = require('cors');

var Theme = require('../../models/Theme');




//post with default values
router.post('/:user_id/theme', controller.template.create);

//get the theme correspond to the user
router.get('/:user_id/theme', controller.template.get);

//Edit, when the user save new settings
router.put('/:user_id/theme', controller.template.update);

//Delete, when a user unsuscribed from the service
router.delete('/:user_id/theme', controller.template.delete);

module.exports = router;
