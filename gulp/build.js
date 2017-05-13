/* eslint-disable apidoc/rule-name */
let gulp = require('gulp');
let babel = require('gulp-babel');
let print = require('gulp-print');
let clean = require('gulp-clean');


/**
 * clean public/js folder
 */
gulp.task('build_clean', () => {
    // make read = false to speed up the process
    return gulp.src(['build/js/**', '.nyc_output'], {read: false})
        .pipe(clean());
});


/*
 * Babel Transpiler support, depend on build_clean
 * compiles es6 js file st es5
 */
gulp.task('babel', ['build_clean'], () => {
    return gulp.src(['client/js_es6/*.js'])
        .pipe(print())
        .pipe(babel({presets: ['es2015']}))
        .pipe(gulp.dest('build/js'));
});


gulp.task('build', ['build_clean', 'babel']);


