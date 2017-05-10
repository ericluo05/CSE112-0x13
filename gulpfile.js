let gulp = require('gulp'),
 //  jshint = require('gulp-jshint'),
    apidoc = require('gulp-apidoc'),
    eslint = require('gulp-eslint'),
    htmlhint = require('gulp-htmlhint'),
    mocha = require('gulp-mocha');


/**
* Javascript Lint Checker using JSHint
*/
// gulp.task('lint', function () {
//  gulp.src('./**/*.js')
//      .pipe(jshint())
// })


/**
* Javascript Lint Checker using ESLint
*/
gulp.task('eslint', () => {
    return gulp.src(['**/*.js', '!node_modules/**'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});


/**
* HTML Linter  using HtmlHint
*/
gulp.task('htmlhint', () => {
    gulp.src('./public/html/*.html')
       .pipe(htmlhint())
       .pipe(htmlhint.failReporter());
});


/**
* CSS Linter using StyleLint
*/
gulp.task('stylelint', function lintCssTask() {
  const gulpStylelint = require('gulp-stylelint');
  return gulp
    .src('public/stylesheets/*.css')
    .pipe(gulpStylelint({
      reporters: [
        {formatter: 'string', console: true},
      ],
    }));
});

/**
* Run Mocha Tests , please use "npm test" instead if you intend to generate coverage data
*/
gulp.task('mocha', () =>
   gulp.src(['test/unit_test/*.js'], {read: false})
      .pipe(mocha({reporter: 'list'}))
);


/**
* Run documentation generator
*/
gulp.task('apidoc', function(done) {
   apidoc({
      src: 'routes/',
      dest: 'doc/',
   }, done);
});


gulp.task('default', ['mocha']);
gulp.task('lint', ['eslint', 'htmlhint', 'stylelint']);
gulp.task('api', ['apidoc']);


