var express = require('express');
var router = express.Router();

function foo(bar) 
{
    return (bar === 'baz');
}

/**
 * @api {get} /foo checks if input is baz
 * @apiName Foo Check
 *
 * @apiParam {String} bar just some input.
 *
 * @apiSuccess {Boolean} parameter is 'baz'
 */
router.get('/', function(req, res, next) 
{
   if (foo(req.query.bar)) 
   {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('true\n');
   } 
   else 
   {
     res.writeHead(200, {'Content-Type': 'text/plain'});
     res.end('false\n');
   }
});
module.exports = router;

