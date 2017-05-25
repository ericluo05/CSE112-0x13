var Theme = require('../../server/models/Theme');
var config = require('../../server/config/config');
var ConfigureAuth = require('./ConfigureAuth.js');
let request = require('supertest');

// Schema Test
describe('Theme Settings Model', function() {
    it('should create(POST) a new setting', function(done) {
        let theme = new Theme({
            user_id: 'test', // company or user id
            form_color: 'default',
            background_img: 'default',
            displayPhone: false,
            displayClock: false,
            displaySignature: false,
            additionalComments: false,
        });
        theme.save(function(err) {
            if (err) return done(err);
            done();
        });
    });

    /* it('should GET theme setting', function(done) {
        Theme.findOne({
            user_id: "test"
        }, function(err, theme) {
            if (err) return done(err);
            theme.background_img.should.equal('default');
            theme.form_color.should.equal('default');
            theme.displayClock.should.equal(false);
            theme.displayPhone.should.equal(false);
            theme.displaySignature.should.equal(false);
            theme.additionalComments.should.equal(false);
            done();
        });
    });*/

    it('should update(PUT) theme setting', function(done) {
        Theme.findOne({
            user_id: 'test',
        }, function(err, theme) {
            theme.user_id = 'test'; // company or user id
            theme.form_color = 'default';
            theme.background_img = 'default';
            theme.displayPhone = false;
            theme.displayClock = true;
            theme.displaySignature = false;
            theme.additionalComments = true;
            theme.save(function(err) {
                if (err) return done(err);
                theme.background_img.should.equal('default');
                theme.form_color.should.equal('default');
                theme.displayClock.should.equal(true);
                theme.displayPhone.should.equal(false);
                theme.displaySignature.should.equal(false);
                theme.additionalComments.should.equal(true);
                done();
            });
        });
    });

    /* it('should remove(DELETE) theme setting', function(done) {
        Theme.remove({
            user_id: "test"
        }, function(err, theme) {
            if (err) return done(err);
            theme.should.equal(1);
            done();
        });
    });*/
});

// Route Tests need to be changed to work with auth

describe('Themes Route Test', function() {
        // variable to hold all the need authentication variables.
        let credentials;

        // before function is called at the very beginning of the
        // 'Forms' test suite,
        // no tests are run until the done() callback is called.
        before(function(done) {
            // setupAdmin will create and admin and log you in,
            // give it a callback that will give you
            // the credentials you need. Make sure to call done()
            // inside ConfigureAuth's callback!
            ConfigureAuth.setupAdmin(function(cred) {
                credentials = cred;
                done();
            });
        });


        describe('POST /api/:user_id/theme', function() {
            it('should respond with theme info for respective user_id ' +
              'settings that were created for first time user',
              function(done) {
                let url = 'localhost:' + config.port;
                let _userId = '1';
                let _formColor = 'default';
                let _backgroundImg = 'default';
                let _displayPhone = false;
                let _displayClock = false;
                let _displaySignature = false;
                let _additionalComments = false;
                request(url)
                    .post('/api/' + _userId + '/theme')
                    .query({email: credentials.email, token: credentials.token})
                    .send({
                        form_color: _formColor,
                        background_img: _backgroundImg,
                        displayPhone: _displayPhone,
                        displayClock: _displayClock,
                        displaySignature: _displaySignature,
                        additionalComments: _additionalComments,
                    })
                    .end(function(err, res) {
                        console.log(res.body);
                        res.body.should.have.property('user_id');
                        res.body.should.have.property('form_color');
                        res.body.should.have.property('background_img');
                        res.body.should.have.property('displayPhone');
                        res.body.should.have.property('displayClock');
                        res.body.should.have.property('displaySignature');
                        res.body.should.have.property('additionalComments');

                        res.body.user_id.should.equal(_userId);
                        res.body.form_color.should.equal(_formColor);
                        res.body.background_img.should.equal(_backgroundImg);
                        res.body.displayPhone.should.equal(_displayPhone);
                        res.body.displayClock.should.equal(_displayClock);
                        res.body.displaySignature
                          .should.equal(_displaySignature);
                        res.body.additionalComments
                          .should.equal(_additionalComments);

                        done();
                    });
            });
        });

        describe('GET /api/:user_id/theme', function() {
            it('should respond with theme info for respective user_id',
              function(done) {
                let url = 'localhost:' + config.port;
                let userId = '1';
                request(url)
                    .get('/api/' + userId + '/theme')
                    .query({email: credentials.email, token: credentials.token})
                    .end(function(err, res) {
                        res.body.should.have.property('_id');
                        res.body.should.have.property('additionalComments');
                        res.body.should.have.property('user_id');
                        res.body.should.have.property('form_color');
                        res.body.should.have.property('background_img');
                        res.body.should.have.property('displayPhone');
                        res.body.should.have.property('displayClock');
                        res.body.should.have.property('displaySignature');

                        done();
                    });
            });
        });


        describe('PUT /api/:user_id/theme', function() {
            it('should respond with theme info for respective user_id' +
              ' settings that were updated', function(done) {
                let url = 'localhost:' + config.port;
                let _userId = '1';
                let _formColor = '1';
                let _backgroundImg = '1';
                let _displayPhone = false;
                let _displayClock = false;
                let _displaySignature = false;
                let _additionalComments = false;
                request(url)
                    .put('/api/' + _userId + '/theme')
                    .query({email: credentials.email, token: credentials.token})
                    .send({
                        form_color: _formColor,
                        background_img: _backgroundImg,
                        displayPhone: _displayPhone,
                        displayClock: _displayClock,
                        displaySignature: _displaySignature,
                        additionalComments: _additionalComments,
                    })
                    .end(function(err, res) {
                        res.body.should.have.property('user_id');
                        res.body.should.have.property('form_color');
                        res.body.should.have.property('background_img');
                        res.body.should.have.property('displayPhone');
                        res.body.should.have.property('displayClock');
                        res.body.should.have.property('displaySignature');
                        res.body.should.have.property('additionalComments');

                        res.body.user_id.should.equal(_userId);
                        res.body.form_color.should.equal(_formColor);
                        res.body.background_img.should.equal(_backgroundImg);
                        res.body.displayPhone.should.equal(_displayPhone);
                        res.body.displayClock.should.equal(_displayClock);
                        res.body.displaySignature
                          .should.equal(_displaySignature);
                        res.body.additionalComments
                          .should.equal(_additionalComments);

                        done();
                    });
            });
        });

        describe('DELETE /api/:user_id/theme', function() {
            it('should respond with successful delete', function(done) {
                let url = 'localhost:' + config.port;
                let userId = '1';
                request(url)
                    .delete('/api/' + userId + '/theme')
                    .query({email: credentials.email, token: credentials.token})
                    .expect(200)
                    .end(function(err, res) {
                        res.body.should.have.property('msg');
                        done();
                    });
            });
        });


        after(function(done) {
            // give cleanupAuth the email of the admin user it created earlier.
            ConfigureAuth.cleanupAuth(credentials.email, done);
        });
    }
);
