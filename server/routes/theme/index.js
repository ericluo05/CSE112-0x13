'use strict';

/*
 * This module is meant to house all of the API
 * routes that pertain to theme settings
 */
let express = require('express');
let router = new express.Router();
let controller = require('./theme.controller');


// post with default values
router.post('/:user_id/theme', controller.create);

// get the theme correspond to the user
router.get('/:user_id/theme', controller.get);

// Edit, when the user save new settings
router.put('/:user_id/theme', controller.update);

// Delete, when a user unsuscribed from the service
router.delete('/:user_id/theme', controller.delete);

module.exports = router;
