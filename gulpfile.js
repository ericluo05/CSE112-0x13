var gulp = require('gulp'),
   jshint = require('gulp-jshint'),
    apidoc = require('gulp-apidoc'),
    eslint = require('gulp-eslint'),
    mocha = require('gulp-mocha'),
    babel = require('gulp-babel'),
    print = require('gulp-print');    // for printing

/**
* Lint Checker
*/
gulp.task('lint', () => {
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
gulp.task('apidoc', (done) => {
   apidoc({
      src: "routes/",
      dest: "doc/"
   }, done);
});


/*
* Run eslint test
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


/*
* Babel Transpiler support
*/
gulp.task('babel', () => {
  return gulp.src(['**/*.js','!node_modules/**', '!doc/**'])
        .pipe(print())
        .pipe(babel({ presets: ['es2015'] }))
        .pipe(gulp.dest('build/es5'));
})


gulp.task('default', ['lint', 'mocha', 'apidoc']);
