var gulp = require('gulp'),
   jshint = require('gulp-jshint'),
    apidoc = require('gulp-apidoc'),
    mocha = require('gulp-mocha');

/**
* Lint Checker
*/
gulp.task('lint', function () {
   gulp.src('./**/*.js')
      .pipe(jshint())
})

/**
* Run Mocha Tests
*/
gulp.task('mocha', () =>
   gulp.src('test/test.js', {read: false})
      .pipe(mocha({reporter: 'nyan'}))
);

/**
* Run documentation generator
*/
gulp.task('apidoc', function(done){
   apidoc({
      src: "routes/",
      dest: "doc/"
   }, done);
});

gulp.task('default', ['lint', 'mocha', 'apidoc']);