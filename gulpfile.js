let gulp = require('gulp'),
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
gulp.task('lint:js', () => {
    return gulp.src(['**/*.js', '!node_modules/**'])
        .pipe(eslint({
            fix: true
        }))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});


/**
* HTML Linter  using HtmlHint
*/
gulp.task('lint:html', () => {
    gulp.src('./public/html/*.html')
       .pipe(htmlhint())
       .pipe(htmlhint.failReporter());
});


/**
* CSS Linter using StyleLint
*/
gulp.task('lint:css', function lintCssTask() {
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
* Run Mocha Unit Tests
*/
gulp.task('mocha:unit', () =>
   gulp.src(['test/route_test/*.js'], {read: false})
      .pipe(mocha({reporter: 'list'}))
);

/**
 * Run Mocha Route Tests
 */
gulp.task('mocha:route', () =>
    gulp.src(['test/unit_test/*.js'], {read: false})
        .pipe(mocha({reporter: 'list'}))
);


/**
 * Run Mocha API Tests
 */
gulp.task('mocha:api', () =>
    gulp.src(['test/api_test/*.js'], {read: false})
        .pipe(mocha({reporter: 'list'}))
);


/**
* Run documentation generator
*/
gulp.task('api', function(done) {
   apidoc({
      src: 'routes/',
      dest: 'doc/',
   }, done);
});

gulp.task('default', []);
gulp.task('lint', ['lint:js', 'lint:html', 'lint:css']);
gulp.task('test', ['mocha:route', 'mocha:api', 'mocha:unit']);


