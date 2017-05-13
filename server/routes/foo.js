let express = require('express');
let foo = require('../lib/fooAPI');
let router = express.Router();


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
router.get('/', function(req, res, next) {
   if (foo.foo(req.query.bar)) {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('true');
   } else {
     res.writeHead(200, {'Content-Type': 'text/plain'});
     res.end('false');
   }
});
module.exports = router;

