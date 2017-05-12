/* eslint-disable one-var */
let gulp = require('gulp'),
    apidoc = require('gulp-apidoc'),
    eslint = require('gulp-eslint'),
    mocha = require('gulp-mocha'),
    babel = require('gulp-babel'),
    print = require('gulp-print'),
    clean = require('gulp-clean'),
    jsdoc = require('gulp-jsdoc3'),
    config = require('./config/jsdoc.conf.json'),
    htmlhint = require('gulp-htmlhint'),
    exec = require('child_process').exec,
    {normalize} = require('path');


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
            fix: true,
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
   gulp.src(['test/unit/*.js'], {read: false})
      .pipe(mocha({reporter: 'list'}))
);

/**
 * Run Mocha Route Tests
 */
gulp.task('mocha:route', () =>
    gulp.src(['test/route/*.js'], {read: false})
        .pipe(mocha({reporter: 'list'}))
);


/**
 * Run Mocha API Tests
 */
gulp.task('mocha:api', () =>
    gulp.src(['test/api/*.js'], {read: false})
        .pipe(mocha({reporter: 'list'}))
);


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


/*
 * Runs Unit, API, and Routing tests, used for coverage
 */
gulp.task('storeCoverage', () => exec('node_modules/.bin/nyc', [
    '--report-dir=var',
    '--reporter=lcov',
    normalize('node_modules/.bin/mocha'),
    '--opts=config/mocha.opts',
]));

/*
 * Obtain coverage, to see them in color, use "npm test" instead
 */
gulp.task('coverage', ['storeCoverage'], function(cb) {
    exec('node_modules/.bin/nyc report', function(err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});


/**
 * clean public/js folder
 */
gulp.task('build_clean', () => {
    // make read = false to speed up the process
    return gulp.src('public/js/*.js', {read: false})
        .pipe(clean());
});


/*
 * Babel Transpiler support, depend on build_clean
 * compiles es6 js file st es5
 */
gulp.task('babel', ['build_clean'], () => {
    return gulp.src(['public/js_es6/*.js'])
        .pipe(print())
        .pipe(babel({presets: ['es2015']}))
        .pipe(gulp.dest('public/js'));
});


gulp.task('default', []);
gulp.task('lint', ['lint:js', 'lint:html', 'lint:css']);
gulp.task('test', ['mocha:route', 'mocha:api', 'mocha:unit']);
gulp.task('build', ['build_clean', 'babel']);

