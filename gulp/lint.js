/* eslint-disable apidoc/rule-name */
let gulp = require('gulp');
let eslint = require('gulp-eslint');
let htmlhint = require('gulp-htmlhint');

/**
* Javascript Lint Checker using JSHint
*/
// gulp.task('lint', function () {
//  gulp.src('./**/*.js')
//      .pipe(jshint())
// })


/**
* Javascript Lint Checker using ESLint
* CLI options: http://eslint.org/docs/developer-guide/nodejs-api#cliengine
*/
gulp.task('lint:js', () => {
    // lint backend and testing js files
    gulp.src(['**/*.js', 'test/**.js', '!node_modules/**'])
      .pipe(eslint({
        fix: true,
      }))
      .pipe(eslint.format())
      .pipe(eslint.failAfterError());


    // lint frontend js files
    gulp.src(['client/js_es6/**/*.js', 'client/emissary/js/*.js',
        '!node_modules/**'])
       .pipe(eslint({
         fix: true,
         globals: ['jQuery', '$'],
         envs: ['browser'],
         rules: {
             'no-invalid-this': 0,
             'no-unused-vars': 0,
         },
       }))
      .pipe(eslint.format())
      .pipe(eslint.failAfterError());
});


/**
 * HTML Linter  using HtmlHint
 */
gulp.task('lint:html', () => {
    gulp.src('./client/html/**/*.html')
        .pipe(htmlhint())
        .pipe(htmlhint.reporter());
        // .pipe(htmlhint.failReporter());
});

/**
* CSS Linter using StyleLint
*/
gulp.task('lint:css', function lintCssTask() {
  const gulpStylelint = require('gulp-stylelint');
  return gulp
    .src('./client/stylesheets/**/*.css')
    .pipe(gulpStylelint({
      reporters: [
        {formatter: 'string', console: true},
      ],
    }));
});

gulp.task('lint', ['lint:js', 'lint:html', 'lint:css']);


