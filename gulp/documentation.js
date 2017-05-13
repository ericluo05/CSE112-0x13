let gulp = require('gulp'),
    apidoc = require('gulp-apidoc'),
    jsdoc = require('gulp-jsdoc3'),
    config = require('../config/jsdoc.conf.json');


gulp.task('doc', function(cb) {
    gulp.src(['README.md', './lib/**/*.js'],
        {'read': false, 'destination': '/doc/lib'})
        .pipe(jsdoc(config, cb));
});


/**
* Run documentation generator
*/
gulp.task('api', function(done) {
   apidoc({
      src: 'routes/',
      dest: 'doc/api',
   }, done);
});