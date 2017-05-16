'use strict';

let express = require('express');
let controller = require('./visitorList.controller');

let router = express.Router();

router.post('/', controller.createReq);
router.get('/company/:id', controller.getCompanyVisitorListReq);
router.delete('/company/:company_id/visitor/:visitor_id',
    controller.deleteVisitorReq);
router.delete('/:id', controller.deleteReq);

module.exports = router;
