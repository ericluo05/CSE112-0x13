var express = require('express');
var fooAPI = require('../calls/fooAPI')
var router = express.Router();



/**
 * @api {get} /foo?bar
 * @apiName FooTest
 * @apiGroup Foo
 *
 * @apiParam {String} bar just some input.
 *
 * @apiSuccess {Boolean} textOutput whether bar is 'baz'
 */
router.get('/', function(req, res, next)
{
   if (fooAPI.foo(req.query.bar))
   {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('true');
   }
   else
   {
     res.writeHead(200, {'Content-Type': 'text/plain'});
     res.end('false');
   }
});
module.exports = router;

