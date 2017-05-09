var gulp = require('gulp'),
   jshint = require('gulp-jshint'),
    apidoc = require('gulp-apidoc'),
    eslint = require('gulp-eslint'),
    mocha = require('gulp-mocha'),
    babel = require('gulp-babel'),
    print = require('gulp-print'),
    clean = require('gulp-clean');


/**
* Javascript Lint Checker using ESLint
*/
gulp.task('lint', () => {
    // ESLint ignores files with "node_modules" paths.
    // So, it's best to have gulp ignore the directory as well.
    // Also, Be sure to return the stream from the task;
    // Otherwise, the task may end before the stream has finished.
    return gulp.src(['**/*.js','!node_modules/**'])
        // eslint() attaches the lint output to the "eslint" property
        // of the file object so it can be used by other modules.
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe(eslint.failAfterError());
});

/**
* add Gulp-clean
*/
gulp.task('build_clean', () => {
  // make read = false to speed up the process
  return gulp.src('public/js/*.js', {read: false})
        .pipe(clean());
})

/*
* Babel Transpiler support, depend on build_clean
*/
gulp.task('babel', ['build_clean'], () => {
  return gulp.src(['public/js_es6/*.js'])
        .pipe(print())
        .pipe(babel({ presets: ['es2015'] }))
        .pipe(gulp.dest('public/js'));
});

/**
* Compbined build task
*/
gulp.task('transpile', ['build_clean', 'babel']);

/**
* CSS Lint Checker using StyleLint
*/
gulp.task('stylelint', function lintCssTask() {
  const gulpStylelint = require('gulp-stylelint');
  return gulp
    .src('public/stylesheets/*.css')
    .pipe(gulpStylelint({
      reporters: [
        {formatter: 'string', console: true}
      ]
    }));
});

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

/**
* Default "gulp" command
*/
gulp.task('default', ['lint', 'stylelint','mocha', 'apidoc','transpile']);
