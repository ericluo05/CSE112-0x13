let express = require('express');
require('../calls/fooAPI');
let router = express.Router();


function foo(bar) {
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
router.get('/', function(req, res, next) {
   if (foo(req.query.bar)) {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('true');
   } else {
     res.writeHead(200, {'Content-Type': 'text/plain'});
     res.end('false');
   }
});
module.exports = router;

