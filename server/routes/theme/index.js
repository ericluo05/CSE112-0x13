'use strict';

/*
 * This module is meant to house all of the API
 * routes that pertain to theme settings
 */
let express = require('express');
let router = new express.Router();
let controller = require('./theme.controller');


/**
 * @api {post} /:user_id/theme CreateNewDefaultUserTheme
 * @apiName CreateNewDefaultUserTheme
 * @apiGroup Theme
 * @apiDescription Creates a new user theme with defaults.
 * @apiParam {String} user_id The ID of the user that will get a new default theme.
 * @apiSuccess {JSON} theme The theme of the user page, formatted as a JSON.
 * @apiError {JSON} error The JSONified error code.
 */
router.post('/:user_id/theme', controller.create);

/**
 * @api {get} /:user_id/theme GetUserTheme
 * @apiName GetUserTheme
 * @apiGroup Theme
 * @apiDescription Gets the theme corresponding to some user.
 * @apiParam {String} user_id The ID of the user whose theme we want to change.
 * @apiSuccess {JSON} theme The theme of the user page, formatted as a JSON.
 * @apiError {JSON} error The JSONified error code.
 */
router.get('/:user_id/theme', controller.get);

/**
 * @api {put} /:user_id/theme UpdateUserTheme
 * @apiName UpdateUserTheme
 * @apiGroup Theme
 * @apiDescription Update the specific user's theme when they save their settings.
 * @apiParam {String} user_id The ID of the user whose theme we want to change.
 * @apiSuccess {JSON} theme The theme of the new user page theme, formatted as a JSON.
 * @apiError {JSON} error The JSONified error code.
 */
router.put('/:user_id/theme', controller.update);

/**
 * @api {put} /:user_id/theme DeleteUserTheme
 * @apiName DeleteUserTheme
 * @apiGroup Theme
 * @apiDescription Deletes the user's theme, when they unsubsctibe from the service.
 * @apiParam {String} user_id The ID of the user whose theme we want to change.
 * @apiSuccess {JSON} msg "OK"
 * @apiError {JSON} error The JSONified error code.
 */
router.delete('/:user_id/theme', controller.delete);

module.exports = router;
