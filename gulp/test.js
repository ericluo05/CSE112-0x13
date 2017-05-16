/* eslint-disable apidoc/rule-name*/
let gulp = require('gulp');
let mocha = require('gulp-mocha');
let exec = require('child_process').exec;

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
//    gulp.src(['test/api/*.js'], {read: false})
//        .pipe(mocha({reporter: 'list'}))
    gulp.src(['test/api/test/*.js'], {read: false})
        .pipe(mocha({reporter: 'list'}))
);

gulp.task('test', ['mocha:route', 'mocha:api', 'mocha:unit']);


/*
 * Runs Unit, API, and Routing tests, used for coverage
 */
gulp.task('storeCoverage', function(cb) {
    exec('npm test', (err, stdout, stderr) => {
        console.log(stderr);
        cb(err);
    });
});

/*
 * See coverage statistic in console
 */
gulp.task('coverage', ['storeCoverage'], function(cb) {
    exec('npm run coverage', (err, stdout, stderr) => {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

