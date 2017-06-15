/* eslint-disable apidoc/rule-name,no-unused-vars */
let gulp = require('gulp');
let babel = require('gulp-babel');
let imagemin = require('gulp-imagemin');
let del = require('del');
let uglify = require('gulp-uglify');
let cleanCSS = require('gulp-clean-css');
let htmlmin = require('gulp-htmlmin');
let newer = require('gulp-newer');
let util = require('gulp-util');

// library files are copied and pasted directly to dist folder (primary js and css libs)
let paths = {
    js_src: 'client/js/*.js',
    js_dest: 'dist/js',
    html_src: 'client/html/**/*.html',
    html_dest: 'dist/html',
    css_src: 'client/stylesheets/*.css',
    css_dest: 'dist/stylesheets',
    image_src: 'client/images/**',
    image_dest: 'dist/images',
    views_src: 'client/views/**/*.ejs',
    views_dest: 'dist/views',
    js_lib_src: 'client/js/js_libs/**/*.*',
    js_lib_dest: 'dist/js/js_libs/',
    css_lib_src: 'client/stylesheets/libs/**/*.*',
    css_lib_dest: 'dist/stylesheets/libs/',
};

/*
 * Delete dist folder in root
 */
gulp.task('build:clean', () => {
    return del('dist');
});

/*
 * Babel Transpiler support, depend on build_clean
 * compiles es6 js files to uglified es5 js files  (uglified only in production)
 */
gulp.task('copy:js', () => {
    return gulp.src(paths.js_src)
        .pipe(newer(paths.js_dest))
        .pipe(babel({presets: ['es2015']}))
        .pipe((process.env.NODE_ENV === 'production') ? uglify(): util.noop())
        .pipe(gulp.dest(paths.js_dest));
});
/*
 *  Minify Html (minified only in production)
 */
gulp.task('copy:html', function() {
    return gulp.src(paths.html_src)
        .pipe(newer(paths.html_dest))
        .pipe((process.env.NODE_ENV === 'production')?
            util.noop():util.noop())
        .pipe(gulp.dest(paths.html_dest));
});

/*
 * Minify css files in client and add to build (minified only in production)
 */
gulp.task('copy:css', function() {
    return gulp.src('client/stylesheets/**/*.css')
        .pipe(newer(paths.css_dest))
        .pipe((process.env.NODE_ENV === 'production')? cleanCSS(): util.noop())
        .pipe(gulp.dest(paths.css_dest));
});

/*
 * Minifies images  (minified only in production)
 */
gulp.task('copy:image', () =>
    gulp.src(paths.image_src)
        .pipe(newer(paths.image_dest))
        .pipe((process.env.NODE_ENV === 'production')? imagemin() : util.noop())
        .pipe(gulp.dest(paths.image_dest))
);

/*
 *  Copy Views (it doesn't minimize.. cuz i haven't found a plugin for it)

 */
gulp.task('copy:views', function() {
    return gulp.src(paths.views_src)
        .pipe(gulp.dest(paths.views_dest));
});

/*
 *  Copy js and css libraries to dist folder
 */
gulp.task('copy:js:lib', function() {
    gulp.src(paths.js_lib_src)
        .pipe(newer(paths.js_lib_dest))
        .pipe(gulp.dest(paths.js_lib_dest));
});

/*
 *  Copy css libraries to dist folder
 */
gulp.task('copy:css:lib', function() {
    gulp.src(paths.css_lib_src)
        .pipe(newer(paths.css_lib_dest))
        .pipe(gulp.dest(paths.css_lib_dest));
});

gulp.task('build', ['copy:html', 'copy:css', 'copy:image',
    'copy:js', 'copy:views', 'copy:js:lib', 'copy:css:lib']);


