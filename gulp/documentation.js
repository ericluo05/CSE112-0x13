/* eslint-disable apidoc/rule-name */
let gulp = require('gulp');
let apidoc = require('gulp-apidoc');
let jsdoc = require('gulp-jsdoc3');
let config = require('../config/jsdoc.conf.json');


gulp.task('doc', function(cb) {
    gulp.src(['README.md', './server/**/*.js'],
        {'read': false, 'destination': '/doc/lib'})
        .pipe(jsdoc(config, cb));
});


/**
* Run documentation generator
*/
gulp.task('api', function(done) {
   apidoc({
       src: 'server/routes/',
       dest: 'doc/api',
   }, done);
});
