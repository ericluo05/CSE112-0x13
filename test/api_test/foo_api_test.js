let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = chai.expect;
chai.use(chaiHttp);

const server = 'http://localhost:3000';

describe('Foo API Test', (done)=> {
  //  describe('/Post foo', function() {
    it('bar = baz should return true', function(done) { // <= Pass in done callback
        chai.request(server)
            .get('/foo')
            .query({'bar': 2})
            .end(function(err, res, body) {
                expect(res).to.have.status(200);
                expect(res.body).to.not.be.null;
                done();                               // <= Call done to signal callback end
            });
    });
});
