var express = require('express');
var router = express.Router();

/**
 * @api {get} /foo checks if input is baz
 * @apiName Foo Check
 *
 * @apiParam {String} bar just some input.
 *
 * @apiSuccess {Boolean} parameter is 'baz'
 */
router.get('/', function(req, res, next) {
   if (req.query.bar === "baz") {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('true\n');
      return true;
   } else {
     res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('false\n');
      return false;
   }
});

module.exports = router;