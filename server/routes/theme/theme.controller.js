'use strict';
/**
*  Module that house all the API routes that pertains to theme settings
* @module routes/theme
*/
let Theme = require('../../models/Theme');

/**
 * @function create
 * @description  handler to create a theme
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.create = function(req, res) {
    let theme = new Theme();
    theme.user_id = req.params.user_id; // company or user id
    theme.form_color = 'default';
    theme.background_img = 'default';
    theme.displayPhone = false;
    theme.displayClock = false;
    theme.displaySignature = false;
    theme.additionalComments = false;

    theme.save(function(err) {
        if (err)
            res.status(400).send(err);

        res.status(200).json(theme);
    });
};

/**
 * @function get
 * @description  handler to get a theme by user id
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.get = function(req, res) {
    Theme.findOne({
        user_id: req.params.user_id,
    }, function(err, theme) {
        if (err)
            res.status(400).send(err);

        res.status(200).json(theme);
    });
};

/**
 * @function update
 * @description  handler to update a theme by user id
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.update = function(req, res) {
    Theme.findOne({
        user_id: req.params.user_id,
    }, function(err, theme) {
        if (err)
            res.status(400).send(err);

        theme.user_id = req.params.user_id; // company or user id
        if (req.body.form_color)
            theme.form_color = req.body.form_color;
        if (req.body.background_img)
            theme.background_img = req.body.background_img;
        if (req.body.displayPhone)
            theme.displayPhone = req.body.displayPhone;
        if (req.body.displayClock)
            theme.displayClock = req.body.displayClock;
        if (req.body.displaySignature)
            theme.displaySignature = req.body.displaySignature;
        if (req.body.additionalComments)
            theme.additionalComments = req.body.additionalComments;

        theme.save(function(err) {
            if (err)
                res.status(400).send(err);

            res.status(200).json(theme);
        });
    });
};

/**
 * @function delete
 * @description  handler to delete a theme by user id
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.delete = function(req, res) {
    Theme.remove({
        user_id: req.params.user_id,
    }, function(err, theme) {
        if (err)
            res.status(400).send(err);
        res.status(200).json({msg: 'OK'});
    });
};
