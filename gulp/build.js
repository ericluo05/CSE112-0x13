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
let config = {production: !!util.env.production};
let paths = {
    js_src: 'client/js_es6/**/*.js',
    js_dest: 'build/js',
    html_src: 'client/html/**/*.html',
    html_dest: 'build/html',
    css_src: 'client/stylesheets/**/*.css',
    css_dest: 'build/stylesheets',
    image_src: 'client/images/**',
    image_dest: 'build/images',
    emissary_src: 'client/emissary/**',
    emissary_dest: 'build/emissary/',
};

/**
 * clean public/js folder
 */
gulp.task('build:clean', () => {
    return del('build');
});

/*
 * Babel Transpiler support, depend on build_clean
 * compiles es6 js files to uglified es5 js files  (uglified only in production)
 */
gulp.task('copy:js', () => {
    return gulp.src(paths.js_src)
        .pipe(newer(paths.js_dest))
        .pipe(babel({presets: ['es2015']}))
        .pipe(config.production? uglify(): util.noop())
        .pipe(gulp.dest(paths.js_dest));
});
/*
 *  Minify Html (minified only in production)
 */
gulp.task('copy:html', function() {
    return gulp.src(paths.html_src)
        .pipe(newer(paths.html_dest))
        .pipe(config.production?
            htmlmin({collapseWhitespace: true}):util.noop())
        .pipe(gulp.dest(paths.html_dest));
});

/*
 * Minify css files in client and add to build (minified only in production)
 */
gulp.task('copy:css', function() {
    return gulp.src('client/stylesheets/**/*.css')
        .pipe(newer(paths.css_dest))
        .pipe(config.production? cleanCSS(): util.noop())
        .pipe(gulp.dest(paths.css_dest));
});

/*
 * Minifies images  (minified only in production)
 */
gulp.task('copy:image', () =>
    gulp.src(paths.image_src)
        .pipe(newer(paths.image_dest))
        .pipe(config.production? imagemin() : util.noop())
        .pipe(gulp.dest(paths.image_dest))
);

/*
 *  Copy Views (it doesn't minimize.. cuz i haven't found a plugin for it)

 */
gulp.task('copy:views', function() {
    return gulp.src('client/views/**/*.ejs')
        .pipe(gulp.dest('build/views'));
});

/*
 *  Copy Emissary folder, no compression done
 */
gulp.task('copy:emissary', function() {
    return gulp.src(paths.emissary_src)
        .pipe(gulp.dest(paths.emissary_dest));
});


gulp.task('build', ['copy:html', 'copy:css', 'copy:image',
    'copy:js', 'copy:views', 'copy:emissary']);


