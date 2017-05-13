/* eslint-disable apidoc/rule-name */
let gulp = require('gulp');
let nodemon = require('gulp-nodemon');



/*
 * use nodemon for development
 *
 */
gulp.task('develop', function() {
  let stream = nodemon({
          script: './server/bin/www',
          ext: 'html js',
          ignore: ['config/', 'coverage/', 'drivers/', 'node_modules/',
              'public/js', 'reprts/', 'test/'],
          tasks: ['build'],
          env: {'NODE_ENV': 'development'},

       });

  stream
      .on('restart', function() {
        console.log('restarted!');
      })
      .on('crash', function() {
        console.error('Application has crashed!\n');
         stream.emit('restart', 10);  // restart the server in 10 seconds
      });
});