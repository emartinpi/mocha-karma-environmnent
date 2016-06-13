var gulp    = require('gulp'),
    Server  = require('karma').Server,
    connect = require('gulp-connect'),
    opn     = require('opn');

/**
 * Run test once and exit
 */
gulp.task('test', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

/**
 * Serve the app and open it
 */
gulp.task('serve', ['watch', 'connect'], function() {
  opn('http://localhost:8080');
});


/**
 * Create web server
 */
gulp.task('connect', function() {
  connect.server({
    root: '.',
    port: 8080,
    livereload: true
  });
});

/**
 * Watch js and index file to livereload
 */
gulp.task('watch', function() {
  gulp.watch(['./index.html', './src/*.js'], function(event) {
    console.log('File ' + event.path + ' ' + event.type + '. Reloading...');
    gulp.src('./src/*.js').pipe(connect.reload());
  });
});

/**
 * Defualt task
 */
gulp.task('default', ['serve']);