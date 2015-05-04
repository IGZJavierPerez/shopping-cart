/* gulpfile.js */

// Load some modules which are installed through NPM.
var gulp = require('gulp');
var browserify = require('browserify');  // Bundles JS.
var reactify = require('reactify');  // Transforms React JSX to JS.
var source = require('vinyl-source-stream');
var del = require('del');  // Deletes files.
var util = require('gulp-util');
var connect = require('gulp-connect');
var runSequence = require('run-sequence');

var eslint = require('gulp-eslint');

// Define some paths.
var paths = {
  main: ['./src/js/main.js'],
  index: ['src/index.html'],
  allJs: ['src/**/*.*'],
  bower: ['src/bower_components/**/*'],
  assets: ['src/assets/**/*']
};

// An example of a dependency task, it will be run before the css/js tasks.
// Dependency tasks should call the callback to tell the parent task that
// they're done.
gulp.task('clean', function(done) {
  del(['dist'], {force: true}, done);
});

//It will Browserify our code and compile React JSX files.
gulp.task('browserify', function() {
  // Browserify/bundle the JS.
  browserify()
    .add(paths.main)
    .transform(reactify)
    .bundle()
    .on('error', function(err){
      util.log(util.colors.red('Error'), err.message);
      this.emit('end');
    })
    .pipe(source('main.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(connect.reload());
});

gulp.task('copy_index', function() {
    gulp.src(paths.index)
    .pipe(gulp.dest('dist'));
});

gulp.task('copy_bower', function() {
    gulp.src(paths.bower)
    .pipe(gulp.dest('dist/bower_components'));
});

gulp.task('copy_assets', function() {
    gulp.src(paths.assets)
    .pipe(gulp.dest('dist/assets'));
});


gulp.task('connect', function() {
  connect.server({
    root: 'dist',
    livereload: true
  });
});

gulp.task('lint', function () {
  return gulp.src(['src/**/*.js', '!src/bower_components/**/*', 'gulpfile.js'])
    // eslint() attaches the lint output to the eslint property
    // of the file object so it can be used by other modules.
    .pipe(eslint({
      globals: {
        'require': true,
        'document': true,
        'setTimeout': true,
        'module': true
      },
      rules: {
        'quotes': 0,
        'no-unused-vars': 0,
        'strict': 0,
        'no-underscore-dangle': 0
      }
    }))
    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs).
    .pipe(eslint.format());
});

gulp.task('copy', ['copy_index', 'copy_bower', 'copy_assets']);

// Rerun tasks whenever a file changes.
gulp.task('watch', function() {
  gulp.watch(paths.allJs, ['dist']);
});

gulp.task('dist', ['lint', 'browserify', 'copy']);

// The default task (called when we run `gulp` from cli)
gulp.task('default', function(callback) {
  runSequence(
              'clean',
              'dist',
              ['connect', 'watch'],
              callback);
});
