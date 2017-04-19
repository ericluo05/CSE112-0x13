var express = require('express');
var fooAPI = require('../calls/fooAPI')
var router = express.Router();


function foo(bar)
{
    return (bar === 'baz');
}


/**
 * @api {get} /foo?bar fooMethod
 * @apiName bar
 * @apiGroup Foo
 *
 * @apiParam {String} bar just some input.
 *
 * @apiSuccess {Boolean} textOutput whether bar is 'baz'
 *
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

