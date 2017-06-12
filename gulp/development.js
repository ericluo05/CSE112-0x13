let gulp = require('gulp');
let browserSync = require('browser-sync');
let nodemon = require('gulp-nodemon');
let newer = require('gulp-newer');
let paths = {
    js_src: 'client/js/*.js',
    js_dest: 'dist/js',
    html_src: 'client/html/**/*.*',
    html_dest: 'dist/html',
    css_src: 'client/stylesheets/**/*.*',
    css_dest: 'dist/stylesheets',
    image_src: 'client/images/**',
    image_dest: 'dist/images',
    views_src: 'client/views/**/*.*',
    views_dest: 'dist/views',
    js_lib_src: 'client/js/js_libs/**/*.*',
    js_lib_dest: 'dist/js/js_libs/',
    css_lib_src: 'client/stylesheets/libs/**/*.*',
    css_lib_dest: 'dist/stylesheets/libs/',
};

/*
 * same as dev:frontend, use this will drastically improve
 * your workflow speed  :)
 */
gulp.task('development', ['dev:frontend'], function() {
});

gulp.task('dev', ['dev:backend'], function() {
    gulp.watch(paths.js_src, ['watch:js']);
    gulp.watch(paths.html_src, ['watch:html']);
    gulp.watch(paths.css_src, ['watch:css']);
    gulp.watch(paths.image_src, ['watch:image']);
    gulp.watch(paths.js_lib_src, ['watch:js_lib']);
    gulp.watch(paths.css_lib_src, ['watch:css_lib']);
    browserSync.init(null, {
        proxy: 'http://localhost:3000',
        files: ['dist/**/*.*'],
        port: 7000,
    });
});

/*
 *  Use browser-sync and nodemon
 *  changes in client folder are capture and propagated to build folder
 *  to allow browser-sync to reload automatically
 *  server automatically restart on any changes in server folder
 */
gulp.task('dev:frontend', ['dev:backend'], function() {
    // capture all relevant file edits in client folder
    gulp.watch(paths.js_src, ['watch:js']);
    gulp.watch(paths.html_src, ['watch:html']);
    gulp.watch(paths.css_src, ['watch:css']);
    gulp.watch(paths.image_src, ['watch:image']);
    gulp.watch(paths.js_lib_src, ['watch:js_lib']);
    gulp.watch(paths.css_lib_src, ['watch:css_lib']);
    browserSync.init(null, {
        proxy: 'http://localhost:3000',
        files: ['dist/**/*.*'],
        port: 7000,
    });
});

/*
 *  Use nodemon to monitor changes in server folder
 *  server will automatically restart on any changes in server folder
 */
gulp.task('dev:backend', ['build'], function(cb) {
    let started = false;
    return nodemon({
        script: './server/bin/www',
        ignore: ['config/', 'dist/', 'coverage/', 'doc/', 'drivers/', 'node_modules/',
            'reports/', 'test/'],
        env: {'NODE_ENV': 'development'},
    }).on('start', function() {
        if (!started) {
            cb();
            started = true;
        }
    });
});

/*
 * Helper for dev:frontend, on js file changes, automatically compile that
 * file to ES5 and place it in path specified by paths.js_dest
 */
gulp.task('watch:js', function() {
    gulp.src(paths.js_src)
        .pipe(newer(paths.js_dest))
        .pipe(babel({presets: ['es2015']}))
        .pipe(gulp.dest(paths.js_dest));
});

/*
 * Helper for dev:frontend, on js lib file changes, the file will be directly copied and
  * pasted into the destination folder, no trans-compiling is done
 */
gulp.task('watch:js_lib', function() {
    gulp.src(paths.js_lib_src)
        .pipe(newer(paths.js_lib_dest))
        .pipe(gulp.dest(paths.js_lib_dest));
});

/*
 * Helper for dev:frontend, on js lib file changes, the file will be directly copied and
 * pasted into the destination folder, no trans-compiling is done
 */
gulp.task('watch:css_lib', function() {
    gulp.src(paths.css_lib_src)
        .pipe(newer(paths.css_lib_dest))
        .pipe(gulp.dest(paths.css_lib_dest));
});

/*
 * Helper for dev:frontend, on any html file change in paths.html_src,
 * place the new file in path specified by paths.html_dest
 */
gulp.task('watch:html', function() {
    gulp.src(paths.html_src)
        .pipe(newer(paths.html_dest))
        .pipe(gulp.dest(paths.html_dest));
});

/*
 * Helper for dev:frontend, on any css file change in paths.css_src,
 * place the new file in path specified by paths.css_dest
 */
gulp.task('watch:css', function() {
    gulp.src(paths.css_src)
        .pipe(newer(paths.css_dest))
        .pipe(gulp.dest(paths.css_dest));
});

/*
 * Helper for dev:frontend, on any image file change in paths.image_src,
 * place the new image in path specified by paths.image_dest
 */
gulp.task('watch:image', function() {
    gulp.src(paths.image_src)
        .pipe(newer(paths.image_dest))
        .pipe(gulp.dest(paths.image_dest));
});

