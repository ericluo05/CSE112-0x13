/* eslint-disable apidoc/rule-name,no-unused-vars */
let gulp = require('gulp');
let babel = require('gulp-babel');
let print = require('gulp-print');
let imagemin = require('gulp-imagemin');
let del = require('del');
let uglify = require('gulp-uglify');
let cleanCSS = require('gulp-clean-css');
let htmlmin = require('gulp-htmlmin');
let util = require('gulp-util');

let config = {production: !!util.env.production};

/*
* Minifies images  (minified only in production)
*/
gulp.task('build_min_image', () =>
    gulp.src('client/images/*')
        .pipe(config.production? imagemin() : util.noop())
        .pipe(gulp.dest('build/images'))
);


/**
 * clean public/js folder
 */
gulp.task('build_clean', () => {
    return del(['build/*', 'reports']);
});

/*
 * Babel Transpiler support, depend on build_clean
 * compiles es6 js files to uglified es5 js files  (uglified only in production)
 */
gulp.task('babel', () => {
    return gulp.src(['client/js_es6/*.js'])
        .pipe(print())
        .pipe(babel({presets: ['es2015']}))
        .pipe(config.production? uglify(): util.noop())
        .pipe(gulp.dest('build/js'));
});


/*
 * Minify css files in client and add to build (minified only in production)
 */
gulp.task('minify-css', function() {
    return gulp.src('client/stylesheets/*.css')
        .pipe(config.production? cleanCSS(): util.noop())
        .pipe(gulp.dest('build/stylesheets'));
});

/*
 *  Minify Html (minified only in production)
 */
gulp.task('minify-html', function() {
    return gulp.src('client/html/*.html')
        .pipe(config.production?
            htmlmin({collapseWhitespace: true}):util.noop())
        .pipe(gulp.dest('build/html'));
});

gulp.task('build', ['build_clean', 'minify-html', 'minify-css',
    'build_min_image', 'babel']);


